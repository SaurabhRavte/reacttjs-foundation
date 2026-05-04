import { useState, useEffect } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=12",
    )
      .then((r) => r.json())
      .then((json) => setProducts(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header Section */}
        <header className="relative flex flex-col md:flex-row justify-between items-end mb-24 border-b border-zinc-900 pb-12">
          <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-3 uppercase">
              製品 // Products
            </span>
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase italic">
              Catalogue<span className="text-red-600">.</span>
            </h1>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-[9px] leading-relaxed tracking-[0.4em] uppercase text-zinc-600">
              Supply: Active <br />
              Region: Tokyo_Sector
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-32 h-[2px] bg-red-600"></div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {loading
            ? [...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-6">
                  <div className="aspect-square bg-zinc-950 border border-zinc-900" />
                  <div className="h-2 w-full bg-zinc-900" />
                </div>
              ))
            : products.map((p, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col border border-zinc-900 bg-zinc-950/30 p-5 transition-all duration-700 hover:border-red-900/50"
                >
                  {/* Stock Indicator Dot */}
                  <div className="absolute top-8 right-8 z-10 flex items-center gap-2">
                    <span className="text-[8px] tracking-[0.2em] text-zinc-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Stock_Ok
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  </div>

                  {/* Image Container */}
                  <div className="aspect-square bg-white relative overflow-hidden flex items-center mb-8">
                    <div className="absolute inset-0 bg-zinc-900/10 z-10 pointer-events-none group-hover:bg-transparent transition-colors" />
                    <img
                      src={p.thumbnail || p.images?.[0]}
                      alt={p.title}
                      className="w-full grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out p-6"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-zinc-100 text-[11px] font-medium tracking-[0.2em] uppercase line-clamp-2 leading-relaxed max-w-[70%]">
                        {p.title}
                      </h3>
                      <span className="text-red-600 text-[12px] font-bold tracking-tighter">
                        ¥{(p.price * 150).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                      <span className="text-zinc-600 text-[9px] uppercase tracking-[0.3em] italic">
                        {p.category}
                      </span>
                      <button className="text-[10px] text-zinc-500 hover:text-white transition-colors tracking-tighter border-b border-transparent hover:border-red-600 pb-1">
                        View_Spec
                      </button>
                    </div>
                  </div>

                  {/* Japanese Label Accent */}
                  <div className="absolute -left-[1px] top-10 transform -rotate-90 origin-left">
                    <span className="text-[7px] text-zinc-800 tracking-[0.5em] uppercase font-bold group-hover:text-red-900 transition-colors">
                      NKO-SYS-{i + 40}
                    </span>
                  </div>
                </div>
              ))}
        </div>

        {/* Footer Accent */}
        <footer className="mt-32 flex justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-px h-20 bg-gradient-to-b from-zinc-800 to-transparent"></div>
            <p className="text-[9px] tracking-[0.8em] text-zinc-700 uppercase">
              End of Log // 完了
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
