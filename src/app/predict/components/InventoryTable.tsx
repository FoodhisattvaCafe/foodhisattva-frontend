"use client";

import React from "react";

export default function InventoryTable({
  data,
  visibleStart,
  visibleDays,
}: {
  data: Record<string, Record<string, number>>;
  visibleStart: number;
  visibleDays: number;
}) {
  const dates = Object.keys(data).slice(visibleStart, visibleStart + visibleDays);
  const ingredients = Array.from(
    new Set(dates.flatMap((d) => Object.keys(data[d] || {})))
  );

  return (
    <div className="bg-white shadow p-4 rounded-md overflow-auto">
      <h2 className="text-lg font-semibold mb-2">Inventory Needed (Daily)</h2>
      <table className="min-w-full text-sm border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-1 text-left">Date</th>
            {ingredients.map((ing) => (
              <th key={ing} className="border px-3 py-1 text-left">{ing}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr key={date}>
              <td className="border px-3 py-1">{date}</td>
              {ingredients.map((ing) => (
                <td key={ing} className="border px-3 py-1">
                  {(data[date]?.[ing] || 0).toFixed(1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
