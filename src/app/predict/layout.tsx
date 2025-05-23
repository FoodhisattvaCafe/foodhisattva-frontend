import React from "react";
import Navbar from "./components/Navbar";

export default function PredictLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
