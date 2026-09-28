export default function OrderSummary({ order }) {
  const total = order.items.reduce((a, i) => a + i.p * i.q, 0);
  return (
    <section className="card card-border bg-base-100 mt-4">
      <div className="card-body">
        <h2 className="card-title">Order summary</h2>
        {order.items.map((i) => (
          <div key={i.n} className="flex items-center gap-3">
            <span
              className="grid size-12 place-items-center rounded-lg bg-base-200 text-2xl"
              aria-hidden="true"
            >
              {i.e}
            </span>
            <div className="flex-1">
              <p className="font-semibold">{i.n}</p>
              <p className="text-sm opacity-60">
                {i.v} · Qty {i.q}
              </p>
            </div>
            <p className="font-semibold">${(i.p * i.q).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between border-t border-base-300 pt-3 font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" aria-label="Toggle order details" />
          <div className="collapse-title font-semibold">View order details</div>
          <div className="collapse-content grid grid-cols-[90px_1fr] gap-y-1 text-sm">
            <span className="opacity-60">Order</span>
            <span>{order.id}</span>
            <span className="opacity-60">Placed</span>
            <span>{order.placed}</span>
            <span className="opacity-60">Ship to</span>
            <span>{order.addr}</span>
            <span className="opacity-60">Payment</span>
            <span>{order.pay}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
