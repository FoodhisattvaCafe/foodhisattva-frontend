"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { href: "/predict/home", label: "Home" },
  { href: "/predict/recipes", label: "Recipes" },
  { href: "/predict/sales", label: "Sales" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 text-white  py-3">
      <div className="flex gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`hover:underline ${pathname === href ? "font-bold" : ""}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
