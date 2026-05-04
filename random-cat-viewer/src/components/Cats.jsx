import { useState, useEffect } from "react";

export default function Cats() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState([]);

  async function fetchCatData() {
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/cats/cat/random",
    );
    const json = await res.json();
    return json.data;
  }

  useEffect(() => {
    let ignore = false;
    async function loadCat() {
      setLoading(true);
      try {
        const data = await fetchCatData();
        if (!ignore) setCat(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadCat();
    return () => {
      ignore = true;
    };
  }, []);

  async function fetchCat() {
    setLoading(true);
    try {
      const data = await fetchCatData();
      setCat(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="relative flex justify-between items-baseline mb-20">
          <div className="flex flex-col">
            <span className="text-red-600 text-xs font-bold tracking-[0.5em] mb-2">
              // Cats
            </span>
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase">
              Feline<span className="text-red-600">.</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[9px] leading-loose tracking-[0.3em] uppercase opacity-50">
              Archive-ID: {cat?.id || "000"} <br />
              Status: {loading ? "Scanning" : "Detected"}
            </p>
          </div>
        </header>

        {/* Main Display */}
        <main className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
          <section className="group relative">
            {/* Japanese Corner Accents */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-zinc-800 group-hover:border-red-600 transition-colors duration-500"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-zinc-800 group-hover:border-red-600 transition-colors duration-500"></div>

            <div className="bg-zinc-950 border border-zinc-900 overflow-hidden relative aspect-4/5 md:aspect-square flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-px bg-red-600 animate-pulse"></div>
                  <span className="text-[10px] tracking-[0.8em] animate-pulse">
                    LOADING
                  </span>
                </div>
              ) : (
                <img
                  src={cat?.url || cat?.image}
                  alt="cat"
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-out"
                />
              )}
            </div>
          </section>

          {/* Sidebar Info & Controls */}
          <aside className="flex flex-col justify-between h-full py-4">
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-2">
                  Origin
                </label>
                <p className="text-sm text-zinc-300 font-light tracking-wide italic">
                  {cat?.breeds?.[0]?.origin || "Unknown Territory"}
                </p>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.3em] text-zinc-600 uppercase mb-2">
                  Classification
                </label>
                <p className="text-sm text-zinc-300 font-light tracking-widest uppercase">
                  {cat?.breeds?.[0]?.name || "Felis Catus"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-12 md:mt-0">
              <button
                onClick={fetchCat}
                disabled={loading}
                className="group relative px-6 py-4 bg-zinc-100 text-black text-[11px] font-bold uppercase tracking-[0.4em] overflow-hidden hover:text-white transition-colors duration-300"
              >
                <span className="relative z-10">Next</span>
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </aside>
        </main>

        {/* Saved Collection */}
        {saved.length > 0 && (
          <footer className="mt-32">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-zinc-600">
                Saved Logs
              </h2>
              <div className="h-px grow bg-zinc-900"></div>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
              {saved.map((url, i) => (
                <div
                  key={i}
                  className="group relative aspect-square overflow-hidden border border-zinc-900"
                >
                  <img
                    src={url}
                    alt="saved cat"
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
