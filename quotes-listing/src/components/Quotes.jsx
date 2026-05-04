import { useState, useEffect } from "react";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/quotes?page=1&limit=20")
      .then((r) => r.json())
      .then((json) => setQuotes(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-6xl mx-auto px-8 py-20">
        {/* Header Section */}
        <header className="relative flex flex-col md:flex-row justify-between items-end mb-24 border-b border-zinc-900 pb-12">
          <div className="flex flex-col">
            <h1 className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-3 uppercase">
              // Jokes
            </h1>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-[9px] leading-relaxed tracking-[0.4em] uppercase text-zinc-600">
              Protocol: Insight_v4 <br />
              Status: Cataloged
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-red-600"></div>
        </header>

        {/* Masonry Content */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-zinc-950 border border-zinc-900 animate-pulse"
                />
              ))
            : quotes.map((q, i) => (
                <div
                  key={i}
                  className="break-inside-avoid relative group border border-zinc-900 p-10 bg-zinc-950/30 transition-all duration-700 hover:border-red-900/50 hover:bg-zinc-950"
                >
                  {/* Decorative Japanese Bracket */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-800 group-hover:border-red-600 transition-colors duration-500"></div>

                  {/* Quote Content */}
                  <div className="relative z-10">
                    <span className="text-red-900 text-4xl font-serif absolute -top-4 -left-2 opacity-20 group-hover:opacity-40 transition-opacity">
                      "
                    </span>
                    <p className="text-zinc-200 text-sm leading-relaxed font-light mb-8 tracking-wide">
                      {q.content || q.quote}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="h-px w-4 bg-red-900"></div>
                      <span className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-medium group-hover:text-zinc-300 transition-colors">
                        {q.author || "Origin Unknown"}
                      </span>
                    </div>
                  </div>

                  {/* Subtle ID watermark */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-zinc-800 tracking-tighter uppercase">
                      Ref_{String(i).padStart(3, "0")}
                    </span>
                  </div>
                </div>
              ))}
        </div>

        {/* Vertical Side Decoration (Hidden on small screens) */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-1000">
          <div className="w-px h-24 bg-zinc-800"></div>
          <span className="[writing-mode:vertical-lr] text-[9px] uppercase tracking-[1em] text-zinc-500">
            哲学 // PHILOSOPHY
          </span>
          <div className="w-px h-24 bg-zinc-800"></div>
        </div>
      </div>
    </div>
  );
}
