/**
 * app/components/InventoryDashboard.tsx
 *
 * A React client component for the restaurant inventory management dashboard.
 * 
 * Features:
 *  - Displays forecasted sales and inventory needs.
 *  - Allows updating today's sales via a form.
 *  - Enables adding new recipes through a dynamic form.
 * 
 * Uses Next.js client-side data fetching and React hooks (`useState`, `useEffect`).
 */

"use client";

import React, { useEffect, useState } from "react";

/**
 * The main inventory dashboard UI.
 *
 * Fetches default data on mount, retrieves predictions when the horizon changes,
 * and lets users submit sales and recipes to the backend.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard.
 */
export default function InventoryDashboard(): JSX.Element {
  const [todaySales, setTodaySales] = useState<Record<string, number>>({});
  const [newRecipe, setNewRecipe] = useState<{
    item: string;
    ingredients: { name: string; value: string; unit: string }[];
  }>({
    item: "",
    ingredients: [{ name: "", value: "", unit: "" }]
  });
  const [showSales, setShowSales] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [horizon, setHorizon] = useState("7d");
  const [visibleDays, setVisibleDays] = useState(7);
  const [formInitialized, setFormInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showSales && !formInitialized) {
      fetch("/api/defaults")
        .then((res) => res.json())
        .then((data) => {
          const menuItems = data.recipes_json.map((r: any) => r.item);
          const salesObj: Record<string, number> = {};
          menuItems.forEach((item) => (salesObj[item] = 0));
          setTodaySales(salesObj);
          setFormInitialized(true);
        });
    }
  }, [showSales, formInitialized]);

  useEffect(() => {
    fetch("/api/defaults")
      .then((res) => res.json())
      .then((data) => {
        const menuItems = data.recipes_json.map((r: any) => r.item);
        const salesObj: Record<string, number> = {};
        menuItems.forEach((item) => (salesObj[item] = 0));
        setTodaySales(salesObj);
      });
  }, []);

  useEffect(() => {
    fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ horizon }),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setPrediction(data);
          setVisibleDays(7);
        } catch (err) {
          console.error("🔥 Invalid JSON:", text);
          throw new Error("Invalid JSON");
        }
      })
      .catch((err) => {
        console.error("🔥 Prediction failed:", err.message);
        alert("Prediction failed. Please check the backend.");
      });
  }, [horizon]);

  /**
   * Send today's sales to the backend.
   *
   * @async
   * @function updateSales
   * @returns {Promise<void>}
   */
  const updateSales = async (): Promise<void> => {
    setLoading(true);
    await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todaySales),
    });
    setLoading(false);
    alert("✅ Sales updated for today!");
  };

  /**
   * Add a new recipe via the backend API.
   *
   * @async
   * @function addRecipe
   * @returns {Promise<void>}
   */
  const addRecipe = async (): Promise<void> => {
    const formatted = {
      item: newRecipe.item,
      ingredients: newRecipe.ingredients.reduce((acc, curr) => {
        if (curr.name && curr.value && curr.unit) {
          acc[curr.name] = `${curr.value} ${curr.unit}`;
        }
        return acc;
      }, {} as Record<string, string>),
    };

    await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formatted),
    });

    alert("✅ Recipe added!");
    setNewRecipe({ item: "", ingredients: [{ name: "", value: "", unit: "" }] });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* …the rest of your JSX… */}
    </div>
  );
}
