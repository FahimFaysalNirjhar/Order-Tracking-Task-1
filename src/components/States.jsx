export function LoadingState() {
  return (
    <div aria-busy="true" aria-label="Loading tracking">
      <div className="skeleton h-56 w-full" />
      <div className="skeleton mt-4 h-72 w-full" />
      <div className="skeleton mt-4 h-32 w-full" />
    </div>
  );
}

export function ErrorState({ onRetry, onSupport }) {
  return (
    <div className="card card-border bg-base-100 text-center">
      <div className="card-body items-center">
        <div className="text-4xl">📡</div>
        <h2 className="card-title">Can’t load tracking</h2>
        <p className="opacity-70">
          We couldn’t reach the tracking service. Your order is safe. Check your
          connection and try again.
        </p>
        <div className="card-actions mt-2">
          <button className="btn btn-primary" onClick={onRetry}>
            Try again
          </button>
          <button className="btn" onClick={onSupport}>
            Contact support
          </button>
        </div>
      </div>
    </div>
  );
}
