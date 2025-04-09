"use client";

import React, { useEffect, useState } from "react";

export default function InventoryDashboard() {
  const [todaySales, setTodaySales] = useState<Record<string, number>>({});
  const [newRecipe, setNewRecipe] = useState({
    item: "",
    ingredients: [{ name: "", value: "", unit: "" }]
  });  
  const [showSales, setShowSales] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [horizon, setHorizon] = useState("7d");
  const [visibleDays, setVisibleDays] = useState(7);
  const [formInitialized, setFormInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (showSales && !formInitialized) {
      fetch("http://localhost:5005/load-defaults")
        .then((res) => res.json())
        .then((data) => {
          const menuItems = data.recipes_json.map((r: any) => r.item);
          const salesObj: Record<string, number> = {};
          menuItems.forEach((item) => (salesObj[item] = 0));
          setTodaySales(salesObj);
          setFormInitialized(true);
        });
    }
  }, [showSales, formInitialized]);
  

  useEffect(() => {
    fetch("/load-defaults")
      .then((res) => res.json())
      .then((data) => {
        const menuItems = data.recipes_json.map((r: any) => r.item);
        const salesObj: Record<string, number> = {};
        menuItems.forEach((item) => (salesObj[item] = 0));
        setTodaySales(salesObj);
      });
  }, []);

  useEffect(() => {
    fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ horizon }),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setPrediction(data);
          setVisibleDays(7);
        } catch (err) {
          console.error("\ud83d\udd25 Invalid JSON:", text);
          throw new Error("Invalid JSON");
        }
      })
      .catch((err) => {
        console.error("\ud83d\udd25 Prediction failed:", err.message);
        alert("Prediction failed. Please check the backend.");
      });
  }, [horizon]);

  // const updateSales = async () => {
  //   const filteredSales = Object.fromEntries(
  //     Object.entries(todaySales).filter(([_, qty]) => qty > 0)
  //   );
  
  //   await fetch("http://localhost:5005/add-sales", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(filteredSales),
  //   });
  
  //   alert("✅ Sales updated for today!");
  // };
  
  const updateSales = async () => {
    setLoading(true);
    await fetch("http://localhost:5005/add-sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todaySales),
    });
    setLoading(false);
    alert("✅ Sales updated for today!");
  };
  const addRecipe = async () => {
    const formatted = {
      item: newRecipe.item,
      ingredients: newRecipe.ingredients.reduce((acc, curr) => {
        if (curr.name && curr.value && curr.unit) {
          acc[curr.name] = `${curr.value} ${curr.unit}`;
        }
        return acc;
      }, {} as Record<string, string>),
    };
  
    await fetch("http://localhost:5005/add-recipe", {  // ✅ Fixed endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatted),
    });
  
    alert("✅ Recipe added!");
  
    // 👇 Optional: Trigger refresh
    setHorizon(horizon); // retriggers prediction
    setNewRecipe({ item: "", ingredients: [{ name: "", value: "", unit: "" }] }); // ✅ Fixed empty reset
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">\ud83d\udccb Restaurant Inventory Manager</h1>
        <div className="space-x-3">
          <button
            onClick={() => setShowSales((prev) => !prev)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {showSales ? "Hide Sales Form" : "Update Sales"}
          </button>
          <button
            onClick={() => setShowRecipe((prev) => !prev)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {showRecipe ? "Hide Recipe Form" : "Add Recipe"}
          </button>
        </div>
      </div>

      {/* Forecasted Sales */}
      {prediction?.forecastedSales && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">\ud83d\udcca Forecasted Sales (Daily)</h2>
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Date</th>
                {Object.keys(Object.values(prediction.forecastedSales)[0]).map((item) => (
                  <th key={item} className="border px-4 py-2">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(prediction.forecastedSales).slice(0, visibleDays).map(([date, items]: any) => (
                <tr key={date}>
                  <td className="border px-4 py-2">{date}</td>
                  {Object.keys(Object.values(prediction.forecastedSales)[0]).map((item) => (
                    <td key={item} className="border px-4 py-2">{items[item] ?? 0}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inventory Needed */}
      <div>
        <h2 className="text-xl font-semibold mb-2">\ud83d\udcca Forecasted Inventory</h2>
        <select
          className="border p-2 rounded mb-4"
          value={horizon}
          onChange={(e) => setHorizon(e.target.value)}
        >
          <option value="7d">Weekly</option>
          <option value="30d">Monthly</option>
          <option value="365d">Yearly</option>
        </select>

        {prediction?.inventoryNeeded && (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Date</th>
                  {Object.keys(Object.values(prediction.inventoryNeeded)[0]).map((ingredient) => (
                    <th key={ingredient} className="border px-4 py-2">{ingredient}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(prediction.inventoryNeeded).slice(0, visibleDays).map(([date, ingredients]: any) => (
                  <tr key={date}>
                    <td className="border px-4 py-2">{date}</td>
                    {Object.keys(Object.values(prediction.inventoryNeeded)[0]).map((ingredient) => (
                      <td key={ingredient} className="border px-4 py-2">{ingredients[ingredient] ?? 0}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 flex gap-4">
              {visibleDays < Object.keys(prediction.inventoryNeeded).length && (
                <button
                  className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
                  onClick={() => setVisibleDays((prev) => prev + 7)}
                >
                  Load More
                </button>
              )}
              {visibleDays > 7 && (
                <button
                  className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
                  onClick={() => setVisibleDays(7)}
                >
                  See Less
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sales Form */}
      {showSales && formInitialized && (
  <div className="border p-4 rounded bg-gray-50">
    <h2 className="text-xl font-semibold mb-2">📅 Update Today's Sales</h2>
    {Object.keys(todaySales).map((item) => (
      <div key={item} className="flex items-center gap-2 mb-2">
        <label className="w-1/3 font-medium">{item}</label>
        <input
          type="number"
          className="border p-1 rounded w-24"
          value={todaySales[item]}
          onChange={(e) =>
            setTodaySales({ ...todaySales, [item]: parseInt(e.target.value || "0") })
          }
        />
      </div>
    ))}
    <button
      onClick={updateSales}
      className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Submit Today’s Sales
    </button>
  </div>
)}

    


      {/* Recipe Form */}
      {showRecipe && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">\u2795 Add New Recipe</h2>
          <input
            type="text"
            placeholder="Dish Name"
            className="border p-2 rounded w-full mb-3"
            value={newRecipe.item}
            onChange={(e) => setNewRecipe({ ...newRecipe, item: e.target.value })}
          />
          {newRecipe.ingredients.map((ing, idx) => (
  <div key={idx} className="flex gap-2 mb-2">
   <input
  type="text"
  placeholder="Ingredient Name"
  className="border p-1 rounded w-1/3"
  value={ing.name || ""}
  onChange={(e) => {
    const updated = [...newRecipe.ingredients];
    updated[idx].name = e.target.value;
    setNewRecipe({ ...newRecipe, ingredients: updated });
  }}
/>
<input
  type="number"
  placeholder="Qty"
  className="border p-1 rounded w-1/4"
  value={ing.value?.toString() || ""}
  onChange={(e) => {
    const updated = [...newRecipe.ingredients];
    updated[idx].value = e.target.value;
    setNewRecipe({ ...newRecipe, ingredients: updated });
  }}
/>
<select
  className="border p-1 rounded w-1/4"
  value={ing.unit || ""}
  onChange={(e) => {
    const updated = [...newRecipe.ingredients];
    updated[idx].unit = e.target.value;
    setNewRecipe({ ...newRecipe, ingredients: updated });
  }}
>
  <option value="">Unit</option>
  <option value="g">g</option>
  <option value="kg">kg</option>
  <option value="ml">ml</option>
  <option value="oz">oz</option>
  <option value="tbsp">tbsp</option>
  <option value="tsp">tsp</option>
  <option value="cups">cups</option>
  <option value="slice">slice</option>
  <option value="piece">piece</option>
</select>


  </div>
))}

          <button
            onClick={() => setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, { name: "", quantity: "" }] })}
            className="mb-3 text-blue-600 hover:underline"
          >
            + Add another ingredient
          </button>
          <br />
          <button
            onClick={addRecipe}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Recipe
          </button>
        </div>
      )}
    </div>
  );
}