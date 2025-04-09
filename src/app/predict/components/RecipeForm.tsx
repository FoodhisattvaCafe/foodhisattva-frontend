
"use client";

import React, { useState } from "react";

export default function RecipeForm({ onSuccess, onCancel, initial, existingRecipes }) {
  const [item, setItem] = useState(initial?.item || "");
  const [ingredients, setIngredients] = useState(
    initial
      ? Object.entries(initial.ingredients).map(([name, qty]) => {
          const [value, unit] = String(qty).split(" ");
          return { name, value, unit };
        })
      : [{ name: "", value: "", unit: "" }]
  );

  const save = async () => {
    if (!item || ingredients.some((i) => !i.name || !i.value || !i.unit)) {
      alert("Please fill in all fields.");
      return;
    }

    const isDuplicate = !initial && existingRecipes.some((r) => r.item === item);
    if (isDuplicate) {
      alert("⚠️ A recipe with this name already exists.");
      return;
    }

    const formatted = {
      item,
      ingredients: ingredients.reduce((acc, curr) => {
        acc[curr.name] = `${curr.value} ${curr.unit}`;
        return acc;
      }, {}),
    };

    const res = await fetch("/api/predict/recipes", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatted),
    });

    const raw = await res.text();
    console.log("Raw backend response:", raw);

    if (!res.ok) {
      console.error("Failed response from backend");
      alert("Failed to save recipe.");
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      console.log(" Parsed backend JSON:", parsed);
      onSuccess(formatted, initial ? existingRecipes.findIndex((r) => r.item === item) : null);
    } catch (err) {
      console.error(" JSON parsing failed:", err);
      alert("Server returned invalid JSON.");
    }
  };

  return (
    <div className="border p-4 mt-4 rounded bg-gray-50 space-y-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Dish Name"
        value={item}
        disabled={!!initial}
        onChange={(e) => setItem(e.target.value)}
      />
      {ingredients.map((ing, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            className="border p-1 rounded w-1/3"
            placeholder="Ingredient Name"
            value={ing.name}
            onChange={(e) => {
              const updated = [...ingredients];
              updated[idx].name = e.target.value;
              setIngredients(updated);
            }}
          />
          <input
            className="border p-1 rounded w-1/4"
            type="number"
            placeholder="Qty"
            value={ing.value}
            onChange={(e) => {
              const updated = [...ingredients];
              updated[idx].value = e.target.value;
              setIngredients(updated);
            }}
          />
          <select
            className="border p-1 rounded w-1/4"
            value={ing.unit}
            onChange={(e) => {
              const updated = [...ingredients];
              updated[idx].unit = e.target.value;
              setIngredients(updated);
            }}
          >
            <option value="">Unit</option>
            <option value="g">g</option>
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
        onClick={() => setIngredients([...ingredients, { name: "", value: "", unit: "" }])}
        className="text-blue-600 hover:underline"
      >
        + Add Ingredient
      </button>
      <div className="flex gap-4 mt-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={save}>
          Save
        </button>
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

