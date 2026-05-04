import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=12")
      .then((r) => r.json())
      .then((json) => setUsers(json.data?.data || json.data || []))
      .finally(() => setLoading(false));
  }, []);

  // Derive a stable ID from the user's own data — no Math.random() needed
  const getUserId = (d) => {
    const raw = `${d.name?.first}${d.name?.last}${d.location?.city}`;
    return raw
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      .toString(36)
      .substr(0, 5)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Header Section */}
        <div className="relative flex items-end justify-between mb-24 border-b border-zinc-900 pb-12">
          <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-3 uppercase">
              // Random Users
            </span>
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase italic">
              Directory<span className="text-red-600">.</span>
            </h1>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-[9px] leading-relaxed tracking-[0.4em] uppercase text-zinc-600">
              Access: Restricted <br />
              Database: Global_Core
            </p>
          </div>

          {/* Decorative Red Line */}
          <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-red-600"></div>
        </div>

        {/* Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-20">
          {loading
            ? [...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col items-center"
                >
                  <div className="w-24 h-24 bg-zinc-950 border border-zinc-900 rotate-45 mb-10" />
                  <div className="h-2 w-20 bg-zinc-900" />
                </div>
              ))
            : users.map((u, i) => {
                const d = u.login ? u : u.data || u;
                return (
                  <div
                    key={i}
                    className="group relative flex flex-col items-center text-center"
                  >
                    {/* Geometric Avatar Frame */}
                    <div className="relative mb-12">
                      {/* Rotating Diamond Border */}
                      <div className="absolute -inset-3 border border-zinc-800 rotate-45 group-hover:rotate-90 group-hover:border-red-600 transition-all duration-1000 ease-in-out"></div>

                      {/* Vertical Accent Line */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-4 bg-zinc-800 group-hover:bg-red-600 group-hover:h-8 transition-all duration-700"></div>

                      <div className="relative w-24 h-24 overflow-hidden bg-zinc-950 p-1">
                        <img
                          src={d.picture?.large || d.avatar}
                          alt={d.name?.first}
                          className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                        />
                      </div>
                    </div>

                    {/* Meta Data */}
                    <div className="space-y-1">
                      <h3 className="text-zinc-100 text-[11px] font-medium tracking-[0.2em] uppercase">
                        {d.name?.first} {d.name?.last}
                      </h3>
                      <p className="text-zinc-600 text-[9px] uppercase tracking-[0.3em] font-light">
                        {d.location?.city || "Sector 01"}
                      </p>

                      {/* Visual ID Tag */}
                      <div className="pt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="text-[8px] px-2 py-0.5 border border-red-900/50 text-red-600 tracking-tighter">
                          ID-{getUserId(d)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
