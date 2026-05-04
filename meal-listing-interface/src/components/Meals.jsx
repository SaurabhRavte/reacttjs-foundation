import { useState, useEffect } from "react";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/meals?page=1&limit=12")
      .then((r) => r.json())
      .then((json) => setMeals(json.data?.data || json.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center space-y-4">
        <div className="w-px h-12 bg-red-600 animate-bounce"></div>
        <div className="text-[10px] tracking-[1em] text-zinc-500 uppercase animate-pulse">
          Dine Registry // 読み込み中
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header Section */}
        <div className="relative flex flex-col md:flex-row justify-between items-baseline mb-24 border-b border-zinc-900 pb-12">
          <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-3 uppercase">
              食文化 // CUISINE
            </span>
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase italic">
              Meals<span className="text-red-600">.</span>
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <p className="text-[9px] leading-relaxed tracking-[0.4em] uppercase text-zinc-600">
              Total Records: {meals.length} <br />
              Encryption: Standard_A
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-[2px] bg-red-600"></div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {meals.map((m, i) => {
            const meal = m.meals?.[0] || m;
            return (
              <div
                key={i}
                onClick={() => setSelected(meal)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950 border border-zinc-900 p-2 transition-all duration-500 group-hover:border-red-900/50">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-red-600 transition-all duration-500"></div>

                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100"
                    loading="lazy"
                  />

                  {/* Vertical Label */}
                  <div className="absolute bottom-4 left-4 mix-blend-difference">
                    <span className="text-[8px] tracking-[0.5em] text-white uppercase [writing-mode:vertical-lr]">
                      Archive No. {i + 101}
                    </span>
                  </div>
                </div>

                <h3 className="mt-6 text-zinc-300 text-[11px] font-medium tracking-[0.2em] uppercase group-hover:text-red-600 transition-colors duration-300">
                  {meal.strMeal}
                </h3>
                <div className="w-0 group-hover:w-full h-[1px] bg-red-900/30 mt-2 transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Modal Overlay */}
        {selected && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-zinc-950 border border-zinc-800 max-w-5xl w-full flex flex-col md:flex-row relative overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-red-600 transition-colors z-50 text-xl"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="md:w-1/2 relative bg-black">
                <img
                  src={selected.strMealThumb}
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r"></div>
              </div>

              {/* Modal Content */}
              <div className="md:w-1/2 p-8 md:p-14 space-y-8 overflow-y-auto max-h-[70vh] md:max-h-[85vh] custom-scrollbar">
                <div>
                  <span className="text-red-600 text-[9px] font-bold tracking-[0.5em] uppercase block mb-2">
                    Detailed View // 明細
                  </span>
                  <h2 className="text-3xl font-light text-white tracking-widest uppercase">
                    {selected.strMeal}
                  </h2>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase border-b border-zinc-900 pb-2">
                    Preparation
                  </h4>
                  <p className="text-zinc-400 text-xs leading-loose font-light tracking-wide whitespace-pre-line">
                    {selected.strInstructions}
                  </p>
                </div>

                {selected.strYoutube && (
                  <div className="pt-6">
                    <a
                      href={selected.strYoutube}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-4 border border-zinc-800 text-zinc-400 text-[10px] px-8 py-4 uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-500"
                    >
                      <span>Visual Guide</span>
                      <span className="text-xs">→</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
