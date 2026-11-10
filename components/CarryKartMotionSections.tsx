
"use client";

import { useEffect, useRef } from "react";

export default function CarryKartMotionSections() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timeline = root.querySelectorAll("#ck-timeline li");
    const checks = root.querySelectorAll("#ck-checks li");
    const track = root.querySelector("#ck-track");
    const status = root.querySelector("#ck-status");
    const eta = root.querySelector("#ck-eta");

    const progress = [12, 30, 52, 75, 100];

    function updateDelivery(step: number) {
      timeline.forEach((item, index) => {
        item.classList.toggle("done", index < step);
      });

      track?.setAttribute("style", `--progress:${progress[step - 1]}%`);

      if (status) {
        status.textContent = step < 5 ? "In transit" : "Delivered";
      }

      if (eta) {
        eta.textContent =
          step < 5 ? "Arrives 6:40 PM" : "Delivered 6:40 PM";
      }
    }

    const checkLabels = [
      "Verified",
      "Verified",
      "Photo added",
      "Confirmed",
    ];

    function updateChecks(step: number) {
      checks.forEach((item, index) => {
        item.classList.toggle("ok", index < step);

        const label = item.querySelector(".ck-status-label");
        if (label) {
          label.textContent =
            index < step ? checkLabels[index] : "Pending";
        }
      });
    }

    const timers: ReturnType<typeof setInterval>[] = [];

    if (reduceMotion) {
      updateDelivery(5);
      updateChecks(4);
    } else {
      let deliveryStep = 1;
      let checkStep = 0;

      updateDelivery(1);
      updateChecks(0);

      timers.push(
        setInterval(() => {
          deliveryStep = deliveryStep >= 6 ? 1 : deliveryStep + 1;
          updateDelivery(Math.min(deliveryStep, 5));
        }, 1700)
      );

      timers.push(
        setInterval(() => {
          checkStep = checkStep >= 5 ? 0 : checkStep + 1;
          updateChecks(Math.min(checkStep, 4));
        }, 1300)
      );
    }

    // Earnings chart
    const chart = root.querySelector("#ck-earnings-line");
    const area = root.querySelector("#ck-earnings-area");

    if (chart && area) {
      let total = 0;
      let path = "";
      let x = 0;
      let y = 0;

      const increments = Array.from(
        { length: 30 },
        (_, index) => 140 + ((index * 37) % 7) * 70
      );

      const sum = increments.reduce((a, b) => a + b, 0);

      increments.forEach((value, index) => {
        total += (value / sum) * 8400;
        x = 40 + index * (340 / 29);
        y = 140 - (total / 10000) * 120;

        path += `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
      });

      chart.setAttribute("d", path);
      area.setAttribute(
        "d",
        `${path}L${x.toFixed(1)} 140L40 140Z`
      );

      const dot = root.querySelector("#ck-chart-dot");
      const tooltip = root.querySelector("#ck-chart-tooltip");
      const tooltipText = root.querySelector("#ck-chart-text");

      dot?.setAttribute("cx", String(x));
      dot?.setAttribute("cy", String(y));
      tooltip?.setAttribute("x", String(x - 70));
      tooltip?.setAttribute("y", String(y - 34));
      tooltipText?.setAttribute("x", String(x - 37));
      tooltipText?.setAttribute("y", String(y - 18));
    }

    // Abstract earnings insight chart
    const abstractChart = root.querySelector("#ck-abstract-line");

    if (abstractChart) {
      let path = "";

      for (let x = 20; x <= 370; x += 6) {
        const y = 165 - (x - 20) * 0.33 + Math.sin(x / 9) * 9;
        path += `${x === 20 ? "M" : "L"}${x} ${y.toFixed(1)} `;
      }

      abstractChart.setAttribute("d", path);
    }

    // Verification animation
    const verification = root.querySelector("#ck-verification");

    if (verification && !reduceMotion) {
      const lines = verification.querySelectorAll(".ck-verify-line");
      const blocks = verification.querySelectorAll(".ck-verify-block");
      const labels = verification.querySelectorAll(".ck-verify-label");

      let current = 0;

      function activate(index: number) {
        [lines, blocks, labels].forEach((group) => {
          group.forEach((element, i) => {
            element.classList.toggle("on", i === index);
          });
        });
      }

      activate(0);

      timers.push(
        setInterval(() => {
          current = (current + 1) % 4;
          activate(current);
        }, 1500)
      );
    }

    return () => {
      timers.forEach(clearInterval);
    };
  }, []);

  return (
    <div ref={rootRef} className="ck-motion">

      {/* SECTION 1 — SEE IT IN MOTION */}

      <section id="ck-live" className="ck-section">
        <div className="ck-wrap">
          <div className="ck-feature">

            <p className="ck-eyebrow">THE CARRYKART EXPERIENCE</p>

            <h2>See it in motion.</h2>

            <p className="ck-subtitle">
              A look inside the CarryKart experience:
              tracking, trust checks and earnings.
              All screens use sample data for illustration.
            </p>

            <div className="ck-grid">

              {/* DELIVERY TRACKING */}

              <div className="ck-card ck-wide">

                <div className="ck-phone">

                  <div className="ck-top">
                    <span>Delivery #CK-2041</span>
                    <span className="ck-pill" id="ck-status">
                      In transit
                    </span>
                  </div>

                  <div className="ck-route">
                    <span>Jaipur</span>
                    <span>Delhi</span>
                  </div>

                  <div className="ck-track" id="ck-track">
                    <i />
                    <b />
                  </div>

                  <div className="ck-eta">
                    <span>Left 11:05 AM</span>
                    <span id="ck-eta">Arrives 6:40 PM</span>
                  </div>

                  <div className="ck-info">
                    <div className="ck-avatar">AS</div>
                    <div>
                      <b>Verified traveller</b>
                      <small>Travelling by bus</small>
                    </div>
                  </div>

                  <div className="ck-info">
                    <span className="ck-lock">◇</span>
                    <div>
                      <b>₹1,740 held in escrow</b>
                      <small>Illustrative payment flow</small>
                    </div>
                  </div>

                  <div className="ck-otp">
                    <span>4</span>
                    <span>8</span>
                    <span>2</span>
                    <span>7</span>
                  </div>

                </div>

                <div className="ck-tracking-content">
                  <span className="ck-tag">SAMPLE DATA</span>

                  <h3>
                    Follow every parcel,
                    from pickup to doorstep.
                  </h3>

                  <p>
                    Every handover can be inspected,
                    tracked and confirmed with an OTP.
                  </p>

                  <ol className="ck-timeline" id="ck-timeline">
                    <li>
                      <i />
                      <div>
                        <b>Request posted</b>
                        <small>9:12 AM</small>
                      </div>
                    </li>

                    <li>
                      <i />
                      <div>
                        <b>Traveller matched</b>
                        <small>9:30 AM</small>
                      </div>
                    </li>

                    <li>
                      <i />
                      <div>
                        <b>Item inspected and picked up</b>
                        <small>11:05 AM</small>
                      </div>
                    </li>

                    <li>
                      <i />
                      <div>
                        <b>In transit</b>
                        <small>Jaipur to Delhi</small>
                      </div>
                    </li>

                    <li>
                      <i />
                      <div>
                        <b>Delivered, OTP confirmed</b>
                        <small>6:40 PM</small>
                      </div>
                    </li>
                  </ol>
                </div>

              </div>

              {/* TRUST CHECKS */}

              <div className="ck-card">
                <span className="ck-tag">SAMPLE DATA</span>

                <h3 className="ck-card-title">
                  Trust checks on every delivery
                </h3>

                <p>
                  An illustrative verification journey.
                </p>

                <ul className="ck-checks" id="ck-checks">
                  {[
                    "Government ID",
                    "Phone number",
                    "Item inspected",
                    "Handover OTP",
                  ].map((item) => (
                    <li key={item}>
                      <span className="ck-check-icon" />
                      <span>{item}</span>
                      <span className="ck-status-label">
                        Pending
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* EARNINGS */}

              <div className="ck-card">

                <div className="ck-heading-row">
                  <div>
                    <small>This month</small>
                    <div className="ck-amount">₹8,400</div>
                  </div>
                  <span className="ck-tag">SAMPLE DATA</span>
                </div>

                <div className="ck-stats">
                  <span><b>42</b>deliveries</span>
                  <span><b>₹200</b>avg. reward</span>
                  <span><b>18</b>trips</span>
                </div>

                <svg
                  className="ck-chart"
                  viewBox="0 0 400 175"
                  role="img"
                  aria-label="Illustrative cumulative earnings chart"
                >
                  <defs>
                    <linearGradient id="ck-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#B994D1" stopOpacity=".35" />
                      <stop offset="1" stopColor="#B994D1" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <g className="ck-chart-grid">
                    <path d="M40 20H390M40 50H390M40 80H390M40 110H390M40 140H390" />
                  </g>

                  <text className="ck-axis" x="4" y="143">₹0</text>
                  <text className="ck-axis" x="4" y="113">₹2.5k</text>
                  <text className="ck-axis" x="4" y="83">₹5k</text>
                  <text className="ck-axis" x="4" y="53">₹7.5k</text>
                  <text className="ck-axis" x="4" y="23">₹10k</text>

                  <text className="ck-axis" x="40" y="162">Day 1</text>
                  <text className="ck-axis" x="205" y="162">Day 15</text>
                  <text className="ck-axis" x="350" y="162">Day 30</text>

                  <path
                    id="ck-earnings-area"
                    className="ck-chart-area"
                    fill="url(#ck-gradient)"
                  />

                  <path
                    id="ck-earnings-line"
                    className="ck-chart-line"
                    fill="none"
                  />

                  <circle id="ck-chart-dot" r="5" fill="#F1E9DF" />
                  <rect
                    id="ck-chart-tooltip"
                    width="66"
                    height="24"
                    rx="8"
                    fill="#F1E9DF"
                  />
                  <text
                    id="ck-chart-text"
                    className="ck-chart-tooltip-text"
                    textAnchor="middle"
                  >
                    ₹8,400
                  </text>
                </svg>

                <p className="ck-disclaimer">
                  Illustrative figures only. Not actual earnings or a guarantee.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — HOW IT ALL CONNECTS */}

      <section id="ck-flow" className="ck-section">
        <div className="ck-wrap">

          <div className="ck-feature ck-abstract">

            <p className="ck-eyebrow">ONE CONNECTED ECOSYSTEM</p>

            <h2>How it all connects.</h2>

            <p className="ck-subtitle">
              Matching, verification and delivery
              working together in one platform.
              Concept illustration only.
            </p>

            <div className="ck-grid">

              {/* MATCHING FLOW */}

              <div className="ck-card ck-flow-wide">

                <svg
                  viewBox="0 0 760 210"
                  role="img"
                  aria-label="Illustration of requests flowing through CarryKart"
                >
                  <defs>
                    <path id="ck-fp1" d="M36 40 C120 40 150 105 270 105" />
                    <path id="ck-fp2" d="M70 105 C140 105 200 105 270 105" />
                    <path id="ck-fp3" d="M36 170 C120 170 150 105 270 105" />
                    <path id="ck-fp4" d="M120 22 C190 22 200 105 270 105" />
                    <path id="ck-fp5" d="M430 105 H570" />
                  </defs>

                  {["ck-fp1", "ck-fp2", "ck-fp3", "ck-fp4", "ck-fp5"].map((id) => (
                    <use key={id} href={`#${id}`} className="ck-flow-line" />
                  ))}

                  <g className="ck-flow-particles">
                    {["ck-fp1", "ck-fp2", "ck-fp3", "ck-fp4", "ck-fp5"].map((id, i) => (
                      <circle key={id} r="3.5">
                        <animateMotion
                          dur={i === 4 ? "2s" : "3s"}
                          begin={`${i * 0.7}s`}
                          repeatCount="indefinite"
                        >
                          <mpath href={`#${id}`} />
                        </animateMotion>
                      </circle>
                    ))}
                  </g>

                  {[36, 70, 36, 120].map((x, i) => (
                    <g key={i}>
                      <circle
                        className="ck-flow-ring"
                        cx={x}
                        cy={[40, 105, 170, 22][i]}
                        r="11"
                      />
                      <circle
                        className="ck-flow-node"
                        cx={x}
                        cy={[40, 105, 170, 22][i]}
                        r="11"
                      />
                    </g>
                  ))}

                  <rect
                    className="ck-flow-node"
                    x="270"
                    y="84"
                    width="160"
                    height="42"
                    rx="12"
                  />

                  <circle className="ck-flow-dot" cx="294" cy="105" r="6" />

                  <text className="ck-flow-brand" x="312" y="109">
                    CARRYKART
                  </text>

                  <rect className="ck-flow-node" x="570" y="56" width="150" height="130" rx="10" opacity=".3" />
                  <rect className="ck-flow-node" x="582" y="44" width="150" height="130" rx="10" opacity=".6" />
                  <rect className="ck-flow-node" x="594" y="32" width="150" height="130" rx="10" />

                  <text className="ck-flow-muted" x="608" y="52">
                    DELIVERY PROOF
                  </text>

                  <rect className="ck-flow-bar" x="608" y="60" width="70" height="5" rx="2.5" />
                  <rect className="ck-flow-bar" x="608" y="72" width="40" height="5" rx="2.5" />

                  {[26, 38, 32, 50, 64].map((height, i) => (
                    <rect
                      key={i}
                      className="ck-flow-animated-bar"
                      x={608 + i * 22}
                      y={150 - height}
                      width="12"
                      height={height}
                      rx="2"
                      style={{ animationDelay: `${-i * 0.4}s` }}
                    />
                  ))}
                </svg>

                <div className="ck-caption-grid">
                  <div>
                    <h3>Smart matching</h3>
                    <p>
                      Requests connect with travellers heading in the same direction.
                    </p>
                  </div>

                  <div>
                    <h3>Delivery proof</h3>
                    <p>
                      Photo and OTP confirmation can support the handover process.
                    </p>
                  </div>
                </div>

              </div>

              {/* VERIFICATION HUB */}

              <div className="ck-card">

                <svg
                  id="ck-verification"
                  viewBox="0 0 300 200"
                  role="img"
                  aria-label="Illustrative verification steps around CarryKart"
                >
                  <path className="ck-verify-line" d="M128 100 H100 V42 H66" />
                  <path className="ck-verify-line" d="M172 100 H200 V42 H234" />
                  <path className="ck-verify-line" d="M172 100 H200 V158 H234" />
                  <path className="ck-verify-line" d="M128 100 H100 V158 H66" />

                  <circle className="ck-flow-ring" cx="150" cy="100" r="22" />
                  <circle className="ck-flow-node" cx="150" cy="100" r="22" />

                  <text className="ck-flow-brand" x="150" y="106" textAnchor="middle">
                    C
                  </text>

                  {[
                    { x: 30, y: 24, label: "ID" },
                    { x: 234, y: 24, label: "IMG" },
                    { x: 234, y: 140, label: "OTP" },
                    { x: 30, y: 140, label: "₹" },
                  ].map((item, i) => (
                    <g key={item.label}>
                      <rect
                        className="ck-verify-block"
                        x={item.x}
                        y={item.y}
                        width="36"
                        height="36"
                        rx="9"
                      />
                      <text
                        className="ck-flow-brand"
                        x={item.x + 18}
                        y={item.y + 22}
                        textAnchor="middle"
                      >
                        {item.label}
                      </text>
                      <text
                        className="ck-verify-label"
                        x={item.x + 18}
                        y={item.y + 52}
                        textAnchor="middle"
                      >
                        {["ID check", "Photo proof", "OTP", "Escrow"][i]}
                      </text>
                    </g>
                  ))}
                </svg>

                <h3>Verification hub</h3>

                <p>
                  ID checks, photo proof, OTP and payment
                  protection are important parts of the proposed platform.
                </p>

              </div>

              {/* EARNINGS INSIGHTS */}

              <div className="ck-card">

                <svg
                  viewBox="0 0 400 200"
                  className="ck-chart"
                  role="img"
                  aria-label="Illustrative rising earnings graph"
                >
                  <g className="ck-chart-grid">
                    <path d="M20 40H380M20 80H380M20 120H380M20 160H380" />
                  </g>

                  <path
                    id="ck-abstract-line"
                    className="ck-abstract-chart-line"
                    fill="none"
                  />

                  <circle
                    className="ck-abstract-chart-dot"
                    cx="370"
                    cy="0"
                    r="5"
                  />
                </svg>

                <h3>Earnings insights</h3>

                <p>
                  Travellers can explore how eligible trips
                  might create additional earning opportunities.
                </p>

                <span className="ck-disclaimer">
                  Illustrative only, not a guarantee.
                </span>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT STYLES */}

      <style jsx global>{`
        .ck-motion {
          --ck-lavender: #C9A9DC;
          --ck-violet: #B994D1;
          --ck-cream: #F1E9DF;
          --ck-muted: #A99CB8;
          color: var(--ck-cream);
          font-family: inherit;
        }

        .ck-motion * {
          box-sizing: border-box;
        }

        .ck-section {
          padding: 90px 0 0;
        }

        .ck-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .ck-feature {
          position: relative;
          overflow: hidden;
          padding: clamp(22px, 4vw, 52px);
          border: 1px solid rgba(201,169,220,.15);
          border-radius: 32px;
          background: linear-gradient(145deg,#171025,#0B0714 75%);
        }

        .ck-feature::before {
          content: "";
          position: absolute;
          width: 600px;
          height: 600px;
          left: -160px;
          top: -280px;
          background: radial-gradient(circle,rgba(185,148,209,.16),transparent 68%);
          pointer-events: none;
        }

        .ck-feature > * {
          position: relative;
        }

        .ck-eyebrow {
          color: var(--ck-lavender);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .28em;
          margin-bottom: 15px;
        }

        .ck-feature h2 {
          color: var(--ck-cream);
          font-size: clamp(2rem,4.8vw,3.6rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -.055em;
          margin: 0 0 14px;
        }

        .ck-subtitle {
          color: rgba(241,233,223,.55);
          max-width: 550px;
          margin-bottom: 34px;
          font-size: 14px;
          line-height: 1.8;
        }

        .ck-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ck-card {
          min-width: 0;
          padding: 22px;
          border: 1px solid rgba(201,169,220,.12);
          border-radius: 23px;
          background: linear-gradient(180deg,#1A1425,#100B19);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
          transition: transform .3s ease,border-color .3s ease;
        }

        .ck-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,169,220,.32);
        }

        .ck-wide {
          grid-column: 1/-1;
          display: grid;
          grid-template-columns: minmax(260px,330px) 1fr;
          gap: 36px;
          align-items: center;
        }

        .ck-card h3 {
          font-size: 18px;
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: -.035em;
          color: white;
          margin: 12px 0 7px;
        }

        .ck-card p {
          color: rgba(241,233,223,.5);
          font-size: 13px;
          line-height: 1.8;
        }

        .ck-tag {
          display: inline-block;
          color: var(--ck-lavender);
          border: 1px solid rgba(201,169,220,.24);
          border-radius: 999px;
          padding: 4px 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .1em;
        }

        .ck-phone {
          padding: 19px;
          background: #0B0714;
          border: 1px solid rgba(201,169,220,.2);
          border-radius: 28px;
          box-shadow: 0 30px 70px -35px rgba(185,148,209,.4);
        }

        .ck-top,.ck-route,.ck-eta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ck-top {
          color: var(--ck-muted);
          font-size: 11px;
        }

        .ck-pill {
          color: #A9E6C8;
          background: rgba(79,209,161,.12);
          padding: 5px 10px;
          border-radius: 99px;
        }

        .ck-route {
          color: white;
          font-weight: 800;
          font-size: 21px;
          margin: 18px 0 14px;
        }

        .ck-track {
          --progress: 12%;
          height: 5px;
          position: relative;
          border-radius: 5px;
          background: #30253B;
        }

        .ck-track i {
          display: block;
          width: var(--progress);
          height: 100%;
          border-radius: 5px;
          background: linear-gradient(90deg,#9470B4,#D6BCE8);
          transition: width 1s;
        }

        .ck-track b {
          position: absolute;
          left: var(--progress);
          top: 50%;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background: var(--ck-cream);
          box-shadow: 0 0 0 5px rgba(185,148,209,.2);
          transform: translate(-50%,-50%);
          transition: left 1s;
        }

        .ck-eta {
          margin-top: 13px;
          font-size: 10px;
          color: var(--ck-muted);
        }

        .ck-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 11px;
          padding: 11px;
          border: 1px solid #30253B;
          border-radius: 12px;
          color: white;
          font-size: 12px;
          background: #171025;
        }

        .ck-avatar {
          width: 34px;
          height: 34px;
          flex: none;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(135deg,#9470B4,#C9A9DC);
          color: #160D26;
          font-weight: 800;
        }

        .ck-info small {
          display: block;
          margin-top: 3px;
          color: var(--ck-muted);
          font-size: 10px;
        }

        .ck-lock {
          font-size: 24px;
          color: var(--ck-lavender);
        }

        .ck-otp {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .ck-otp span {
          flex: 1;
          text-align: center;
          padding: 9px 0;
          border: 1px solid #30253B;
          border-radius: 9px;
          background: #171025;
          color: white;
          font-weight: 800;
        }

        .ck-tracking-content h3 {
          font-size: clamp(22px,3vw,31px);
          line-height: 1.15;
          margin-top: 15px;
        }

        .ck-timeline {
          list-style: none;
          padding: 0;
          margin: 22px 0 0;
        }

        .ck-timeline li {
          display: flex;
          gap: 13px;
          position: relative;
          padding-bottom: 19px;
          color: #81738E;
          font-size: 13px;
          transition: color .4s;
        }

        .ck-timeline li::before {
          content: "";
          position: absolute;
          left: 9px;
          top: 20px;
          bottom: 0;
          width: 2px;
          background: #30253B;
        }

        .ck-timeline li:last-child::before {
          display: none;
        }

        .ck-timeline li > i {
          flex: none;
          width: 20px;
          height: 20px;
          border: 2px solid #493953;
          border-radius: 50%;
        }

        .ck-timeline li.done {
          color: white;
        }

        .ck-timeline li.done > i {
          background: var(--ck-lavender);
          border-color: var(--ck-lavender);
        }

        .ck-timeline li.done > i::after {
          content: "";
          display: block;
          width: 5px;
          height: 9px;
          border: solid #160D26;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          margin: 2px 0 0 5px;
        }

        .ck-timeline small {
          display: block;
          color: #81738E;
          font-size: 11px;
          margin-top: 3px;
        }

        .ck-card-title {
          margin-top: 15px !important;
        }

        .ck-checks {
          list-style: none;
          padding: 0;
          margin: 19px 0 0;
          display: grid;
          gap: 10px;
        }

        .ck-checks li {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border: 1px solid #30253B;
          border-radius: 12px;
          background: #171025;
          color: #A99CB8;
          font-size: 12px;
          transition: .4s;
        }

        .ck-check-icon {
          width: 23px;
          height: 23px;
          flex: none;
          border: 2px solid #493953;
          border-radius: 50%;
        }

        .ck-status-label {
          margin-left: auto;
          font-size: 10px;
        }

        .ck-checks li.ok {
          color: white;
          border-color: rgba(79,209,161,.4);
        }

        .ck-checks li.ok .ck-check-icon {
          background: #4FD1A1;
          border-color: #4FD1A1;
        }

        .ck-checks li.ok .ck-check-icon::after {
          content: "";
          display: block;
          width: 5px;
          height: 9px;
          border: solid #0B0714;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
          margin: 3px 0 0 6px;
        }

        .ck-checks li.ok .ck-status-label {
          color: #4FD1A1;
        }

        .ck-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .ck-heading-row small {
          color: var(--ck-muted);
          font-size: 12px;
        }

        .ck-amount {
          font-size: 34px;
          font-weight: 800;
          letter-spacing: -.06em;
          margin-top: 5px;
          color: white;
        }

        .ck-stats {
          display: flex;
          gap: 8px;
          margin-top: 15px;
        }

        .ck-stats span {
          flex: 1;
          min-width: 0;
          padding: 9px 7px;
          border: 1px solid #30253B;
          border-radius: 10px;
          background: #171025;
          color: var(--ck-muted);
          font-size: 10px;
        }

        .ck-stats b {
          display: block;
          color: white;
          font-size: 16px;
        }

        .ck-chart {
          width: 100%;
          height: auto;
          display: block;
          margin-top: 15px;
          overflow: visible;
        }

        .ck-chart-grid {
          stroke: #30253B;
          fill: none;
        }

        .ck-axis {
          fill: #9B8DA9;
          font-size: 10px;
        }

        .ck-chart-line {
          stroke: var(--ck-lavender);
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: ck-draw 6s ease-in-out infinite;
        }

        .ck-chart-area {
          opacity: 0;
          animation: ck-pop 6s ease-in-out infinite;
        }

        .ck-chart-tooltip-text {
          fill: #211629;
          font-size: 11px;
          font-weight: 700;
        }

        .ck-disclaimer {
          display: block;
          color: #8D809B;
          font-size: 10px;
          line-height: 1.6;
          margin-top: 12px;
        }

        .ck-flow-wide {
          grid-column: 1/-1;
        }

        .ck-flow-wide svg,
        #ck-verification {
          width: 100%;
          height: auto;
          display: block;
        }

        .ck-caption-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .ck-flow-line {
          stroke: #554467;
          fill: none;
          stroke-width: 1.5;
          stroke-dasharray: 2 6;
          stroke-linecap: round;
          animation: ck-march 1.2s linear infinite;
        }

        .ck-flow-particles,
        .ck-flow-dot {
          fill: var(--ck-lavender);
        }

        .ck-flow-ring {
          fill: none;
          stroke: var(--ck-lavender);
          stroke-width: 1.5;
          animation: ck-ring 2.4s ease-out infinite;
        }

        .ck-flow-node {
          fill: #1A1425;
          stroke: #493953;
          stroke-width: 1.5;
        }

        .ck-flow-brand {
          fill: var(--ck-cream);
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
        }

        .ck-flow-muted {
          fill: #A99CB8;
          font-size: 9px;
        }

        .ck-flow-bar {
          fill: #493953;
        }

        .ck-flow-animated-bar {
          fill: var(--ck-lavender);
          transform-box: fill-box;
          transform-origin: bottom;
          animation: ck-bars 2.4s ease-in-out infinite alternate;
        }

        .ck-verify-line {
          fill: none;
          stroke: #554467;
          stroke-width: 1.5;
          stroke-dasharray: 2 6;
          transition: .3s;
        }

        .ck-verify-block {
          fill: #1A1425;
          stroke: #493953;
          stroke-width: 1.5;
          transition: .3s;
        }

        .ck-verify-line.on,
        .ck-verify-block.on {
          stroke: var(--ck-lavender);
          fill: #30213C;
        }

        .ck-verify-label {
          fill: var(--ck-cream);
          font-size: 9px;
          opacity: 0;
          transition: opacity .3s;
        }

        .ck-verify-label.on {
          opacity: 1;
        }

        .ck-abstract-chart-line {
          stroke: var(--ck-lavender);
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: ck-draw 7s ease-in-out infinite;
        }

        .ck-abstract-chart-dot {
          fill: var(--ck-cream);
        }

        @keyframes ck-draw {
          0% { stroke-dashoffset: 1; }
          50%,100% { stroke-dashoffset: 0; }
        }

        @keyframes ck-pop {
          0%,42% { opacity: 0; }
          55%,100% { opacity: 1; }
        }

        @keyframes ck-march {
          to { stroke-dashoffset: -16; }
        }

        @keyframes ck-ring {
          from { transform: scale(1); opacity: .7; }
          to { transform: scale(2.2); opacity: 0; }
        }

        @keyframes ck-bars {
          from { transform: scaleY(.5); }
          to { transform: scaleY(1); }
        }

        @media(max-width:860px) {
          .ck-grid {
            grid-template-columns: 1fr;
          }

          .ck-wide {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width:520px) {
          .ck-section {
            padding-top: 55px;
          }

          .ck-wrap {
            padding: 0 14px;
          }

          .ck-feature {
            padding: 19px 14px;
            border-radius: 23px;
          }

          .ck-card {
            padding: 16px;
          }

          .ck-caption-grid {
            grid-template-columns: 1fr;
          }

          .ck-flow-wide svg {
            min-height: 120px;
          }

          .ck-stats {
            gap: 5px;
          }

          .ck-stats span {
            font-size: 9px;
          }
        }

        @media(prefers-reduced-motion:reduce) {
          .ck-flow-line,
          .ck-flow-ring,
          .ck-flow-animated-bar,
          .ck-chart-line,
          .ck-chart-area,
          .ck-abstract-chart-line {
            animation: none !important;
          }

          .ck-chart-line,
          .ck-abstract-chart-line {
            stroke-dashoffset: 0;
          }

          .ck-chart-area {
            opacity: 1;
          }

          .ck-flow-ring {
            display: none;
          }

          .ck-track i,
          .ck-track b {
            transition: none;
          }
        }
      `}</style>

    </div>
  );
}
