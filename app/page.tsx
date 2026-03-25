'use client';

import HorizontalScroller from './components/HorizontalScroller';

export default function Home() {
  return (
    <>
      <HorizontalScroller>
        {/* HERO SECTION */}
        <section className="min-w-screen h-full flex-shrink-0 snap-start relative flex items-center justify-center p-12 overflow-hidden border-r-0">
          <div className="absolute inset-0 z-0">
            {/* HEROWALLPAPER REMOVED AS REQUESTED */}
            <div className="absolute top-10 left-10 text-primary-fixed opacity-20 transform -rotate-12 scale-150">
              <span className="material-symbols-outlined text-9xl">texture</span>
            </div>
            <div className="absolute bottom-20 right-20 text-primary-fixed opacity-10 transform rotate-45 scale-[3]">
              <span className="material-symbols-outlined text-9xl">grid_view</span>
            </div>
          </div>
          <div className="relative z-10 flex flex-col items-start max-w-7xl w-full">
            <div className="font-headline font-black text-[12vw] leading-none tracking-tighter uppercase glitch-text break-all">
              WALLPAPERS<br />
              <span className="text-primary-fixed">.RYYAN</span><br />
              SAFAR
            </div>
            <div className="mt-8 bg-primary-fixed text-surface p-4 -rotate-2 font-headline font-extrabold text-2xl uppercase tracking-widest">
              VARIANT C: ACID GREEN & OBSIDIAN
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-surface rotate-12 sticker-shadow">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>mood</span>
              </div>
              <div className="font-stamp text-2xl text-primary-fixed opacity-60 border-l border-outline-variant pl-6">
                COLLECTION_003<br />
                UNHINGED_GALLERY
              </div>
            </div>
          </div>
          <div className="absolute bottom-12 right-12 flex items-center gap-4 text-primary-fixed">
            <span className="font-headline text-xs tracking-[0.5em] uppercase">Scroll to enter the void</span>
            <span className="material-symbols-outlined animate-bounce">arrow_forward</span>
          </div>
        </section>

        {/* GALLERY TRACK - MOBILE SLABS */}
        <section className="min-w-fit h-full flex-shrink-0 snap-start flex items-center gap-24 px-24 bg-surface-container-low relative">
          <div className="absolute top-0 left-0 text-primary-fixed opacity-5 pointer-events-none scale-150">
            <span className="material-symbols-outlined text-[40rem]">water_drop</span>
          </div>

          {/* MOBILE WALLPAPER 1 */}
          <div className="relative group h-[768px] w-[400px] flex-shrink-0">
            <div className="absolute -top-10 -left-6 z-20 bg-primary-fixed text-surface px-4 py-1 font-stamp text-xl rotate-[-4deg] sticker-shadow">
              #ACID_01
            </div>
            <div className="w-full h-full bg-surface-container-high border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                alt="locked"
                src="/w-locked.svg"
              />
              <div className="absolute inset-0 holographic-effect opacity-20 pointer-events-none" />
              <div className="absolute bottom-6 left-6 flex flex-col gap-4">
                <button className="bg-primary-fixed text-surface px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter rotate-2 hover:-rotate-2 transition-transform sticker-shadow flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  LIKE
                </button>
                <button className="bg-surface text-primary-fixed border-2 border-primary-fixed px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter -rotate-1 hover:rotate-1 transition-transform sticker-shadow flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">download</span>
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE WALLPAPER 2 */}
          <div className="relative group h-[768px] w-[400px] flex-shrink-0 mt-32">
            <div className="absolute -bottom-8 -right-4 z-20 bg-surface-tint text-surface px-4 py-1 font-stamp text-xl rotate-[3deg] sticker-shadow">
              #VOID_99
            </div>
            <div className="w-full h-full bg-surface-container-high border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                alt="unlocked"
                src="/w-unlocked.svg"
              />
              <div className="absolute inset-0 holographic-effect opacity-30 pointer-events-none" />
              <div className="absolute top-6 right-6 font-stamp text-xs text-primary-fixed/40 text-right leading-none">
                RES: 1242 X 2688<br />
                TYPE: OBSIDIAN_GLASS<br />
                AUTH: SAFAR_VANDAL
              </div>
              <div className="absolute bottom-6 left-6 flex flex-col gap-4">
                <button className="bg-primary-fixed text-surface px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter rotate-1 hover:-rotate-3 transition-transform sticker-shadow flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  LIKE
                </button>
                <button className="bg-surface text-primary-fixed border-2 border-primary-fixed px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter -rotate-2 hover:rotate-2 transition-transform sticker-shadow flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">download</span>
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE WALLPAPER 3 */}
          <div className="relative group h-[768px] w-[400px] flex-shrink-0 -mt-16">
            <div className="w-full h-full bg-surface-container-high border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                alt="yo"
                src="/w-yo.svg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[10rem] text-primary-fixed rotate-12">mood</span>
              </div>
              <div className="absolute bottom-6 left-6 flex flex-col gap-4">
                <button className="bg-primary-fixed text-surface px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter -rotate-1 hover:rotate-2 transition-transform sticker-shadow flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  LIKE
                </button>
                <button className="bg-surface text-primary-fixed border-2 border-primary-fixed px-6 py-3 font-headline font-black text-sm uppercase tracking-tighter rotate-2 hover:-rotate-1 transition-transform sticker-shadow flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">download</span>
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN WALLPAPER SECTION (DESKTOP) */}
        <section className="min-w-screen h-full flex-shrink-0 snap-start flex flex-col justify-center px-24 bg-surface-container-lowest relative">
          <div className="mb-12">
            <h2 className="font-headline font-black text-8xl text-primary-fixed uppercase tracking-tighter leading-none">
              THE<br />
              <span className="text-on-surface">MAIN STASH</span>
            </h2>
          </div>
          <div className="flex gap-16 items-start">
            <div className="relative group w-[1000px] h-[500px] flex-shrink-0">
               <div className="absolute -top-12 -right-8 z-20 bg-primary-fixed text-surface px-8 py-3 font-stamp text-3xl rotate-[4deg] sticker-shadow">
                #COLLECTION_00
              </div>
              <div className="w-full h-full bg-surface-container-low border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.01]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  alt="the main stash"
                  src="/w-mainwallpaper.svg"
                />
                <div className="absolute bottom-8 right-8 flex gap-4">
                  <button className="bg-primary-fixed text-surface px-10 py-4 font-headline font-black text-xl uppercase tracking-tighter rotate-1 hover:-rotate-2 transition-transform sticker-shadow flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                    SPLATTER LIKE
                  </button>
                  <button className="bg-surface text-primary-fixed border-2 border-primary-fixed px-10 py-4 font-headline font-black text-xl uppercase tracking-tighter -rotate-1 hover:rotate-2 transition-transform sticker-shadow flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl">download_for_offline</span>
                    ARCHIVE VOID
                  </button>
                </div>
              </div>
            </div>
            <div className="w-80 pt-12">
              <div className="p-6 bg-surface-container-highest border-2 border-primary-fixed rotate-3 sticker-shadow mb-8 cursor-help hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-primary-fixed block mb-2">warning</span>
                <p className="font-stamp text-sm text-primary-fixed uppercase leading-relaxed tracking-tighter">
                  WARNING: High levels of aesthetic may cause spontaneous digital ascension. Use with caution during office hours.
                </p>
              </div>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed opacity-60">
                Our flagship obsidian-gradient vector slab. Optimized for extreme resolution displays and minimal cognitive load.
              </p>
            </div>
          </div>
        </section>

        {/* DESKTOP SECTION - SCREENSAVER */}
        <section className="min-w-screen h-full flex-shrink-0 snap-start flex flex-col justify-center px-24 bg-surface relative">
          <div className="mb-12">
            <h2 className="font-headline font-black text-8xl text-on-surface-variant uppercase tracking-tighter leading-none italic">
              DESKTOP<br />
              <span className="text-primary-fixed">ULTRA-WIDE</span>
            </h2>
          </div>
          <div className="flex gap-16 items-start">
            <div className="relative group w-[1000px] h-[500px] flex-shrink-0">
              <div className="absolute -top-6 -right-6 z-20 h-24 w-24 bg-primary-fixed text-surface flex items-center justify-center rounded-full rotate-12 font-street text-4xl sticker-shadow">
                !!!
              </div>
              <div className="w-full h-full bg-surface-container-low border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.01]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  alt="screensaver"
                  src="/w-screensaver.svg"
                />
                <div className="absolute bottom-8 right-8 flex gap-4">
                  <button className="bg-primary-fixed text-surface px-10 py-4 font-headline font-black text-xl uppercase tracking-tighter rotate-1 hover:-rotate-2 transition-transform sticker-shadow flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    LIKE STICKER
                  </button>
                  <button className="bg-surface text-primary-fixed border-2 border-primary-fixed px-10 py-4 font-headline font-black text-xl uppercase tracking-tighter -rotate-1 hover:rotate-2 transition-transform sticker-shadow flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl">download</span>
                    PULL FILE
                  </button>
                </div>
              </div>
            </div>
            <div className="w-64 pt-12">
              <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-8">
                Designed for the 8K workspace. Our desktop slabs use ultra-high bit depth obsidian grains to eliminate banding in dark environments.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-fixed font-stamp">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>8K NATIVE</span>
                </div>
                <div className="flex items-center gap-2 text-primary-fixed font-stamp">
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>HDR10+ READY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER / OUTRO */}
        <section className="min-w-screen h-full flex-shrink-0 snap-start bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
          {/* Logo-bg.svg background layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Logo-bg.svg" alt="" className="w-[70vh] h-[70vh] object-contain" />
          </div>
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="font-street text-[15vw] leading-none text-primary-fixed -rotate-3 mb-8">
              STAY<br />UNHINGED
            </div>
            <div className="font-headline font-bold text-2xl tracking-[1em] text-on-surface opacity-40 uppercase">
              RYYAN SAFAR © 2024
            </div>
            <div className="mt-24 flex gap-12">
              <a className="text-primary-fixed font-headline font-black text-4xl hover:line-through transition-all" href="#">INDEX</a>
              <a className="text-primary-fixed font-headline font-black text-4xl hover:line-through transition-all" href="#">STASH</a>
              <a className="text-primary-fixed font-headline font-black text-4xl hover:line-through transition-all" href="#">SPLATTER</a>
            </div>
          </div>
        </section>
      </HorizontalScroller>

      {/* FLOATING "TORN" BRANDING */}
      <div className="fixed top-8 left-8 z-[100] pointer-events-none">
        <div className="bg-primary-fixed text-surface px-6 py-2 font-headline font-black text-2xl italic -rotate-3 sticker-shadow">
          RS_GALLERY
        </div>
      </div>

      {/* BOTTOM NAV BAR */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-between items-end px-6 pb-4 md:hidden">
        <div className="bg-[#131313] w-full flex justify-between items-center p-2 rounded-none">
          <a className="flex flex-col items-center justify-center text-[#CCFF00] opacity-40 hover:opacity-100 transition-opacity p-3" href="#">
            <span className="material-symbols-outlined text-2xl">grid_view</span>
            <span className="font-headline uppercase tracking-tighter font-bold text-xs mt-1">INDEX</span>
          </a>
          <a className="flex flex-col items-center justify-center bg-[#CCFF00] text-[#131313] -rotate-2 scale-105 p-3" href="#">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="font-headline uppercase tracking-tighter font-bold text-xs mt-1">STASH</span>
          </a>
          <a className="flex flex-col items-center justify-center text-[#CCFF00] opacity-40 hover:opacity-100 transition-opacity p-3" href="#">
            <span className="material-symbols-outlined text-2xl">architecture</span>
            <span className="font-headline uppercase tracking-tighter font-bold text-xs mt-1">SPLATTER</span>
          </a>
        </div>
      </nav>

      {/* SIDE "SCRAPBOOK" INDEX (Desktop Only) */}
      <div className="hidden md:flex fixed top-1/2 -right-8 -translate-y-1/2 flex-col gap-8 z-[100]">
        <div className="bg-surface-container-high text-primary-fixed p-6 rotate-90 origin-right border-l-4 border-primary-fixed font-headline font-black text-xl tracking-widest cursor-pointer hover:bg-primary-fixed hover:text-surface transition-all">
          ARCHIVE_03
        </div>
        <div className="bg-surface-container-high text-primary-fixed p-6 rotate-90 origin-right border-l-4 border-primary-fixed font-headline font-black text-xl tracking-widest cursor-pointer hover:bg-primary-fixed hover:text-surface transition-all opacity-40">
          METADATA
        </div>
      </div>
    </>
  );
}
