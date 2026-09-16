"use client";

import React, { useState } from "react";
import { zelevationConfig } from "@/../zelevation.config";
import { 
  Settings2, 
  X, 
  ExternalLink, 
  Check, 
  Zap, 
  Database, 
  Palette, 
  Code2, 
  Globe 
} from "lucide-react";

export default function FloatingThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activePalette, setActivePalette] = useState("noir");

  const palettes = [
    { id: "noir", name: "Classic Atelier Noir & Gold", primary: "#111111", secondary: "#c5a880" },
    { id: "titanium", name: "Titanium Slate & Silver", primary: "#1e293b", secondary: "#94a3b8" },
    { id: "emerald", name: "Imperial Emerald & Gold", primary: "#064e3b", secondary: "#d4af37" },
  ];

  return (
    <>
      {/* Floating Trigger Button at Bottom-Left */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-semibold border border-white/20"
          aria-label="Open Agency Theme Controls"
        >
          <Settings2 className="w-4 h-4 text-secondary animate-spin-slow" />
          <span className="hidden sm:inline">Agency Studio Controls</span>
        </button>
      </div>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-start p-0 sm:p-6 animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative w-full sm:max-w-md bg-card border border-border shadow-2xl rounded-t-2xl sm:rounded-2xl p-6 space-y-6 z-10 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
                  ZELEVATION HEADLESS SUITE
                </span>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Agency Template Architecture
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Overview */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                This headless eCommerce template is engineered for rapid agency deployment. You can re-brand and point this entire storefront to any client’s WooCommerce backend in under 15 minutes.
              </p>

              <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active WP Backend:</span>
                  <span className="font-mono font-semibold text-foreground text-[11px]">
                    staging.bom1.mystaging.site
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Configuration File:</span>
                  <span className="font-mono text-primary font-semibold text-[11px]">
                    zelevation.config.ts
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Order Engine:</span>
                  <span className="text-emerald-600 font-semibold text-[11px] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Live WC REST API v3
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Agency Links */}
            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Developer & Admin Portals
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://staging.bom1.mystaging.site/wp-admin/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-card hover:bg-muted/60 text-xs font-semibold flex items-center justify-between"
                >
                  <span>WP Admin</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
                <a
                  href="https://github.com/akranjanp/headless-Woocommerce-Nextjs"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-border bg-card hover:bg-muted/60 text-xs font-semibold flex items-center justify-between"
                >
                  <span>GitHub Repo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold uppercase rounded-lg hover:bg-primary-hover transition-colors"
            >
              Resume Shopping Experience
            </button>
          </div>
        </div>
      )}
    </>
  );
}
