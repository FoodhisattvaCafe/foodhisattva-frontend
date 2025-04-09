"use client";

import React, { useEffect, useState } from "react";
import ForecastTable from "../components/ForecastTable";
import ForecastChart from "../components/ForecastChart";
import ForecastPie from "../components/ForecastPie";

export default function HomePage() {
  const [prediction, setPrediction] = useState<any>(null);
  const [horizon, setHorizon] = useState("7d");
  const [visibleDays, setVisibleDays] = useState(7);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ horizon }),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          console.log("✅ Prediction API Response:", data);
          setPrediction(data);
        } catch (err) {
          console.error("🔥 Failed to parse prediction JSON:", text);
        }
      })
      .catch((err) => {
        console.error("🔥 Prediction fetch failed:", err);
        alert("Failed to fetch predictions.");
      })
      .finally(() => {
        setLoading(false);
        setVisibleDays(7);
      });
  }, [horizon]);

  const nextDays = () => {
    if (!prediction?.forecastedSales) return;
    const total = Object.keys(prediction.forecastedSales).length;
    if (startIndex + visibleDays < total) setStartIndex(startIndex + 7);
  };

  const prevDays = () => {
    if (startIndex >= 7) setStartIndex(startIndex - 7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Inve.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="pt-32">
          <div className="max-w-3xl mx-auto px-6 py-40 text-center">
            <h1 className="text-5xl md:text-6xl font-serif mb-8 text-white drop-shadow-lg">
              Inventory & Sales Forecast
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 text-white/90">
              Plan your kitchen with data-powered insights
            </p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                className="px-8 py-4 text-lg text-black rounded-full hover:opacity-90 transition-opacity bg-[#94C973]"
                onClick={() => {
                  const prediction = document.getElementById("prediction");
                  if (prediction) {
                    prediction.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                View Insights
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
  className="flex flex-col md:flex-row gap-4 items-center justify-center py-8"
  id="prediction"
>
<h1 className="text-5xl md:text-6xl font-serif mb-8 text-gray-700 drop-shadow-lg block">
             Forecast Horizon
            </h1>
<br></br>
  <select
    className="px-8 text-lg text-black rounded-full hover:opacity-90 transition-opacity bg-[#94C973] w-full max-w-xs"
    value={horizon}
    onChange={(e) => setHorizon(e.target.value)}
  >
    <option value="7d">Weekly</option>
    <option value="30d">Monthly</option>
    <option value="365d">Yearly</option>
  </select>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-12">
        {prediction?.forecastedSales && (
          <>
            <ForecastChart
              data={prediction.forecastedSales}
              startIndex={startIndex}
              visibleDays={visibleDays}
              nextDays={nextDays}
              prevDays={prevDays}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <ForecastPie data={prediction.totalPredictedOrders} />
          </>
        )}
      </div>

      {loading && <p>Loading predictions...</p>}

      {!loading && !prediction && (
        <p className="text-red-600"> No prediction data available</p>
      )}
<div className="p-12">
{!loading && prediction?.forecastedSales && (
  <div className="px-6 md:px-8">
    <ForecastTable
      title="Forecasted Sales"
      data={prediction.forecastedSales}
      visibleDays={visibleDays}
      setVisibleDays={setVisibleDays}
    />
  </div>
)}

{!loading && prediction?.inventoryNeeded && (
  <div className="px-6 md:px-8">
    <ForecastTable
      title="Inventory Requirements"
      data={prediction.inventoryNeeded}
      visibleDays={visibleDays}
      setVisibleDays={setVisibleDays}
    />
  </div>
)}
</div>

    </div>
  );
}
