import { useEffect, useState } from "react";
import { ORDER, SCENARIOS } from "./data/scenarios";
import StatusHero from "./components/StatusHero";
import Timeline from "./components/Timeline";
import OrderSummary from "./components/OrderSummary";
import ActionModal from "./components/ActionModal";
import { LoadingState, ErrorState } from "./components/States";

const DEMO = [
  ["delayed", "Delayed"],
  ["missing", "Delivered, not received"],
  ["pending", "Tracking not available"],
  ["loading", "Loading"],
  ["error", "Error"],
];

export default function App() {
  const [view, setView] = useState("delayed");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [notified, setNotified] = useState(false);
  const [toast, setToast] = useState("");

  // Choose a scenario; data scenarios start in the loading state
  const select = (k) => {
    setView(k);
    setLoading(Boolean(SCENARIOS[k]));
  };

  // Fake network delay: the effect only runs the timer
  useEffect(() => {
    if (!loading) return;
    const id = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(id);
  }, [loading, view]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2600);
  };

  const onAction = (a) => {
    if (a === "notify") {
      setNotified((n) => !n);
      showToast(
        notified
          ? "Notification turned off"
          : "We’ll notify you when tracking is available",
      );
    } else setModal(a);
  };

  const s = SCENARIOS[view];

  return (
    <main className="mx-auto min-h-screen max-w-107.5 bg-base-200 px-4 pb-10 pt-3">
      <p className="text-xs opacity-60">Demo scenario</p>
      <div
        className="mb-3 flex gap-1.5 overflow-x-auto py-1"
        role="group"
        aria-label="Demo scenario"
      >
        {DEMO.map(([k, l]) => (
          <button
            key={k}
            onClick={() => select(k)}
            aria-pressed={view === k}
            className={`btn btn-xs whitespace-nowrap rounded-full ${view === k ? "btn-neutral" : "btn-outline"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <header className="mb-3">
        <p className="text-sm opacity-60">Order {ORDER.id}</p>
        <h2 className="text-xl font-bold">Track order</h2>
      </header>

      {view === "error" ? (
        <ErrorState
          onRetry={() => select("delayed")}
          onSupport={() => setModal("support")}
        />
      ) : view === "loading" || loading ? (
        <LoadingState />
      ) : (
        <>
          <StatusHero s={s} notified={notified} onAction={onAction} />
          <Timeline s={s} carrier={ORDER.carrier} trk={ORDER.trk} />
          {s.missing && (
            <section className="card card-border bg-base-100 mt-4">
              <div className="card-body">
                <h2 className="card-title">Before you report</h2>
                <ul className="list-disc pl-5 text-sm opacity-70">
                  <li>Check your front door, porch and gate.</li>
                  <li>Ask neighbors or building reception.</li>
                  <li>Look for a delivery notice from the courier.</li>
                  <li>Wait until end of day; scans sometimes post early.</li>
                </ul>
              </div>
            </section>
          )}
          <OrderSummary order={ORDER} />
          <section className="card card-border bg-base-100 mt-4">
            <div className="card-body">
              <h2 className="card-title">Need help?</h2>
              <p className="text-sm opacity-70">
                Our team replies within a few minutes, 8 AM – 10 PM daily.
              </p>
              <div className="card-actions">
                <button
                  className="btn flex-1"
                  onClick={() => setModal("support")}
                >
                  Contact support
                </button>
                <button
                  className="btn flex-1"
                  onClick={() => setModal("report")}
                >
                  Report a delivery issue
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      <ActionModal
        key={modal}
        kind={modal}
        onClose={() => setModal(null)}
        onToast={showToast}
      />
      {toast && (
        <div className="toast toast-center">
          <div className="alert alert-neutral" role="status">
            {toast}
          </div>
        </div>
      )}
    </main>
  );
}
