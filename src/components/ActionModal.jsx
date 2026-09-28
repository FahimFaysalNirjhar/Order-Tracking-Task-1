import { useState } from "react";

const REASONS = {
  missing: [
    ["Not at my address", "Package isn’t at the door or with neighbors"],
    ["Wrong address", "Courier went to a different place"],
    ["Package looks stolen", "Someone may have taken it"],
  ],
  report: [
    ["Order is late", "It has passed the estimated time"],
    ["Package damaged", "Box or item arrived damaged"],
    ["Wrong address", "Courier has the wrong location"],
  ],
};

export default function ActionModal({ kind, onClose, onToast }) {
  const [reason, setReason] = useState(0);
  const [phase, setPhase] = useState("form"); // form | sending | done
  if (!kind) return null;

  const submit = () => {
    setPhase("sending");
    setTimeout(() => setPhase("done"), 800);
  };
  const pick = (msg) => {
    onClose();
    onToast(msg);
  };

  return (
    <dialog
      className="modal modal-open modal-bottom sm:modal-middle"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-box">
        {kind === "support" && (
          <>
            <h3 className="text-lg font-bold">Contact support</h3>
            <p className="py-2 opacity-70">Pick the fastest way to reach us.</p>
            <div className="flex flex-col gap-2">
              <button
                className="btn btn-outline justify-start"
                onClick={() => pick("Opening live chat…")}
              >
                💬 Live chat · replies in ~2 min
              </button>
              <button
                className="btn btn-outline justify-start"
                onClick={() => pick("Calling support…")}
              >
                📞 Call us · 8 AM – 10 PM
              </button>
              <button
                className="btn btn-outline justify-start"
                onClick={() => pick("Email draft opened")}
              >
                ✉️ Email · reply within 24 h
              </button>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {kind !== "support" && phase !== "done" && (
          <>
            <h3 className="text-lg font-bold">
              {kind === "missing"
                ? "Report missing package"
                : "Report a delivery issue"}
            </h3>
            <p className="py-2 opacity-70">
              Tell us what happened. We’ll contact the courier for you.
            </p>
            <div className="flex flex-col gap-2">
              {REASONS[kind].map(([t, d], i) => (
                <label
                  key={t}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${reason === i ? "border-primary bg-primary/10" : "border-base-300"}`}
                >
                  <input
                    type="radio"
                    name="reason"
                    className="radio radio-primary"
                    checked={reason === i}
                    onChange={() => setReason(i)}
                  />
                  <span>
                    <b>{t}</b>
                    <br />
                    <small className="opacity-60">{d}</small>
                  </span>
                </label>
              ))}
            </div>
            <textarea
              className="textarea mt-3 w-full"
              placeholder="Add details (optional)"
            />
            <div className="modal-action">
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={submit}
                disabled={phase === "sending"}
              >
                {phase === "sending" ? (
                  <span className="loading loading-spinner" />
                ) : (
                  "Submit report"
                )}
              </button>
            </div>
          </>
        )}

        {kind !== "support" && phase === "done" && (
          <div className="text-center">
            <div className="text-4xl">✅</div>
            <h3 className="mt-2 text-lg font-bold">Report received</h3>
            <p className="py-2 opacity-70">
              Case #RP-20931 is open. We’ll email you within 24 hours with a
              replacement or refund.
            </p>
            <button className="btn btn-primary w-full" onClick={onClose}>
              Done
            </button>
          </div>
        )}
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
}
