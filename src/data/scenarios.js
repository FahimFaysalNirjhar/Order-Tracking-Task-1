export const ORDER = {
  id: "#48213-7790",
  placed: "Sat, Sep 26",
  addr: "House 12, Road 5, Rangpur",
  carrier: "SwiftCourier",
  trk: "SC-90417723",
  pay: "Card ending 4417",
  items: [
    { n: "Trail Runner Jacket", v: "Olive, M", q: 1, p: 89, e: "🧥" },
    { n: "Merino Socks (3-pack)", v: "Grey", q: 1, p: 24, e: "🧦" },
  ],
};

export const STEPS = [
  "Order placed",
  "Processing",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

// Full class names so Tailwind can detect them
export const TONE = {
  warning: {
    box: "bg-warning/10 border-warning/30",
    badge: "badge-warning",
    btn: "btn-warning",
    dot: "border-warning text-warning ring-warning/20",
  },
  error: {
    box: "bg-error/10 border-error/30",
    badge: "badge-error",
    btn: "btn-error",
    dot: "border-error text-error ring-error/20",
  },
  info: {
    box: "bg-info/10 border-info/30",
    badge: "badge-info",
    btn: "btn-info",
    dot: "border-info text-info ring-info/20",
  },
};

export const SCENARIOS = {
  delayed: {
    tone: "warning",
    pill: "Delayed",
    title: "Running late",
    msg: "Your package missed its delivery window. It is still on its way and is with the courier.",
    eta: ["Was due", "Today, 6:00 PM", "New estimate", "Tomorrow, by 2 PM"],
    cur: 3,
    stamps: [
      "Sep 26, 4:10 PM",
      "Sep 26, 9:30 PM",
      "Sep 27, 11:05 AM",
      "Today, 8:40 AM",
      "",
    ],
    notes: { 3: "Delayed by heavy traffic at the local hub" },
    alert:
      "⏱ Sorry for the delay. If it has not arrived by tomorrow, 2 PM, you can request a replacement or refund.",
    primary: ["Contact support", "support"],
    secondary: ["Report a delivery issue", "report"],
  },
  missing: {
    tone: "error",
    pill: "Marked delivered",
    title: "Delivered, but not received?",
    msg: "The courier marked this order as delivered today at 1:42 PM. If you do not have it, we will help you find it.",
    eta: ["Delivered", "Today, 1:42 PM", "Left at", "Front door"],
    cur: 4,
    missing: true,
    stamps: [
      "Sep 24, 4:10 PM",
      "Sep 24, 9:30 PM",
      "Sep 25, 11:05 AM",
      "Today, 9:15 AM",
      "Today, 1:42 PM",
    ],
    notes: { 4: "Left at front door · photo on file" },
    alert:
      "📍 Delivery confirmed near House 12, Road 5. Check with neighbors and any safe place before reporting.",
    primary: ["I didn’t receive it", "missing"],
    secondary: ["Contact support", "support"],
  },
  pending: {
    tone: "info",
    pill: "Preparing",
    title: "Tracking starts soon",
    msg: "The seller is packing your order. Tracking appears here once the courier scans your package.",
    eta: [
      "Expected to ship",
      "By Sep 29",
      "Estimated delivery",
      "Oct 1 – Oct 3",
    ],
    cur: 1,
    pending: true,
    stamps: ["Today, 10:20 AM", "In progress", "", "", ""],
    notes: { 1: "Usually takes up to 24 hours" },
    alert: "🔔 We’ll notify you as soon as a tracking number is assigned.",
    primary: ["Notify me when it ships", "notify"],
    secondary: ["Contact support", "support"],
  },
};
