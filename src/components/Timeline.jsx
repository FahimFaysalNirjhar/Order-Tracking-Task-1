import { STEPS, TONE } from "../data/scenarios";

export default function Timeline({ s, carrier, trk }) {
  const t = TONE[s.tone];
  return (
    <section className="card card-border bg-base-100 mt-4">
      <div className="card-body">
        <h2 className="card-title">Delivery progress</h2>
        <ol aria-label="Delivery progress">
          {STEPS.map((name, i) => {
            const done = i < s.cur || (s.missing && i === s.cur);
            const now = i === s.cur && !s.missing;
            const last = i === STEPS.length - 1;
            return (
              <li
                key={name}
                className="relative grid grid-cols-[28px_1fr] gap-3 pb-5 last:pb-0"
              >
                {!last && (
                  <span
                    className={`absolute left-3.25 top-7 -bottom-0.5 w-0.5 ${done ? "bg-success" : "bg-base-300"}`}
                  />
                )}
                <span
                  className={`grid size-7 place-items-center rounded-full border-2 text-xs font-bold
                  ${
                    done
                      ? "bg-success border-success text-success-content"
                      : now
                        ? `ring-4 ${t.dot}`
                        : "border-base-300 text-base-content/50"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <div>
                  <p
                    className={`leading-tight ${!done && !now ? "opacity-60" : "font-semibold"}`}
                  >
                    {name}
                  </p>
                  {s.notes[i] && (
                    <p className="text-sm opacity-70">{s.notes[i]}</p>
                  )}
                  <p className="text-sm opacity-60">
                    {s.stamps[i] || (i > s.cur ? "Not started" : "")}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
        {!s.pending && (
          <p className="text-xs opacity-60">
            {carrier} · Tracking {trk}
          </p>
        )}
      </div>
    </section>
  );
}
