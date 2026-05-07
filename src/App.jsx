import { useState, useEffect, useRef } from "react";

const INITIAL_ITEMS = [
  { id: 1, emoji: "🍜", name: "Tagessuppe", desc: "Hausgemachte Gemüsesuppe mit frischem Brot", cat: "warm", price: "4.50", allergens: ["Gluten"], popular: false, active: true },
  { id: 2, emoji: "🥗", name: "Wellness Bowl", desc: "Quinoa, gegrilltes Gemüse, Tahini-Dressing", cat: "warm", price: "9.80", allergens: ["Vegan", "Glutenfrei"], popular: true, active: true },
  { id: 3, emoji: "🥩", name: "Flammkuchen", desc: "Elsässisch, Crème fraîche, Zwiebeln, Speck", cat: "warm", price: "8.90", allergens: ["Gluten", "Laktose"], popular: false, active: true },
  { id: 4, emoji: "🍳", name: "Rührei Deluxe", desc: "Drei Eier, Kräuter, Toast, Tomatensalat", cat: "warm", price: "7.50", allergens: ["Laktose"], popular: false, active: true },
  { id: 5, emoji: "🧀", name: "Käsebreze", desc: "Frische Laugenbreze mit Obazda und Radieschen", cat: "snack", price: "3.90", allergens: ["Gluten", "Laktose"], popular: true, active: true },
  { id: 6, emoji: "🥨", name: "Breze mit Butter", desc: "Klassisch bayrisch, Meersalzbutter", cat: "snack", price: "2.20", allergens: ["Gluten", "Laktose"], popular: false, active: true },
  { id: 7, emoji: "🍇", name: "Obstplatte", desc: "Saisonales Obst, Joghurt-Minzdip", cat: "snack", price: "5.50", allergens: ["Vegan", "Glutenfrei"], popular: false, active: true },
  { id: 8, emoji: "☕", name: "Espresso / Cappuccino", desc: "Selezione Italiana, Vollmilch oder Hafer", cat: "drink", price: "2.50", allergens: [], popular: false, active: true },
  { id: 9, emoji: "🍵", name: "Bio-Kräutertee", desc: "Minze, Kamille oder Ingwer-Zitrone", cat: "drink", price: "2.80", allergens: ["Vegan"], popular: false, active: true },
  { id: 10, emoji: "🥤", name: "Wellness Smoothie", desc: "Ingwer, Kurkuma, Orange, Karotte", cat: "drink", price: "4.90", allergens: ["Vegan"], popular: true, active: true },
  { id: 11, emoji: "💧", name: "Mineralwasser", desc: "Still oder Sprudel, 0,5 L", cat: "drink", price: "1.80", allergens: ["Vegan"], popular: false, active: true },
  { id: 12, emoji: "🍰", name: "Kuchen des Tages", desc: "Fragen Sie nach der heutigen Auswahl", cat: "sweet", price: "3.50", allergens: ["Gluten", "Laktose"], popular: false, active: true },
  { id: 13, emoji: "🍫", name: "Schoko-Brownie", desc: "Warm serviert, Vanilleeis, Karamell", cat: "sweet", price: "5.90", allergens: ["Gluten", "Laktose"], popular: true, active: true },
];

const CAT_META = {
  warm:  { label: "Warme Speisen",        color: "#854F0B", bg: "#FAEEDA" },
  snack: { label: "Snacks",               color: "#085041", bg: "#E1F5EE" },
  drink: { label: "Getränke",             color: "#0C447C", bg: "#E6F1FB" },
  sweet: { label: "Süßes",               color: "#72243E", bg: "#FBEAF0" },
};

const ALLERGEN_COLORS = {
  "Gluten":     { bg: "#FAEEDA", color: "#633806" },
  "Laktose":    { bg: "#FBEAF0", color: "#72243E" },
  "Vegan":      { bg: "#EAF3DE", color: "#27500A" },
  "Glutenfrei": { bg: "#E6F1FB", color: "#0C447C" },
  "Nüsse":      { bg: "#EEEDFE", color: "#3C3489" },
};

const fmt = (price) => parseFloat(price).toFixed(2).replace(".", ",") + " €";

// ─── CUSTOMER MENU ───────────────────────────────────────────────────────────
function CustomerMenu({ items }) {
  const [activeCat, setActiveCat] = useState("all");
  const [lang, setLang] = useState("DE");
  const activeItems = items.filter(i => i.active);
  const cats = ["all", "warm", "snack", "drink", "sweet"];

  const filtered = activeCat === "all"
    ? activeItems
    : activeItems.filter(i => i.cat === activeCat);

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.cat]) grouped[item.cat] = [];
    grouped[item.cat].push(item);
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f5ef", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');
        .menu-item-card { transition: transform 0.15s, box-shadow 0.15s; }
        .menu-item-card:hover { transform: translateY(-2px); }
        .cat-pill { transition: all 0.2s; cursor: pointer; border: none; }
        .lang-btn { cursor: pointer; border: none; background: transparent; font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Hero */}
      <div style={{ background: "#1a1a1a", padding: "32px 24px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 14px)", opacity: 0.04 }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 12px", fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 12 }}>
            ◆ Sauna & Wellness
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 600, color: "#fff", lineHeight: 1.1, marginBottom: 4 }}>Bambados<br />Catering</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 300, marginBottom: 20 }}>Margaretendamm 40 · Bamberg</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Frisch zubereitet", "Täglich wechselnd", "Regionale Zutaten"].map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
          {["DE", "EN"].map(l => (
            <button key={l} className="lang-btn" onClick={() => setLang(l)} style={{ fontSize: 11, color: lang === l ? "#fff" : "rgba(255,255,255,0.35)", padding: "3px 9px", border: `0.5px solid ${lang === l ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`, borderRadius: 10 }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Category nav */}
      <div style={{ display: "flex", gap: 8, padding: "14px 18px", background: "#f8f5ef", overflowX: "auto", borderBottom: "0.5px solid #e8e3da", position: "sticky", top: 0, zIndex: 5 }}>
        {cats.map(cat => (
          <button key={cat} className="cat-pill" onClick={() => setActiveCat(cat)}
            style={{ flexShrink: 0, padding: "7px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: activeCat === cat ? "#1a1a1a" : "transparent", color: activeCat === cat ? "#fff" : "#6b6560", border: `0.5px solid ${activeCat === cat ? "#1a1a1a" : "#d4cfc5"}`, fontFamily: "'DM Sans', sans-serif" }}>
            {cat === "all" ? "Alle" : CAT_META[cat].label}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <div style={{ padding: "8px 0 32px" }}>
        {Object.keys(CAT_META).filter(cat => grouped[cat]?.length).map(cat => (
          <div key={cat}>
            <div style={{ padding: "18px 20px 8px", fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: "#1a1a1a" }}>{CAT_META[cat].label}</div>
            <div style={{ padding: "0 14px", display: "flex", flexDirection: "column", gap: 8 }}>
              {grouped[cat].map(item => (
                <div key={item.id} className="menu-item-card" style={{ background: "#fff", borderRadius: 16, padding: "14px 16px", display: "flex", gap: 12, border: "0.5px solid #ece7de" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f4f0e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {item.popular && <div style={{ fontSize: 10, fontWeight: 500, color: "#92530a", background: "#fff8ec", border: "0.5px solid #f5d59a", borderRadius: 6, padding: "2px 8px", display: "inline-block", marginBottom: 4 }}>★ Beliebt</div>}
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#9b9189", fontWeight: 300, lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a" }}>{fmt(item.price)}</span>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                        {item.allergens.map(a => {
                          const c = ALLERGEN_COLORS[a] || { bg: "#f0f0f0", color: "#555" };
                          return <span key={a} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, fontWeight: 500, background: c.bg, color: c.color }}>{a}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 0.5, background: "#e8e3da", margin: "12px 20px 0" }} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#9b9189", fontSize: 14 }}>Keine Gerichte in dieser Kategorie.</div>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "12px 0 20px", fontSize: 10, color: "#bbb6ac", letterSpacing: 0.5 }}>Powered by MenuQR · menuqr.de</div>
    </div>
  );
}

// ─── MANAGER DASHBOARD ───────────────────────────────────────────────────────
function ManagerDashboard({ items, setItems }) {
  const [modal, setModal] = useState(null); // null | 'add' | item
  const [toast, setToast] = useState("");
  const [toastTimer, setToastTimer] = useState(null);
  const [form, setForm] = useState({});
  const nextId = useRef(100);

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer) clearTimeout(toastTimer);
    const t = setTimeout(() => setToast(""), 2500);
    setToastTimer(t);
  };

  const openAdd = () => {
    setForm({ emoji: "🍽️", cat: "warm", name: "", desc: "", price: "", allergens: "", popular: false, active: true });
    setModal("add");
  };

  const openEdit = (item) => {
    setForm({ ...item, allergens: item.allergens.join(", ") });
    setModal(item);
  };

  const saveForm = () => {
    if (!form.name.trim()) return;
    const allergens = form.allergens ? form.allergens.split(",").map(a => a.trim()).filter(Boolean) : [];
    if (modal === "add") {
      setItems(prev => [...prev, { ...form, allergens, id: nextId.current++ }]);
      showToast(`"${form.name}" hinzugefügt`);
    } else {
      setItems(prev => prev.map(i => i.id === modal.id ? { ...form, allergens, id: modal.id } : i));
      showToast(`"${form.name}" aktualisiert`);
    }
    setModal(null);
  };

  const deleteItem = (item) => {
    setItems(prev => prev.filter(i => i.id !== item.id));
    showToast(`"${item.name}" gelöscht`);
  };

  const toggleActive = (id) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      showToast(i.active ? `Versteckt` : `Aktiviert`);
      return { ...i, active: !i.active };
    }));
  };

  const active = items.filter(i => i.active).length;
  const now = new Date();
  const timeStr = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 14, color: "var(--color-text-primary, #1a1a1a)", minHeight: "100vh", background: "var(--color-background-tertiary, #f5f5f5)", position: "relative" }}>
      <style>{`
        .dash-input { width: 100%; padding: 8px 10px; font-size: 13px; border: 0.5px solid #ccc; border-radius: 8px; background: white; color: inherit; font-family: inherit; box-sizing: border-box; }
        .dash-input:focus { outline: none; border-color: #1a1a1a; }
        .row-btn { width: 30px; height: 30px; border-radius: 8px; border: 0.5px solid #e0e0e0; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.15s; }
        .row-btn:hover { background: #f0f0f0; }
        .row-btn.del:hover { background: #fff0f0; color: #c0392b; border-color: #f5c0c0; }
        .toggle-track { width: 34px; height: 20px; border-radius: 10px; position: relative; cursor: pointer; border: none; transition: background 0.2s; }
        .toggle-thumb { position: absolute; width: 14px; height: 14px; border-radius: 50%; background: white; top: 3px; transition: left 0.2s; }
        .action-bar-btn { flex: 1; padding: 10px; border-radius: 8px; border: 0.5px solid #d0d0d0; background: transparent; color: inherit; font-size: 12px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-family: inherit; transition: background 0.15s; }
        .action-bar-btn:hover { background: #efefef; }
      `}</style>

      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "white", borderBottom: "0.5px solid #e8e8e8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "#1a1a1a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🍽</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Bambados Catering</div>
            <div style={{ fontSize: 11, color: "#888" }}>MenuQR · Manager Dashboard</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#eaf3de", border: "0.5px solid #b4d97a", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 500, color: "#3b6d11" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3b6d11" }} />
          Menü live
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, padding: "16px 20px" }}>
        {[
          { label: "Scans heute", val: "47", sub: "+12 vs. gestern" },
          { label: "Aktive Gerichte", val: active, sub: `von ${items.length} gesamt` },
          { label: "Zuletzt aktualisiert", val: timeStr, sub: "von Ihnen" },
          { label: "Ø Verweildauer", val: "1:42", sub: "min auf Menü" },
        ].map(m => (
          <div key={m.label} style={{ background: "white", border: "0.5px solid #e8e8e8", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 500 }}>{m.val}</div>
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* List header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 20px 10px" }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#888", letterSpacing: 0.3 }}>SPEISEKARTE VERWALTEN</span>
        <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 6, background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
          + Gericht hinzufügen
        </button>
      </div>

      {/* Items by category */}
      <div style={{ padding: "0 20px 16px" }}>
        {Object.keys(CAT_META).map(cat => {
          const catItems = items.filter(i => i.cat === cat);
          if (!catItems.length) return null;
          return (
            <div key={cat} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: "#aaa", letterSpacing: 0.5, padding: "6px 0 4px", textTransform: "uppercase" }}>{CAT_META[cat].label}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {catItems.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "white", border: "0.5px solid #e8e8e8", borderRadius: 10, padding: "10px 12px", opacity: item.active ? 1 : 0.5 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, minWidth: 54, textAlign: "right", flexShrink: 0 }}>{fmt(item.price)}</div>
                    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      <button className="row-btn" onClick={() => openEdit(item)} title="Bearbeiten">✏️</button>
                      <button className="row-btn del" onClick={() => deleteItem(item)} title="Löschen">🗑</button>
                    </div>
                    <button className="toggle-track" onClick={() => toggleActive(item.id)} style={{ background: item.active ? "#1a1a1a" : "#ccc", flexShrink: 0 }} aria-label="Ein/Aus">
                      <div className="toggle-thumb" style={{ left: item.active ? 17 : 3 }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer actions */}
      <div style={{ display: "flex", gap: 8, padding: "4px 20px 20px" }}>
        <button className="action-bar-btn" onClick={() => showToast("QR-Code als PDF heruntergeladen")}>📥 QR-Code</button>
        <button className="action-bar-btn" onClick={() => showToast("Vorschau geöffnet")}>👁 Vorschau</button>
        <button className="action-bar-btn" onClick={() => showToast("✓ Menü veröffentlicht!")} style={{ border: "0.5px solid #1a1a1a", fontWeight: 500 }}>🚀 Veröffentlichen</button>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50, minHeight: 400 }}>
          <div style={{ background: "white", borderRadius: 14, padding: 22, width: "100%", maxWidth: 400, border: "0.5px solid #e0e0e0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{modal === "add" ? "Neues Gericht" : "Gericht bearbeiten"}</span>
              <button onClick={() => setModal(null)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginBottom: 4 }}>EMOJI</div>
                <input className="dash-input" value={form.emoji || ""} onChange={e => setForm(f => ({ ...f, emoji: e.target.value }))} style={{ textAlign: "center", fontSize: 20, padding: "4px" }} maxLength={2} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginBottom: 4 }}>KATEGORIE</div>
                <select className="dash-input" value={form.cat || "warm"} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))}>
                  {Object.entries(CAT_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
            </div>
            {[
              { label: "NAME", key: "name", placeholder: "z.B. Tagessuppe" },
              { label: "BESCHREIBUNG", key: "desc", placeholder: "Zutaten, Besonderheiten…" },
              { label: "PREIS (€)", key: "price", placeholder: "4.50" },
              { label: "ALLERGENE (kommagetrennt)", key: "allergens", placeholder: "Gluten, Laktose, Vegan…" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "#888", fontWeight: 500, marginBottom: 4 }}>{f.label}</div>
                <input className="dash-input" value={form[f.key] || ""} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.placeholder} />
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <input type="checkbox" id="popular" checked={!!form.popular} onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))} />
              <label htmlFor="popular" style={{ fontSize: 13, cursor: "pointer" }}>Als "Beliebt" markieren</label>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setModal(null)} style={{ padding: "9px 16px", borderRadius: 8, border: "0.5px solid #ccc", background: "transparent", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Abbrechen</button>
              <button onClick={saveForm} style={{ flex: 1, padding: 9, borderRadius: 8, background: "#1a1a1a", color: "#fff", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Speichern</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "#fff", padding: "9px 18px", borderRadius: 20, fontSize: 13, whiteSpace: "nowrap", zIndex: 100 }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("menu"); // 'menu' | 'dashboard'
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const MANAGER_PIN = "1234";

  const handlePin = (e) => {
    e.preventDefault();
    if (pin === MANAGER_PIN) {
      setPinUnlocked(true);
      setView("dashboard");
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
      {/* Tab switcher */}
      <div style={{ display: "flex", background: "#1a1a1a", position: "sticky", top: 0, zIndex: 20 }}>
        <button onClick={() => setView("menu")} style={{ flex: 1, padding: "11px 0", fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "inherit", background: view === "menu" ? "#fff" : "transparent", color: view === "menu" ? "#1a1a1a" : "rgba(255,255,255,0.5)", borderRadius: view === "menu" ? "0 0 0 0" : 0, transition: "all 0.2s" }}>
          🍽 Gästemenü
        </button>
        <button onClick={() => { if (!pinUnlocked) { setView("pin"); } else { setView("dashboard"); } }} style={{ flex: 1, padding: "11px 0", fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "inherit", background: (view === "dashboard" || view === "pin") ? "#fff" : "transparent", color: (view === "dashboard" || view === "pin") ? "#1a1a1a" : "rgba(255,255,255,0.5)", transition: "all 0.2s" }}>
          ⚙️ Manager
        </button>
      </div>

      {/* PIN screen */}
      {view === "pin" && (
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, background: "#f8f5ef" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 6 }}>Manager-Bereich</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 28, textAlign: "center" }}>Bitte PIN eingeben um fortzufahren</div>
          <form onSubmit={handlePin} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%", maxWidth: 220 }}>
            <input
              type="password" maxLength={4} value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false); }}
              placeholder="● ● ● ●"
              style={{ width: "100%", padding: "12px 16px", fontSize: 20, textAlign: "center", letterSpacing: 8, border: `1.5px solid ${pinError ? "#e74c3c" : "#ddd"}`, borderRadius: 10, background: "#fff", fontFamily: "inherit", outline: "none" }}
              autoFocus
            />
            {pinError && <div style={{ fontSize: 12, color: "#e74c3c" }}>Falsche PIN. Versuche: 1234</div>}
            <button type="submit" style={{ width: "100%", padding: "11px 0", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>Einloggen</button>
          </form>
          <div style={{ marginTop: 20, fontSize: 11, color: "#bbb" }}>Demo-PIN: 1234</div>
        </div>
      )}

      {view === "menu" && <CustomerMenu items={items} />}
      {view === "dashboard" && pinUnlocked && <ManagerDashboard items={items} setItems={setItems} />}
    </div>
  );
}
