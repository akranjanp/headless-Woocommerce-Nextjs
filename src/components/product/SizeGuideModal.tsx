"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"inches" | "cm">("inches");

  if (!isOpen) return null;

  const dataInches = [
    { size: "XS", chest: "34 - 36", waist: "28 - 30", hip: "35 - 37", length: "27" },
    { size: "S", chest: "36 - 38", waist: "30 - 32", hip: "37 - 39", length: "28" },
    { size: "M", chest: "38 - 40", waist: "32 - 34", hip: "39 - 41", length: "29" },
    { size: "L", chest: "40 - 42", waist: "34 - 36", hip: "41 - 43", length: "30" },
    { size: "XL", chest: "42 - 44", waist: "36 - 38", hip: "43 - 45", length: "31" },
    { size: "XXL", chest: "44 - 46", waist: "38 - 40", hip: "45 - 47", length: "31.5" },
  ];

  const dataCm = [
    { size: "XS", chest: "86 - 91", waist: "71 - 76", hip: "89 - 94", length: "68" },
    { size: "S", chest: "91 - 96", waist: "76 - 81", hip: "94 - 99", length: "71" },
    { size: "M", chest: "96 - 101", waist: "81 - 86", hip: "99 - 104", length: "73" },
    { size: "L", chest: "101 - 106", waist: "86 - 91", hip: "104 - 109", length: "76" },
    { size: "XL", chest: "106 - 111", waist: "91 - 96", hip: "109 - 114", length: "78" },
    { size: "XXL", chest: "111 - 116", waist: "96 - 101", hip: "114 - 119", length: "80" },
  ];

  const currentData = unit === "inches" ? dataInches : dataCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-fade-in border border-border">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Ruler className="w-5 h-5 text-secondary" />
            <h3 className="font-serif text-lg font-bold text-foreground">
              Bespoke Size & Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle Buttons */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Measurements for <span className="font-semibold text-foreground">{category || "Apparel"}</span>
          </p>
          <div className="flex bg-muted p-1 rounded-lg">
            <button
              onClick={() => setUnit("inches")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === "inches"
                  ? "bg-white text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Inches (&quot;)
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                unit === "cm"
                  ? "bg-white text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-2.5 px-3 font-bold text-foreground">Size</th>
                <th className="py-2.5 px-3 font-semibold text-foreground/80">Chest</th>
                <th className="py-2.5 px-3 font-semibold text-foreground/80">Waist</th>
                <th className="py-2.5 px-3 font-semibold text-foreground/80">Hips</th>
                <th className="py-2.5 px-3 font-semibold text-foreground/80">Length</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border/40 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-2.5 px-3 font-bold text-primary">{row.size}</td>
                  <td className="py-2.5 px-3 text-foreground/70">{row.chest}</td>
                  <td className="py-2.5 px-3 text-foreground/70">{row.waist}</td>
                  <td className="py-2.5 px-3 text-foreground/70">{row.hip}</td>
                  <td className="py-2.5 px-3 text-foreground/70">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tips Footer */}
        <div className="mt-6 p-3.5 bg-muted/30 rounded-xl border border-border/60 text-[11px] text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-0.5">Stylist Note:</p>
          If you are between two sizes, we recommend sizing up for a relaxed drape, or sizing down for a tailored European silhouette.
        </div>
      </div>
    </div>
  );
}
