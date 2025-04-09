from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import pandas as pd
import json
import os
from io import StringIO
from prophet import Prophet
from pathlib import Path
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
BASE_DIR = Path(__file__).resolve().parents[4] 
SALES_PATH = BASE_DIR / "data" / "sales.csv"
RECIPES_PATH = BASE_DIR / "data" / "recipies.json" 
class PredictionInput(BaseModel):
    sales_csv: str = None
    recipes_json: List[Dict] = None
    horizon: str = "7d"

@app.get("/load-defaults")
def load_defaults():
    with open(RECIPES_PATH, "r") as f:
        recipes = json.load(f)
    return {"recipes_json": recipes}

@app.post("/add-sales")
async def add_sales(sales: Dict[str, int]):
    today = datetime.today().strftime("%Y-%m-%d")
    rows = [f"{today},{item},{qty}\n" for item, qty in sales.items() if qty > 0]
    with open(SALES_PATH, "a") as f:
        f.writelines(rows)
    return {"status": "success", "added": len(rows)}


@app.post("/add-recipe")
async def add_recipe(recipe: Dict):
    with open(RECIPES_PATH, "r") as f:
        recipes = json.load(f)

    recipes.append(recipe)

    with open(RECIPES_PATH, "w") as f:
        json.dump(recipes, f, indent=2)

    return {"status": "recipe added"}

@app.post("/predict")
async def predict(data: PredictionInput):
    print(" /predict was hit")

    if not data.sales_csv:
        with open(SALES_PATH, "r") as f:
            data.sales_csv = f.read()
    if not data.recipes_json:
        with open(RECIPES_PATH, "r") as f:
            data.recipes_json = json.load(f)

    df = pd.read_csv(StringIO(data.sales_csv))
    df.columns = df.columns.str.strip().str.lower()

    if not {'date', 'item', 'qty'}.issubset(df.columns):
        return {"error": "CSV must include 'date', 'item', and 'qty' columns"}

    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    df['qty'] = pd.to_numeric(df['qty'], errors='coerce')
    df.dropna(subset=['date', 'qty'], inplace=True)

    if data.horizon.endswith("d"):
        future_days = int(data.horizon[:-1])
    elif data.horizon.endswith("m"):
        future_days = int(data.horizon[:-1]) * 30
    elif data.horizon.endswith("y"):
        future_days = int(data.horizon[:-1]) * 365
    else:
        future_days = 7

    forecast_results = []
    datewise_items = {}
    datewise_ingredients = {}
    item_totals = {}
    ingredient_totals = {}

    for item in df['item'].unique():
        item_df = df[df['item'] == item][['date', 'qty']].rename(columns={"date": "ds", "qty": "y"})
        if len(item_df) < 3:
            continue

        try:
            model = Prophet(daily_seasonality=True)
            model.fit(item_df)
            future = model.make_future_dataframe(periods=future_days, freq='D')
            forecast = model.predict(future)
            forecast_segment = forecast[forecast['ds'] > df['date'].max()][['ds', 'yhat']]
            forecast_results.append((item, forecast_segment))

            for _, row in forecast_segment.iterrows():
                date = str(row['ds'].date())
                qty = round(row['yhat'])
                datewise_items.setdefault(date, {})[item] = qty
                item_totals[item] = item_totals.get(item, 0) + qty
        except Exception as e:
            print(f"⚠️ Error predicting {item}: {e}")

    for item, forecasts in forecast_results:
        recipe = next((r for r in data.recipes_json if r['item'] == item), None)
        if not recipe:
            continue
        for _, row in forecasts.iterrows():
            date = str(row['ds'].date())
            qty = round(row['yhat'])
            for ing, amount in recipe['ingredients'].items():
                try:
                    total = float(amount) * qty
                except:
                    total = qty
                datewise_ingredients.setdefault(date, {}).setdefault(ing, 0)
                datewise_ingredients[date][ing] += total
                ingredient_totals[ing] = ingredient_totals.get(ing, 0) + total

    return {
    "forecastedSales": datewise_items,
    "inventoryNeeded": datewise_ingredients,
    "totalPredictedOrders": item_totals,
    "totalInventory": ingredient_totals
}
