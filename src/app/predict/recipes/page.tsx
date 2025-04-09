"use client";

import React, { useEffect, useState } from "react";
import RecipeForm from "../components/RecipeForm";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetch("/api/predict/recipes")
      .then((res) => res.json())
      .then(setRecipes)
      .catch((err) => {
        console.error("Failed to load recipes", err);
        alert("Error loading recipes.");
      });
  }, []);

  const deleteRecipe = async (index: number) => {
    const item = recipes[index].item;
    const res = await fetch("/api/predict/recipes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item }),
    });

    if (res.ok) {
      setRecipes((prev) => prev.filter((_, i) => i !== index));
      alert("🗑️ Recipe deleted");
    }
  };

  const updateRecipeList = (updated: any, index: number | null) => {
    if (index === null) {
      setRecipes((prev) => [...prev, updated]);
    } else {
      const clone = [...recipes];
      clone[index] = updated;
      setRecipes(clone);
    }
    setEditingIndex(null);
    setFormOpen(false);
  };

  return (
    <div className="space-y-6 p-24">
      <h1 className="text-5xl md:text-6xl font-serif mb-8 text-gray-700 drop-shadow-lg block">
      Manage Recipes
            </h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          setEditingIndex(null);
          setFormOpen(true);
        }}
      >
        Add New Recipe
      </button>

      {formOpen && (
        <RecipeForm
          existingRecipes={recipes}
          onSuccess={updateRecipeList}
          onCancel={() => setFormOpen(false)}
          initial={editingIndex !== null ? recipes[editingIndex] : null}
        />
      )}

      <div className="mt-6">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Dish</th>
              <th className="border px-4 py-2">Ingredients</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{recipe.item}</td>
                <td className="border px-4 py-2">
                  {Object.entries(recipe.ingredients)
                    .map(([name, qty]) => `${name}: ${qty}`)
                    .join('\n') + '\n'}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEditingIndex(index);
                      setFormOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteRecipe(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
