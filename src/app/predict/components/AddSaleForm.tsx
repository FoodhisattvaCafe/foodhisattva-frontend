"use client";

import React, { useState } from "react";

export default function AddSaleForm({ onSuccess }: { onSuccess: () => void }) {
  const [newSale, setNewSale] = useState({ date: "", item: "", qty: "" });

  const handleSubmit = async () => {
    const res = await fetch("/api/predict/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([newSale]),
    });

    if (res.ok) {
      onSuccess();
      setNewSale({ date: "", item: "", qty: "" });
    } else {
      alert("Failed to add sale");
    }
  };

  return (
    <div className="border p-4 rounded bg-gray-50 mt-4 space-y-2">
      <h2 className="text-lg font-semibold">Add Sale</h2>
      <input
        type="date"
        className="border p-1 rounded w-full"
        value={newSale.date}
        onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
      />
      <input
        placeholder="Item"
        className="border p-1 rounded w-full"
        value={newSale.item}
        onChange={(e) => setNewSale({ ...newSale, item: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        className="border p-1 rounded w-full"
        value={newSale.qty}
        onChange={(e) => setNewSale({ ...newSale, qty: e.target.value })}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Submit Sale
      </button>
    </div>
  );
}
