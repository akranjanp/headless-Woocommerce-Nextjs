"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zelevationConfig } from "@/../zelevation.config";
import { Lock, Mail, User, ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/account");
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border p-8 sm:p-10 shadow-xl space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-secondary">
            JOIN THE VANGUARD
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Create an Account
          </h1>
          <p className="text-xs text-muted-foreground">
            Join the {zelevationConfig.store.name} community for priority access to seasonal drops.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                First Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Aryan"
                  className="w-full pl-9 pr-3 py-2.5 bg-muted/20 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/80 mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Sharma"
                className="w-full px-3 py-2.5 bg-muted/20 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-muted/20 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground/80 mb-1">
              Choose Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-muted/20 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* VIP Perk Checkbox */}
          <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-xl space-y-1">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="newsletter"
                defaultChecked
                className="mt-0.5 rounded border-border text-primary focus:ring-primary"
              />
              <label htmlFor="newsletter" className="text-[11px] text-foreground/90 cursor-pointer">
                <strong className="text-secondary uppercase">Atelier Perk:</strong> Send me private runway preview invitations and an exclusive 15% discount code for my first purchase.
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {isLoading ? (
              <span>Creating Atelier Account...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-secondary" />
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-secondary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
