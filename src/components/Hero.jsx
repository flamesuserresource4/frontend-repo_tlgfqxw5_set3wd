import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[72vh] overflow-hidden bg-[#0b0b12]">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Grainy gradient overlays (do not block interaction) */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[40rem] w-[40rem] rounded-full opacity-40 blur-3xl"
             style={{
               background: 'radial-gradient(closest-side, rgba(124,58,237,0.6), rgba(37,99,235,0.18) 60%, transparent 70%)'
             }}
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Headline (non-interactive to keep Spline draggable) */}
      <div className="pointer-events-none relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-sky-300 to-emerald-300 drop-shadow-[0_2px_12px_rgba(59,130,246,0.25)]">
            Find your perfect stay, visually
          </h1>
          <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80">
            Explore housing options near your college. Interactive 3D visuals, crisp filters, and instant results.
          </p>
        </div>
      </div>
    </section>
  );
}
