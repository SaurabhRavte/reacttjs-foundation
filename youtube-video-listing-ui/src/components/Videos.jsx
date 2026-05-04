import { useState, useEffect } from "react";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=12",
    )
      .then((r) => r.json())
      .then((json) => setVideos(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header Section */}
        <header className="relative flex flex-col md:flex-row justify-between items-end mb-24 border-b border-zinc-900 pb-12">
          <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-3 uppercase">
              映像 // Youtube Videos
            </span>
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase italic">
              Videos<span className="text-red-600">.</span>
            </h1>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-[9px] leading-relaxed tracking-[0.4em] uppercase text-zinc-600">
              Signal: Decrypted <br />
              Bandwidth: Ultra_Low
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-red-600"></div>
        </header>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {loading
            ? [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-6">
                  <div className="aspect-video bg-zinc-950 border border-zinc-900" />
                  <div className="h-2 w-3/4 bg-zinc-900" />
                </div>
              ))
            : videos.map((v, i) => {
                const s = v.items?.snippet || v.snippet || {};
                return (
                  <div key={i} className="group cursor-pointer flex flex-col">
                    {/* Video Container */}
                    <div className="relative aspect-video overflow-hidden border border-zinc-900 bg-zinc-950 p-1 transition-all duration-500 group-hover:border-red-900/40">
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                        <div className="w-12 h-12 border border-white flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-700">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                      </div>

                      {/* Thumbnail */}
                      <img
                        src={
                          s.thumbnails?.high?.url || s.thumbnails?.medium?.url
                        }
                        alt={s.title}
                        className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                      />

                      {/* Technical ID Tag */}
                      <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 border border-zinc-800">
                        <span className="text-[8px] font-mono text-zinc-500 group-hover:text-red-500 tracking-tighter">
                          REC_0{i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Meta Data */}
                    <div className="mt-6 flex flex-col gap-3">
                      <h3 className="text-zinc-100 text-[11px] font-medium tracking-[0.15em] uppercase line-clamp-2 leading-relaxed group-hover:text-red-500 transition-colors duration-300">
                        {s.title}
                      </h3>

                      <div className="flex items-center gap-3">
                        <div className="w-4 h-px bg-red-900"></div>
                        <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase group-hover:text-zinc-400 transition-colors">
                          {s.channelTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Vertical Side Scroll Indicator */}
        <div className="fixed right-6 bottom-12 hidden xl:flex flex-col items-center gap-6">
          <span className="[writing-mode:vertical-lr] text-[8px] tracking-[0.8em] text-zinc-700 uppercase">
            Archives // 04-2026
          </span>
          <div className="w-px h-16 bg-linear-to-b from-zinc-800 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
