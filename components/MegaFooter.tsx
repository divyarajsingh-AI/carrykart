
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
};

export default function MegaFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let gap = 6;
    let radius = 90;

    let pointerX = -999;
    let pointerY = -999;
    let targetX = -999;
    let targetY = -999;

    let last = 0;
    let time = 0;
    let visible = false;
    let idle = true;
    let frameId = 0;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let reduceMotion = motionQuery.matches;

    function build() {
      if (!canvas || !ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = canvas.clientWidth;
      height = canvas.clientHeight;

      if (!width || !height) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offscreen = document.createElement("canvas");
      offscreen.width = Math.round(width);
      offscreen.height = Math.round(height);

      const offscreenCtx = offscreen.getContext("2d");
      if (!offscreenCtx) return;

      offscreenCtx.fillStyle = "#FFFFFF";
      offscreenCtx.textAlign = "center";
      offscreenCtx.textBaseline = "middle";

      const word = "CARRYKART";

      let fontSize = height * 1.05;

      offscreenCtx.font = `800 ${fontSize}px Arial, sans-serif`;

      while (
        offscreenCtx.measureText(word).width > width * 0.97 &&
        fontSize > 12
      ) {
        fontSize -= 4;
        offscreenCtx.font = `800 ${fontSize}px Arial, sans-serif`;
      }

      offscreenCtx.fillText(
        word,
        width / 2,
        height / 2 + fontSize * 0.04
      );

      gap = Math.max(5, Math.round(width / 190));
      radius = Math.max(70, width * 0.085);

      const pixels = offscreenCtx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height
      ).data;

      dots = [];

      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const index =
            ((Math.floor(y) * offscreen.width +
              Math.floor(x)) *
              4) +
            3;

          if (pixels[index] > 128) {
            dots.push({ x, y });
          }
        }
      }

      draw();
    }

    function draw() {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      const base = gap * 0.38;

      ctx.fillStyle = "rgba(241,233,223,0.9)";
      ctx.beginPath();

      const affected: {
        x: number;
        y: number;
        dx: number;
        dy: number;
        strength: number;
      }[] = [];

      for (const dot of dots) {
        const dx = dot.x - pointerX;
        const dy = dot.y - pointerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < radius && !reduceMotion) {
          affected.push({
            x: dot.x,
            y: dot.y,
            dx,
            dy,
            strength: 1 - distance / radius,
          });
        } else {
          ctx.moveTo(dot.x + base, dot.y);
          ctx.arc(dot.x, dot.y, base, 0, Math.PI * 2);
        }
      }

      ctx.fill();

      for (const dot of affected) {
        const strength = dot.strength;
        const angle = strength * strength * 2.4;

        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);

        const nextX =
          pointerX + dot.dx * cosine - dot.dy * sine;

        const nextY =
          pointerY + dot.dx * sine + dot.dy * cosine;

        ctx.fillStyle = `hsl(${265 + strength * 20}, 45%, ${
          70 + strength * 15
        }%)`;

        ctx.beginPath();
        ctx.arc(
          nextX,
          nextY,
          base * (1 + strength * 1.3),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }

    function tick(now: number) {
      if (!visible || reduceMotion) return;

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (idle) {
        time += dt;

        targetX =
          width * (0.5 + 0.42 * Math.sin(time * 0.55));

        targetY =
          height * (0.5 + 0.3 * Math.sin(time * 1.3));
      }

      pointerX += (targetX - pointerX) * 0.12;
      pointerY += (targetY - pointerY) * 0.12;

      draw();

      frameId = window.requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();

      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      idle = false;
    }

    function onPointerLeave() {
      idle = true;
    }

    function onMotionChange(event: MediaQueryListEvent) {
      reduceMotion = event.matches;

      window.cancelAnimationFrame(frameId);

      if (reduceMotion) {
        pointerX = -999;
        pointerY = -999;
        draw();
      } else if (visible) {
        last = performance.now();
        frameId = window.requestAnimationFrame(tick);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0]?.isIntersecting ?? false;

      if (isVisible && !visible) {
        visible = true;

        if (!reduceMotion) {
          last = performance.now();
          frameId = window.requestAnimationFrame(tick);
        }
      } else if (!isVisible) {
        visible = false;
        window.cancelAnimationFrame(frameId);
      }
    });

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    motionQuery.addEventListener("change", onMotionChange);

    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(canvas);

    document.fonts.ready.then(build);

    build();

    return () => {
      window.cancelAnimationFrame(frameId);

      canvas.removeEventListener(
        "pointermove",
        onPointerMove
      );

      canvas.removeEventListener(
        "pointerleave",
        onPointerLeave
      );

      motionQuery.removeEventListener(
        "change",
        onMotionChange
      );

      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-[#07080F] pb-6 pt-16 text-[#F1E9DF]">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:justify-between lg:px-10">
        <div className="grid flex-1 grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              CarryKart
            </h3>

            <p className="text-xs leading-7 text-[#A9ADC9]">
              People. Places.
              <br />
              Possibilities.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Navigation
            </h3>

            <div className="flex flex-col gap-3 text-xs text-[#A9ADC9]">
              <Link href="/">Home</Link>
              <Link href="/#how-it-works">How it works</Link>
              <Link href="/find-traveller">Find traveller</Link>
              <Link href="/browse-requests">Browse requests</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Explore
            </h3>

            <div className="flex flex-col gap-3 text-xs text-[#A9ADC9]">
              <Link href="/request">Request an item</Link>
              <Link href="/travel">I&apos;m travelling</Link>
              <Link href="/matches">Matches</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Account
            </h3>

            <div className="flex flex-col gap-3 text-xs text-[#A9ADC9]">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/chat">Chats</Link>
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </div>
          </div>
        </div>

        <a
          href="#top"
          className="self-start text-xs uppercase tracking-[0.15em] text-[#C9A9DC] transition hover:text-white"
        >
          Back to top ↑
        </a>
      </div>

      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interactive dotted CarryKart wordmark"
        className="mt-16 block h-[clamp(110px,21vw,270px)] w-full touch-pan-y"
      />

      <p className="mt-2 text-center text-xs text-[#A9ADC9]/60">
        © 2026 CarryKart. All rights reserved.
      </p>
    </footer>
  );
}
