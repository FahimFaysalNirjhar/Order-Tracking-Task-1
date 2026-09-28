import { TONE } from "../data/scenarios";

export default function StatusHero({ s, notified, onAction }) {
  const t = TONE[s.tone];
  const late = s.tone === "warning";
  return (
    <section
      className={`rounded-2xl border p-5 ${t.box}`}
      aria-labelledby="status-title"
    >
      <span className={`badge badge-soft ${t.badge}`}>{s.pill}</span>
      <h1 id="status-title" className="mt-3 text-2xl font-bold">
        {s.title}
      </h1>
      <p className="mt-1 opacity-80">{s.msg}</p>

      <div className="mt-4 flex justify-between gap-3 border-t border-base-content/10 pt-3 text-sm">
        <div>
          <div className="opacity-60">{s.eta[0]}</div>
          <div
            className={`font-semibold ${late ? "line-through opacity-60" : ""}`}
          >
            {s.eta[1]}
          </div>
        </div>
        <div className="text-right">
          <div className="opacity-60">{s.eta[2]}</div>
          <div className="font-semibold">{s.eta[3]}</div>
        </div>
      </div>

      <div role="alert" className="alert mt-4 text-sm">
        <span>{s.alert}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className={`btn flex-1 ${t.btn}`}
          onClick={() => onAction(s.primary[1])}
        >
          {s.pending && notified ? "✓ You’ll be notified" : s.primary[0]}
        </button>
        <button className="btn flex-1" onClick={() => onAction(s.secondary[1])}>
          {s.secondary[0]}
        </button>
      </div>
    </section>
  );
}
