"use client";

import createGlobe from "cobe";
import Image from "next/image";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import type { Member } from "@/lib/github/members";

type MemberGlobeProps = {
  members: Member[];
};

type AnchorStyle = CSSProperties & {
  positionAnchor: string;
};

/** Members rendered as markers on the globe. */
const MARKER_LIMIT = 24;
/** Of those, how many also get a floating avatar pin. Kept low to avoid clutter. */
const PIN_LIMIT = 10;

/** Deterministic fallback position for members without a known location. */
function locationFromLogin(login: string): [number, number] {
  let hash = 0;

  for (let index = 0; index < login.length; index++) {
    hash = (hash * 31 + login.charCodeAt(index)) >>> 0;
  }

  const latitude = (hash % 12000) / 100 - 60;
  const longitude = ((hash >>> 8) % 36000) / 100 - 180;

  return [latitude, longitude];
}

export default function MemberGlobe({ members }: MemberGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const markers = useMemo(
    () =>
      members.slice(0, MARKER_LIMIT).map((member, index) => ({
        ...member,
        id: `member-${index}-${member.login.toLowerCase().replace(/[^a-z0-9-]/g, "")}`,
        location: member.location ?? locationFromLogin(member.login),
      })),
    [members],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let size = Math.max(container.clientWidth, 1);

    let phi = 0;
    let targetPhi = 0;
    let theta = 0.2;
    let targetTheta = 0.2;
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    let animationFrame = 0;
    let running = false;
    let onScreen = true;
    let firstFrame = true;

    const globe = createGlobe(canvas, {
      devicePixelRatio: pixelRatio,
      width: size * pixelRatio,
      height: size * pixelRatio,
      phi,
      theta,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      mapBaseBrightness: 0.04,
      baseColor: [0.12, 0.14, 0.18],
      markerColor: [0.4, 0.91, 0.98],
      glowColor: [0.14, 0.18, 0.24],
      markerElevation: 0.03,
      markers: markers.map((marker) => ({
        id: marker.id,
        location: marker.location,
        size: 0.04,
      })),
    });

    const frame = () => {
      if (pointerX === null && !reducedMotion) targetPhi += 0.003;

      phi += (targetPhi - phi) * 0.08;
      theta += (targetTheta - theta) * 0.08;
      globe.update({ phi, theta });

      if (firstFrame) {
        firstFrame = false;
        setReady(true);
      }

      animationFrame = requestAnimationFrame(frame);
    };

    // Only animate while the globe is on screen and the tab is visible.
    const start = () => {
      if (running || !onScreen || document.hidden) return;
      running = true;
      animationFrame = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(animationFrame);
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (pointerX === null || pointerY === null) return;

      targetPhi += (event.clientX - pointerX) / 180;
      targetTheta = Math.max(
        -0.7,
        Math.min(0.7, targetTheta + (event.clientY - pointerY) / 300),
      );

      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      pointerX = null;
      pointerY = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      canvas.style.cursor = "grab";
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(([entry]) => {
      const nextSize = Math.max(Math.round(entry.contentRect.width), 1);
      if (nextSize === size) return;

      size = nextSize;
      globe.update({
        width: size * pixelRatio,
        height: size * pixelRatio,
      });
    });

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });

    canvas.style.cursor = "grab";

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    document.addEventListener("visibilitychange", handleVisibility);

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      document.removeEventListener("visibilitychange", handleVisibility);

      globe.destroy();
    };
  }, [markers]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full"
      role="img"
      aria-label={`Globe showing ${members.length} Hall of Codes GitHub members`}
    >
      <canvas
        ref={canvasRef}
        className={`h-full w-full touch-pan-y transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{ contain: "layout paint size" }}
      />

      {/* Avatar pins rely on CSS anchor positioning; browsers without it
          only get the globe markers instead of a pile of stacked pins. */}
      {markers.slice(0, PIN_LIMIT).map((marker) => (
        <a
          key={marker.id}
          href={`https://github.com/${marker.login}`}
          target="_blank"
          rel="noreferrer"
          title={`@${marker.login}`}
          aria-label={`@${marker.login} on GitHub`}
          className="group absolute z-10 hidden transition-[opacity,scale] duration-300 supports-[position-anchor:--a]:block"
          style={
            {
              positionAnchor: `--cobe-${marker.id}`,
              bottom: "anchor(center)",
              left: "anchor(center)",
              translate: "-50% -8px",
              opacity: `var(--cobe-visible-${marker.id}, 0)`,
              scale: `calc(.6 + var(--cobe-visible-${marker.id}, 0) * .4)`,
              pointerEvents: ready ? undefined : "none",
            } as AnchorStyle
          }
        >
          <Image
            src={marker.avatar}
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full border-2 border-[#090d16] object-cover outline outline-1 outline-white/25 grayscale transition duration-300 group-hover:outline-cyan-300 group-hover:grayscale-0"
          />
          <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border border-white/15 bg-[#080d16] px-2 py-1 font-mono text-[11px] text-gray-200 opacity-0 transition group-hover:opacity-100">
            @{marker.login}
          </span>
        </a>
      ))}
    </div>
  );
}
