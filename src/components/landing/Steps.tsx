"use client";

import * as React from "react";

export function Steps() {
  const steps = [
    {
      num: "1",
      title: "Tell us what you need",
      desc: "Share your budget, area and BHK. We reply on WhatsApp with floor plans and the current price sheet.",
    },
    {
      num: "2",
      title: "Visit with a free cab",
      desc: "We pick a slot that suits you, send a cab to your door and walk you through the project and the sample flat.",
    },
    {
      num: "3",
      title: "Book with clear paperwork",
      desc: "We help you compare payment plans, check RERA details and connect you with lenders for EMI estimates.",
    },
  ];

  return (
    <section className="gh-block" aria-label="How the process works">
      <div className="gh-head">
        <div>
          <span className="gh-eyebrow">How it works</span>
          <h2>From first message to keys, in three steps</h2>
        </div>
      </div>

      <div className="gh-steps">
        {steps.map((s) => (
          <div key={s.num} className="gh-step">
            <div className="gh-step-num" aria-hidden="true">
              {s.num}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
