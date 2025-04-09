"use client";

import React from "react";

export default function ForecastTable({
  title,
  data,
  visibleDays,
  setVisibleDays,
}: {
  title: string;
  data: Record<string, Record<string, number>>;
  visibleDays: number;
  setVisibleDays: (v: number) => void;
}) {
  const headers = Object.keys(Object.values(data)[0] || {});
  const rows = Object.entries(data);

  const totalDays = rows.length;
  const paginatedRows = rows.slice(visibleDays - 7, visibleDays); // show 7-day window

  const handleNext = () => {
    if (visibleDays < totalDays) {
      setVisibleDays((prev) => Math.min(prev + 7, totalDays));
    }
  };

  const handlePrev = () => {
    if (visibleDays > 7) {
      setVisibleDays((prev) => Math.max(prev - 7, 7));
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Date</th>
              {headers.map((key) => (
                <th key={key} className="border px-4 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map(([date, values]) => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                {headers.map((key) => (
                  <td key={key} className="border px-4 py-2">{values[key] ?? 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex gap-4 justify-center">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          disabled={visibleDays <= 7}
        >
          ← Previous 7 Days
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
          disabled={visibleDays >= totalDays}
        >
          Next 7 Days →
        </button>
      </div>
    </div>
  
  );
}
