"use client";

import * as React from "react";

export function Steps() {
  const steps = [
    {
      num: "01",
      title: "Tell us what you need",
      desc: "Share your budget, area and BHK. We reply on WhatsApp with floor plans and the current price sheet.",
    },
    {
      num: "02",
      title: "Visit with a free cab",
      desc: "We pick a slot that suits you, send a cab to your door and walk you through the project and the sample flat.",
    },
    {
      num: "03",
      title: "Book with clear paperwork",
      desc: "We help you compare payment plans, check RERA details and connect you with lenders for EMI estimates.",
    },
  ];

  return (
    <section className="gh-steps-band" aria-label="How the process works">
      <div className="gh-wrap">
        <div className="gh-head gh-head-dark">
          <div>
            <span className="gh-pill-eyebrow gh-pill-eyebrow-dark">
              <i aria-hidden="true" />
              How it works
            </span>
            <h2>From first message to keys, in three steps</h2>
          </div>
          <p>
            A calm, transparent buying experience designed around direct developer pricing and
            zero buyer brokerage.
          </p>
        </div>

        <div className="gh-steps">
          {steps.map((s) => (
            <div key={s.num} className="gh-step-dark">
              <div className="gh-step-dark-top">
                <span className="gh-step-dark-num" aria-hidden="true">
                  {s.num}
                </span>
                <span className="gh-step-dark-line" aria-hidden="true" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
