"use client";
import React, { useState, useEffect } from 'react';

export default function PredictUploader() {
  const [salesFile, setSalesFile] = useState<File | null>(null);
  const [recipesFile, setRecipesFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [horizon, setHorizon] = useState("7d");
  const [visibleDays, setVisibleDays] = useState(7);

  const handleSubmit = async () => {
    if (!salesFile || !recipesFile) {
      alert('Please select both sales and recipes files.');
      return;
    }

    const clonedSales = new File([await salesFile.arrayBuffer()], salesFile.name);
    const clonedRecipes = new File([await recipesFile.arrayBuffer()], recipesFile.name);

    const formData = new FormData();
    formData.append('sales_file', clonedSales);
    formData.append('recipes_file', clonedRecipes);
    formData.append('horizon', horizon);

    setPrediction(null);
    setVisibleDays(7);
    setLoading(true);

    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        alert("Prediction failed: " + data.error);
        return;
      }

      console.log("Prediction response:", data);
      setPrediction(data);
    } catch (err) {
      console.error('Prediction failed', err);
      alert('Prediction failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger prediction on horizon change if files already selected
  useEffect(() => {
    if (salesFile && recipesFile) {
      handleSubmit();
    }
  }, [horizon]);

  return (
    <div className="p-6 border rounded-xl max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Inventory & Order Forecast</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Sales CSV File</label>
        <input type="file" accept=".csv" onChange={(e) => setSalesFile(e.target.files?.[0] || null)} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Recipes JSON File</label>
        <input type="file" accept=".json,application/json" onChange={(e) => setRecipesFile(e.target.files?.[0] || null)} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Forecast Horizon</label>
        <select
          className="border p-2 rounded"
          value={horizon}
          onChange={(e) => setHorizon(e.target.value)}
        >
          <option value="7d">Weekly</option>
          <option value="30d">Monthly</option>
          <option value="365d">Yearly</option>
        </select>
      </div>

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Predicting...' : 'Run Prediction'}
      </button>

      {/* Forecasted Sales */}
      {prediction?.forecastedSales && (
  <div className="mt-10">
    <h3 className="text-xl font-semibold mb-4">Forecasted Sales (Daily)</h3>
    <div className="overflow-x-auto">
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
          {Object.entries(prediction.forecastedSales)
            .slice(0, visibleDays)
            .map(([date, items]: any) => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                {Object.keys(Object.values(prediction.forecastedSales)[0]).map((item) => (
                  <td key={item} className="border px-4 py-2">
                    {items[item] ?? 0}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    {Object.keys(prediction.forecastedSales || {}).length > visibleDays && (
  <div className="flex justify-center mt-2">
    <button
      className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
      onClick={() => setVisibleDays((prev) => prev + 7)}
    >
      Load More
    </button>
  </div>
)}
  </div>
)}

      {/* 📦 Inventory Needed */}
      {prediction?.inventoryNeeded && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">📦 Inventory Needed (Daily)</h3>
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
                {Object.entries(prediction.inventoryNeeded)
                  .slice(0, visibleDays)
                  .map(([date, ingredients]: any) => (
                    <tr key={date}>
                      <td className="border px-4 py-2">{date}</td>
                      {Object.keys(Object.values(prediction.inventoryNeeded)[0]).map((ingredient) => (
                        <td key={ingredient} className="border px-4 py-2">
                          {ingredients[ingredient] ?? 0}
                        </td>
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
        </div>
      )}

      {/* Total Orders */}
      {prediction?.totalPredictedOrders && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Total Predicted Orders</h3>
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Item</th>
                <th className="border px-4 py-2">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prediction.totalPredictedOrders).map(([item, qty]) => (
                <tr key={item}>
                  <td className="border px-4 py-2">{item}</td>
                  <td className="border px-4 py-2">{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/*  Total Inventory */}
      {prediction?.totalInventory && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Total Inventory Needed</h3>
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Ingredient</th>
                <th className="border px-4 py-2">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prediction.totalInventory).map(([ingredient, qty]) => (
                <tr key={ingredient}>
                  <td className="border px-4 py-2">{ingredient}</td>
                  <td className="border px-4 py-2">{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
