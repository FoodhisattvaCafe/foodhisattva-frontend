"use client"
import React, { useEffect, useState } from "react";

export default function SalesForm() {
  const [sales, setSales] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({ date: "", item: "", qty: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedSale, setEditedSale] = useState({ date: "", item: "", qty: "" });

  const fetchSales = async () => {
    const res = await fetch("/api/predict/sales");
    const data = await res.json();
    const normalized = (data.sales || []).map((s: any) => ({
      ...s,
      date: new Date(s.date).toISOString().split("T")[0],
    }));
    setSales(normalized);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleAdd = async () => {
    const res = await fetch("/api/predict/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([newSale]),
    });
    if (res.ok) {
      setNewSale({ date: "", item: "", qty: "" });
      setShowAddForm(false);
      await fetchSales();
    } else {
      alert("Failed to add sale");
    }
  };

  const handleSave = async () => {
    const res = await fetch("/api/predict/sales", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedSale),
    });

    if (res.ok) {
      await fetchSales();
      setEditIndex(null);
      setEditedSale({ date: "", item: "", qty: "" });
    } else {
      alert("Failed to update sale");
    }
  };

  const handleDelete = async (sale: any) => {
    await fetch("/api/predict/sales", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sale),
    });
    await fetchSales();
  };

  const filteredSales = filterDate
    ? sales.filter((s) => s.date === filterDate)
    : sales.slice(-7).reverse();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-8 text-gray-700 drop-shadow-lg block">
      Sales Records
            </h1>
      <div className="flex items-center gap-4">
        <input
          type="date"
          className="border p-2 rounded"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Add Sale
        </button>
      </div>

      {showAddForm && (
        <div className="mt-4 space-y-2 border p-4 rounded bg-gray-50">
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
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit Sale
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full border text-sm mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <input
                    type="date"
                    value={editedSale.date}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, date: e.target.value })
                    }
                  />
                ) : (
                  sale.date
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <input
                    value={editedSale.item}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, item: e.target.value })
                    }
                  />
                ) : (
                  sale.item
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <input
                    type="number"
                    value={editedSale.qty}
                    onChange={(e) =>
                      setEditedSale({ ...editedSale, qty: Number(e.target.value) })
                    }
                  />
                ) : (
                  sale.qty
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editIndex === index ? (
                  <>
                    <button className="text-green-600" onClick={handleSave}>
                      Save
                    </button>
                    <button
                      className="text-gray-600"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        setEditIndex(index);
                        setEditedSale({ ...sale }); 
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(sale)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
