# Order Tracking Screen

A modern, mobile-first order tracking screen for an e-commerce app. It turns a bare four-word status ("Processing, Shipped, Out for Delivery, Delivered") into a screen where the delivery status is clear at a glance, and it adapts to three tricky real-world situations: delayed orders, delivered-but-not-received orders, and tracking that isn't available yet.

**Live demo:** https://order-tracking-nir.surge.sh
**Repository:** https://github.com/FahimFaysalNirjhar/Order-Tracking-Task-1

> Replace the two links above after you deploy and push.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Handled Scenarios](#handled-scenarios)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Design Decisions](#design-decisions)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Mock Data](#mock-data)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Overview

Users reported that the existing order status was hard to understand. This project redesigns the experience around one question: **"Where is my order, and what should I do next?"**

Every state shows a status headline, an estimated delivery time, a visual progress timeline, an order summary, and clear support actions. No backend is needed. All data is mocked in a single file.

## Features

- **Visual delivery timeline** with five steps (Order placed, Processing, Shipped, Out for delivery, Delivered), timestamps, and a highlighted current step
- **Status hero card** with a colour-coded badge, plain-language message, and estimated delivery date/time
- **Order summary** with items, quantities, and total
- **Expandable order details** (order number, placed date, shipping address, payment)
- **Contact support** with live chat, call, and email options
- **Report a delivery issue** with selectable reasons, optional notes, and a confirmation screen with a case number
- **Loading state** using skeleton placeholders
- **Error state** with "Try again" and "Contact support" actions
- **Demo scenario switcher** to preview every state instantly
- **Toast feedback** after actions
- **Notify me** toggle when tracking isn't available yet

## Handled Scenarios

| Scenario                       | What the user sees                                                                   | Next step offered                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Delayed order**              | Amber status, old estimate struck through, new estimate, reason for the delay        | Contact support, report a delivery issue; replacement or refund guidance if it is still late |
| **Delivered but not received** | Red status, delivery time and drop-off location, "Before you report" checklist       | "I didn't receive it" report flow, contact support                                           |
| **Tracking not available yet** | Blue status, expected ship date, delivery window, timeline showing what happens next | "Notify me when it ships" toggle, contact support                                            |

Two extra states are included: **Loading** and **Error**.

## Tech Stack

- [React](https://react.dev/) with [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/) component library
- Mock/static data (no backend)
- Deployed on [Surge](https://surge.sh/)

## Project Structure

```
order-tracking/
├── public/
├── src/
│   ├── components/
│   │   ├── ActionModal.jsx     # Support, report issue, and report missing package modals
│   │   ├── OrderSummary.jsx    # Items, total, expandable order details
│   │   ├── States.jsx          # Loading skeleton and error state
│   │   ├── StatusHero.jsx      # Status badge, ETA, alert, primary actions
│   │   └── Timeline.jsx        # Five-step delivery progress
│   ├── data/
│   │   └── scenarios.js        # Order, steps, tone colours, and scenario mock data
│   ├── App.jsx                 # Screen layout and state handling
│   ├── index.css               # Tailwind + daisyUI imports
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/FahimFaysalNirjhar/Order-Tracking-Task-1

# 2. Move into the project
cd order-tracking

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`). For the best view, use your browser's device mode at 360px to 430px wide.

### How to use the demo

Use the **Demo scenario** buttons at the top of the screen to switch between Delayed, Delivered but not received, Tracking not available, Loading, and Error. Then try:

1. Expanding **View order details**
2. Opening **Contact support**
3. Submitting **Report a delivery issue**
4. Tapping **Notify me when it ships** in the "Tracking not available" state

## Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the development server with hot reload |
| `npm run build`   | Create a production build in `dist/`         |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint                                   |

## Deployment

The app is a static site and is deployed with Surge.

```bash
npm install -g surge
npm run build
surge ./dist YOUR-DOMAIN.surge.sh
```

It also works on Vercel, Netlify, and GitHub Pages. Use the default Vite settings: build command `npm run build`, output directory `dist`.

## Design Decisions

- **Status first.** The hero card answers "what's happening" and "when will it arrive" before anything else.
- **Colour with meaning.** Amber means delay, red means a problem needs action, blue means waiting, and green means completed steps. Colour is always paired with text so it is never the only signal.
- **Plain language.** Messages say what happened and what the user can do about it. Errors explain the problem and how to fix it.
- **One clear primary action.** Each state promotes the most useful next step (contact support, report a missing package, or get notified) and keeps secondary actions quieter.
- **Bottom sheets on mobile.** Support and report flows open as bottom modals, which are easy to reach with a thumb, and they become centred dialogs on larger screens.
- **Skeleton loading.** Placeholders match the shape of the real content, so the layout doesn't jump when data arrives.

## Responsive Design

- Built mobile-first for roughly 360px to 430px widths
- The content column is capped at 430px and centred on larger screens
- The scenario switcher scrolls horizontally on narrow screens instead of wrapping
- Touch-friendly button sizes and spacing

## Accessibility

- Semantic landmarks and headings (`main`, `section`, `h1`/`h2`)
- Ordered list with an `aria-label` for the timeline
- `role="alert"` and `role="status"` for important messages and toasts
- Modals use `aria-modal` and can be closed by clicking the backdrop
- Radio inputs and buttons are keyboard accessible
- Loading state exposes `aria-busy`
- Text contrast follows daisyUI's theme tokens

## Mock Data

All data lives in `src/data/scenarios.js`:

- `ORDER`: order number, items, address, carrier, and tracking number
- `STEPS`: the five timeline steps
- `SCENARIOS`: `delayed`, `missing`, and `pending`, each with a status message, estimates, timestamps, alert text, and actions
- `TONE`: colour classes for each status tone

To try a different order or state, edit this file. No API is called.

## Future Improvements

- Connect to a real tracking API and poll or subscribe for live updates
- Add a map view with the courier's live location
- Push, SMS, or email notifications for status changes
- Proof-of-delivery photo viewer
- Multiple packages per order
- Dark theme toggle
- Localisation and right-to-left support
- Unit and end-to-end tests with Vitest and Playwright

## Author

**Fahim Faysal Nirjhar**
Full-Stack Developer

- GitHub: https://github.com/FahimFaysalNirjhar?tab=repositories
- LinkedIn: https://www.linkedin.com/in/fahim-faysal-a62b91153/
- Email: fahimfaysal1995@gmail.com

---

Built as a frontend assessment task: _Task 1, Order Tracking Screen_.
