import { useState, useEffect } from "react";

export default function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomjokes?page=1&limit=10")
      .then((r) => r.json())
      .then((json) => setJokes(json.data?.data || json.data || []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-3xl mx-auto px-8 py-20">
        {/* Header Section */}
        <header className="relative flex flex-col items-center mb-32 text-center">
          <span className="text-red-600 text-[10px] font-bold tracking-[0.8em] mb-4 uppercase">
            娯楽 // ENTERTAINMENT
          </span>
          <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase italic">
            Jokes<span className="text-red-600">.</span>
          </h1>
          <div className="mt-8 w-px h-16 bg-gradient-to-b from-red-600 to-transparent"></div>
        </header>

        {/* Content Section */}
        <div className="space-y-24">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-8 h-px bg-zinc-800 animate-pulse"></div>
              <span className="text-[9px] tracking-[1em] text-zinc-600 uppercase">
                Deciphering
              </span>
            </div>
          ) : (
            jokes.map((j, i) => (
              <article
                key={i}
                className="group relative grid grid-cols-[auto_1fr] gap-8 md:gap-12 items-start"
              >
                {/* Vertical Counter & Line */}
                <div className="flex flex-col items-center pt-2">
                  <span className="text-[10px] font-bold text-zinc-800 group-hover:text-red-600 transition-colors duration-500 tracking-tighter">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-px h-full min-h-[40px] bg-zinc-900 mt-4 group-hover:bg-red-900 transition-colors duration-700"></div>
                </div>

                <div className="space-y-8">
                  {/* Setup */}
                  <p className="text-zinc-200 text-xl font-light leading-relaxed tracking-wide">
                    {j.setup || j.joke || j.content}
                  </p>

                  {/* Punchline Controller */}
                  {j.punchline && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setRevealed({ ...revealed, [i]: !revealed[i] })
                        }
                        className={`text-[9px] uppercase tracking-[0.4em] transition-all duration-500 px-4 py-2 border ${
                          revealed[i]
                            ? "border-zinc-800 text-zinc-600 hover:text-zinc-400"
                            : "border-red-900 text-red-500 bg-red-900/5 hover:bg-red-900 hover:text-white"
                        }`}
                      >
                        {revealed[i] ? "Hide_Response" : "Access_Punchline"}
                      </button>

                      {revealed[i] && (
                        <div className="mt-10 animate-in fade-in slide-in-from-left duration-700">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-red-600 text-[10px] font-black tracking-widest uppercase italic">
                              Ans:
                            </span>
                            <div className="h-px flex-grow bg-zinc-900"></div>
                          </div>
                          <p className="text-red-600 text-lg italic font-light pl-4 border-l-2 border-red-900/30">
                            {j.punchline}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        {/* Footer Accent */}
        {!loading && (
          <footer className="mt-40 pt-12 border-t border-zinc-900 text-center">
            <p className="text-[8px] tracking-[0.6em] text-zinc-700 uppercase">
              End of Transmission // 終わり
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
