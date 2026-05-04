import { useState } from "react";

const BASE = "https://api.freeapi.app/api/v1";

export default function Auth() {
  const [tab, setTab] = useState("login");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fp_user") || "null");
    } catch {
      return null;
    }
  });
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  function flash(text, type = "ok") {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 4000);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Login failed");
      const u = json.data?.user || json.data;
      localStorage.setItem("fp_user", JSON.stringify(u));
      setUser(u);
      flash("Identity Verified // 認証済み");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Registration failed");
      flash("Registry Entry Created. Proceed.");
      setTab("login");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${BASE}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("fp_user");
    setUser(null);
    flash("Session Terminated // 終了");
  }

  async function fetchCurrentUser() {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/users/current-user`, {
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed");
      const u = json.data?.user || json.data;
      localStorage.setItem("fp_user", JSON.stringify(u));
      setUser(u);
      flash("Registry Refreshed");
    } catch (err) {
      flash(err.message, "err");
    } finally {
      setLoading(false);
    }
  }

  const inp =
    "w-full bg-zinc-950/50 border border-zinc-900 text-zinc-200 px-4 py-4 text-[11px] tracking-[0.2em] outline-none focus:border-red-600 focus:bg-black transition-all duration-700 placeholder-zinc-800 uppercase";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 font-sans flex flex-col justify-center items-center selection:bg-red-600 selection:text-white">
      <div className="max-w-sm w-full px-8 py-12 relative overflow-hidden">
        {/* Header Design */}
        <header className="mb-16 relative">
          <div className="flex flex-col">
            <span className="text-red-600 text-[10px] font-bold tracking-[0.6em] mb-2 uppercase">
              アクセス // ACCESS
            </span>
            <h1 className="text-5xl font-extralight tracking-tighter text-zinc-100 uppercase italic">
              Authentication<span className="text-red-600">.</span>
            </h1>
          </div>
          <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-transparent"></div>
        </header>

        {/* Messaging Area */}
        <div className="h-6 mb-8 overflow-hidden">
          {msg && (
            <div
              className={`text-[9px] tracking-[0.4em] uppercase animate-in slide-in-from-bottom duration-500 ${msg.type === "err" ? "text-red-600 font-bold" : "text-zinc-500"}`}
            >
              {`> ${msg.text}`}
            </div>
          )}
        </div>

        {user ? (
          /* Profile Section */
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="flex flex-col items-center gap-8">
              <div className="relative group">
                <div className="absolute inset-[-8px] border border-zinc-800 rotate-45 group-hover:rotate-90 transition-all duration-1000"></div>
                <div className="w-20 h-20 bg-zinc-900 flex items-center justify-center text-3xl font-extralight text-zinc-100 border border-zinc-800">
                  {(user.username || "?")[0].toUpperCase()}
                </div>
              </div>
              <div className="text-center">
                <p className="text-zinc-100 tracking-[0.5em] text-xs uppercase font-medium">
                  {user.username}
                </p>
                <p className="text-zinc-700 text-[10px] tracking-widest mt-2 uppercase italic">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={fetchCurrentUser}
                disabled={loading}
                className="group relative border border-zinc-800 text-zinc-500 text-[10px] py-4 uppercase tracking-[0.4em] overflow-hidden hover:text-white transition-all"
              >
                <span className="relative z-10">Re-Sync Registry</span>
                <div className="absolute inset-0 bg-zinc-900 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>

              <button
                onClick={handleLogout}
                className="border border-red-900 text-red-600 text-[10px] py-4 uppercase tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all"
              >
                Terminate_Session
              </button>
            </div>
          </div>
        ) : (
          /* Forms Section */
          <div className="animate-in fade-in duration-1000">
            <nav className="flex gap-10 mb-12 border-b border-zinc-900">
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`text-[10px] uppercase tracking-[0.4em] pb-4 transition-all relative ${
                    tab === t ? "text-zinc-100" : "text-zinc-700"
                  }`}
                >
                  {t}
                  {tab === t && (
                    <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-red-600"></div>
                  )}
                </button>
              ))}
            </nav>

            <form
              onSubmit={tab === "login" ? handleLogin : handleRegister}
              className="space-y-4"
            >
              <div className="space-y-4">
                <input
                  className={inp}
                  placeholder="ID_CREDENTIAL"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                />
                {tab === "register" && (
                  <input
                    className={inp}
                    type="email"
                    placeholder="EMAIL_ARCHIVE"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                )}
                <input
                  className={inp}
                  type="password"
                  placeholder="SECURITY_CIPHER"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group bg-zinc-100 text-black text-[10px] py-5 uppercase tracking-[0.5em] font-bold overflow-hidden"
                >
                  <span className="relative z-10">
                    {loading ? "INITIALIZING..." : "Execute_Access"}
                  </span>
                  <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Decorative Technical Footer */}
        <div className="mt-20 text-center">
          <p className="text-[8px] text-zinc-800 tracking-[0.8em] uppercase">
            Encrypted // End_to_End
          </p>
        </div>
      </div>
    </div>
  );
}
