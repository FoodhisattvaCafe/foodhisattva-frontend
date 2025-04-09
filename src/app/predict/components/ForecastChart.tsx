"use client";

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

type Props = {
  data: Record<string, Record<string, number>>; // e.g. { '2025-04-01': { 'Smoothie': 12, 'Burger': 8 } }
};

export default function ForecastChart({ data }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState("Total");

  const allDates = Object.keys(data).sort(); // Sorted by date
  const items = Array.from(
    new Set(Object.values(data).flatMap((d) => Object.keys(d)))
  );

  const totalSalesData = allDates.map((date) =>
    Object.values(data[date] || {}).reduce((a, b) => a + b, 0)
  );

  const chartLabels = allDates.slice(startIndex, startIndex + 7);
  const chartData = chartLabels.map((date) => {
    if (selectedItem === "Total") {
      return totalSalesData[allDates.indexOf(date)] || 0;
    }
    return data[date]?.[selectedItem] ?? 0;
  });

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartLabels,
        datasets: [
          {
            label:
              selectedItem === "Total"
                ? "Total Sales"
                : `${selectedItem} Sales`,
            data: chartData,
            borderColor: "#8b5cf6", 
            backgroundColor: "rgba(139, 92, 246, 0.2)",
            tension: 0.3,
            pointRadius: 4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          legend: {
            position: "top",
            labels: { color: "#374151", font: { size: 14 } },
          },
        },
      },
    });
  }, [startIndex, selectedItem]);

  return (
    <div className="bg-white shadow-md rounded p-4 space-y-4">
      <div className="flex items-center justify-between">
      <h2 className="text-3xl md:text-4xl font-serif mb-8 text-gray-700  block">
      Forecast Chart
            </h2>
        <select
          className="text-lg text-black rounded-full hover:opacity-90 transition-opacity bg-[#BDDDFC]"
          value={selectedItem}
          onChange={(e) => {
            setSelectedItem(e.target.value);
            setStartIndex(0);
          }}
        >
          <option value="Total">Total Sales</option>
          {items.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div style={{ height: "400px" }}>
        <canvas ref={chartRef} />
      </div>

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 blue-grey-300 text-sm rounded hover:blue-grey-50"
          disabled={startIndex === 0}
          onClick={() => setStartIndex((prev) => Math.max(0, prev - 7))}
        >
          ← Previous
        </button>
        <button
          className="px-4 py-2 blue-grey-300 text-sm rounded hover:blue-grey-50"
          disabled={startIndex + 7 >= allDates.length}
          onClick={() => setStartIndex((prev) => prev + 7)}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
