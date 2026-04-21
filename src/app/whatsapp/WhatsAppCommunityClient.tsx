"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WHATSAPP_LINK = "https://chat.whatsapp.com/Kc9ilb4b93AHzuti3DIomt";

export default function WhatsAppCommunityClient() {
  const [joined, setJoined] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1500);
    return () => clearInterval(t);
  }, []);

  const handleJoin = () => {
    setJoined(true);
    window.open(WHATSAPP_LINK, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-5 pt-20 pb-10">

      {/* Live dot */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`w-2 h-2 rounded-full bg-[#25D366] transition-opacity duration-700 ${pulse ? "opacity-100" : "opacity-30"}`} />
        <span className="text-xs text-gray-400 font-medium">2,400+ members · Active now</span>
      </div>

      {/* Eyebrow */}
      <p className="text-xs text-gray-400 font-medium text-center mb-3 tracking-wide italic">
        Not everyone sees our best designs…
      </p>

      {/* CTA — in place of heading */}
      <button
        onClick={handleJoin}
        className="w-full max-w-xs bg-[#25D366] hover:bg-[#1cb852] active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl shadow-lg shadow-[#25D366]/25 transition-all duration-200 mb-8"
      >
        {joined ? "Opening WhatsApp…" : "Join Gulbhahar on WhatsApp"}
      </button>

      <p className="text-gray-500 text-sm sm:text-base text-center max-w-xs mb-2 leading-relaxed font-medium">
        Unlock private collections & secret deals.
      </p>
      <p className="text-gray-400 text-xs sm:text-sm text-center max-w-xs mb-8">
        New styles you won&apos;t find everywhere.
      </p>

      {/* Perks — 2x2 grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-xs mb-8">
        {[
          { e: "🎁", t: "Secret Deals" },
          { e: "👗", t: "New Arrivals First" },
          { e: "⚡", t: "Flash Sales" },
          { e: "💬", t: "Order Support" },
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
            <span className="text-lg">{p.e}</span>
            <span className="text-xs font-semibold text-gray-700">{p.t}</span>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-300 mt-4 text-center">
        No spam · Leave anytime ·{" "}
        <Link href="/privacy-policy" className="underline">Privacy Policy</Link>
      </p>

    </div>
  );
}
