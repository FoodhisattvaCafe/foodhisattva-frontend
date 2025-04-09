"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ForecastPie({
  data,
}: {
  data: Record<string, number>;
}) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    if (chartInstance.current) chartInstance.current.destroy();

    const labels = Object.keys(data);
    const values = Object.values(data);

    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              "#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa",
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 20 },
          },
        },
      },
    });
  }, [data]);

  return (
    <div className="bg-white p-8 rounded shadow">
      <h2 className="text-3xl md:text-4xl font-serif mb-8 text-gray-700  block">
      Sales Share by Item
            </h2>
      <canvas ref={chartRef} className="w-full h-[300px] p-24" />
    </div>
  );
}
