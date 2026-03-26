'use client';

import HorizontalScroller from './components/HorizontalScroller';
import WallpaperActions from './components/WallpaperActions';

export default function Home() {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if ((window as any).lenisHorizontal) {
      (window as any).lenisHorizontal.scrollTo(0, { lerp: 0.1 });
    }
  };

  return (
    <>
      {/* ─── DESKTOP: horizontal scroll ─── */}
      <div className="hidden md:block">
        <HorizontalScroller>
          {/* HERO */}
          <section className="min-w-screen h-full flex-shrink-0 snap-start relative flex items-center justify-center p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-10 left-10 text-primary-fixed opacity-20 transform -rotate-12 scale-150">
                <span className="material-symbols-outlined text-9xl">texture</span>
              </div>
              <div className="absolute bottom-20 right-20 text-primary-fixed opacity-10 transform rotate-45 scale-[3]">
                <span className="material-symbols-outlined text-9xl">grid_view</span>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-start max-w-7xl w-full">
              <div className="font-headline font-black text-[10vw] lg:text-[12vw] leading-none tracking-tighter uppercase glitch-text break-all">
                WALLPAPERS<br />
                <span className="text-primary-fixed">.RYYAN</span><br />
                SAFAR
              </div>
              <div className="mt-6 lg:mt-8 bg-primary-fixed text-surface p-3 lg:p-4 -rotate-2 font-headline font-extrabold text-lg lg:text-2xl uppercase tracking-widest">
                VARIANT C: ACID GREEN & OBSIDIAN
              </div>
              <div className="mt-8 lg:mt-12 flex items-center gap-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary-fixed p-2 flex items-center justify-center rotate-12 sticker-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-header-fr.svg"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="font-stamp text-lg lg:text-2xl text-primary-fixed opacity-60 border-l border-outline-variant pl-6">
                  COLLECTION_003<br />UNHINGED_GALLERY
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 lg:bottom-12 right-8 lg:right-12 flex items-center gap-4 text-primary-fixed">
              <span className="font-headline text-xs tracking-[0.5em] uppercase">Scroll to enter the void</span>
              <span className="material-symbols-outlined animate-bounce">arrow_forward</span>
            </div>
          </section>

          {/* GALLERY TRACK */}
          <section className="min-w-fit h-full flex-shrink-0 snap-start flex items-center gap-10 lg:gap-14 xl:gap-20 2xl:gap-24 px-10 lg:px-14 xl:px-20 2xl:px-24 bg-surface-container-low relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-fixed opacity-[0.08] pointer-events-none z-0 transform scale-[1.5]">
              <span className="material-symbols-outlined text-[120vh]">water_drop</span>
            </div>

            {/* Card 1 */}
            <div className="relative z-10 group h-[55vh] w-[calc(55vh*400/768)] lg:h-[62vh] lg:w-[calc(62vh*400/768)] xl:h-[68vh] xl:w-[calc(68vh*400/768)] 2xl:h-[768px] 2xl:w-[400px] flex-shrink-0">
              <div className="absolute -top-10 -left-6 z-20 bg-primary-fixed text-surface px-4 py-1 font-stamp text-lg xl:text-xl rotate-[-4deg] sticker-shadow">#ACID_01</div>
              <div className="w-full h-full bg-surface-container-high border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="locked" src="/w-locked.png" />
                <div className="absolute inset-0 holographic-effect opacity-20 pointer-events-none" />
                <div className="absolute top-6 right-6 font-stamp text-xs text-primary-fixed/40 text-right leading-none">
                  RES: 1242 X 2688<br />TYPE: SECURE_LOCK<br />AUTH: [ENCRYPTED]
                </div>
                <div className="absolute bottom-6 left-6">
                  <WallpaperActions wallpaperId="w-locked" src="/w-locked.png" filename="wallpaper-locked-ryyan.png" likeRotate="rotate-2" downloadRotate="-rotate-1 hover:rotate-1" />
                </div>
              </div>
            </div>

            {/* Card 2 — staggered down */}
            <div className="relative z-10 group h-[55vh] w-[calc(55vh*400/768)] lg:h-[62vh] lg:w-[calc(62vh*400/768)] xl:h-[68vh] xl:w-[calc(68vh*400/768)] 2xl:h-[768px] 2xl:w-[400px] flex-shrink-0 mt-[14vh] lg:mt-[16vh] 2xl:mt-32">
              <div className="absolute -bottom-8 -right-4 z-20 bg-surface-tint text-surface px-4 py-1 font-stamp text-lg xl:text-xl rotate-[3deg] sticker-shadow">#VOID_99</div>
              <div className="w-full h-full bg-surface-container-high border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="unlocked" src="/w-unlocked.png" />
                <div className="absolute inset-0 holographic-effect opacity-30 pointer-events-none" />
                <div className="absolute top-6 right-6 font-stamp text-xs text-primary-fixed/40 text-right leading-none">
                  RES: 1242 X 2688<br />TYPE: OPEN_ACCESS<br />AUTH: R_SAFAR
                </div>
                <div className="absolute bottom-6 left-6">
                  <WallpaperActions wallpaperId="w-unlocked" src="/w-unlocked.png" filename="wallpaper-unlocked-ryyan.png" likeRotate="rotate-1" downloadRotate="-rotate-2 hover:rotate-2" />
                </div>
              </div>
            </div>

            {/* Card 3 — staggered up slightly */}
            <div className="relative z-10 group h-[55vh] w-[calc(55vh*400/768)] lg:h-[62vh] lg:w-[calc(62vh*400/768)] xl:h-[68vh] xl:w-[calc(68vh*400/768)] 2xl:h-[768px] 2xl:w-[400px] flex-shrink-0 -mt-[7vh] lg:-mt-[8vh] 2xl:-mt-16">
              <div className="w-full h-full bg-surface-container-high border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.02]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="yo" src="/w-yo.png" />
                <div className="absolute top-6 right-6 font-stamp text-xs text-primary-fixed/40 text-right leading-none">
                  RES: 1242 X 2688<br />TYPE: VIBE_CHECK<br />AUTH: VANDAL
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[10rem] text-primary-fixed rotate-12">mood</span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <WallpaperActions wallpaperId="w-yo" src="/w-yo.png" filename="wallpaper-yo-ryyan.png" likeRotate="-rotate-1" downloadRotate="rotate-2 hover:-rotate-1" />
                </div>
              </div>
            </div>
          </section>

          {/* DESKTOP MAIN WALLPAPER */}
          <section className="min-w-screen h-full flex-shrink-0 snap-start flex flex-col justify-center px-10 lg:px-16 xl:px-24 bg-surface-container-low relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-surface to-transparent opacity-60" />
              <div className="absolute top-8 right-12 text-primary-fixed opacity-5 transform rotate-12 scale-[4]">
                <span className="material-symbols-outlined text-9xl">desktop_windows</span>
              </div>
            </div>

            <div className="relative z-10 mb-6 lg:mb-10">
              <div className="inline-block bg-surface-tint text-surface px-4 py-1 font-stamp text-base lg:text-lg rotate-[2deg] sticker-shadow mb-3 lg:mb-4">#MAIN_WP</div>
              <h2 className="font-headline font-black text-5xl lg:text-6xl xl:text-8xl text-on-surface uppercase tracking-tighter leading-none italic">
                DESKTOP<br /><span className="text-primary-fixed">MAIN</span>
              </h2>
            </div>

            <div className="relative z-10 flex gap-8 lg:gap-12 xl:gap-16 items-start">
              {/* Image — aspect-ratio + vh height so it never overflows */}
              <div className="relative group flex-shrink-0 aspect-video h-[46vh] lg:h-[52vh] xl:h-[58vh] 2xl:h-[675px]">
                <div className="absolute -top-6 -left-6 z-20 bg-primary-fixed text-surface px-4 lg:px-5 py-2 font-stamp text-base lg:text-xl -rotate-[3deg] sticker-shadow">RES: 2560×1440</div>
                <div className="absolute -bottom-5 right-8 z-20 bg-surface text-primary-fixed border-2 border-primary-fixed px-4 py-1 font-stamp text-sm rotate-[1deg] sticker-shadow">TYPE: DESKTOP_COVER</div>
                <div className="w-full h-full bg-surface-container border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.01]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="main desktop wallpaper" src="/w-mainwallpaper.svg" />
                  <div className="absolute inset-0 holographic-effect opacity-10 pointer-events-none" />
                  <div className="absolute bottom-8 right-8">
                    <WallpaperActions wallpaperId="w-mainwallpaper" src="/w-mainwallpaper.svg" filename="wallpaper-main-ryyan.svg" likeRotate="-rotate-1" downloadRotate="rotate-1 hover:-rotate-1" />
                  </div>
                </div>
              </div>
              <div className="w-44 lg:w-56 xl:w-64 pt-8 lg:pt-10">
                <p className="font-body text-on-surface-variant text-sm lg:text-base xl:text-lg leading-relaxed mb-6 lg:mb-8">
                  The main wallpaper. Clean obsidian base with Ryyan&apos;s signature acid-green geometry baked right in. Slaps on any widescreen setup.
                </p>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-2 text-primary-fixed font-stamp text-sm lg:text-base">
                    <span className="material-symbols-outlined text-base lg:text-xl">check_circle</span><span>1440p NATIVE</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-fixed font-stamp text-sm lg:text-base">
                    <span className="material-symbols-outlined text-base lg:text-xl">check_circle</span><span>DARK MODE ONLY</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-fixed font-stamp text-sm lg:text-base">
                    <span className="material-symbols-outlined text-base lg:text-xl">check_circle</span><span>NO BANDING</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DESKTOP SCREENSAVER */}
          <section className="min-w-screen h-full flex-shrink-0 snap-start flex flex-col justify-center px-10 lg:px-16 xl:px-24 bg-surface relative overflow-hidden">
            <div className="relative z-10 mb-8 lg:mb-12">
              <h2 className="font-headline font-black text-5xl lg:text-6xl xl:text-8xl text-on-surface-variant uppercase tracking-tighter leading-none italic">
                DESKTOP<br /><span className="text-primary-fixed">ULTRA-WIDE</span>
              </h2>
            </div>
            <div className="relative z-10 flex gap-8 lg:gap-12 xl:gap-16 items-start">
              {/* Image — aspect 2:1 + vh height */}
              <div className="relative group flex-shrink-0 aspect-[2/1] h-[40vh] lg:h-[46vh] xl:h-[52vh] 2xl:h-[500px]">
                <div className="absolute -top-6 -right-6 z-20 h-20 w-20 lg:h-24 lg:w-24 bg-primary-fixed text-surface flex items-center justify-center rounded-full rotate-12 font-street text-3xl lg:text-4xl sticker-shadow">!!!</div>
                <div className="w-full h-full bg-surface-container-low border-0 overflow-hidden relative sticker-shadow transform transition-transform group-hover:scale-[1.01]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-full h-full object-cover grayscale brightness-50 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="screensaver" src="/w-screensaver.png" />
                  <div className="absolute bottom-8 right-8">
                    <WallpaperActions wallpaperId="w-screensaver" src="/w-screensaver.png" filename="wallpaper-screensaver-ryyan.png" likeRotate="rotate-1" downloadRotate="-rotate-1 hover:rotate-2" />
                  </div>
                </div>
              </div>
              <div className="w-44 lg:w-56 xl:w-64 pt-10 lg:pt-12">
                <p className="font-body text-on-surface-variant text-sm lg:text-base xl:text-lg leading-relaxed mb-6 lg:mb-8">
                  Yes, this is a screensaver. No, you don&apos;t need it. Yes, you&apos;re downloading it anyway. Pure obsidian. Zero clutter. The void, framed nicely for your ultrawide.
                </p>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-2 text-primary-fixed font-stamp text-sm lg:text-base">
                    <span className="material-symbols-outlined text-base lg:text-xl">check_circle</span><span>ULTRAWIDE READY</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-fixed font-stamp text-sm lg:text-base">
                    <span className="material-symbols-outlined text-base lg:text-xl">check_circle</span><span>ZERO DISTRACTIONS</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-fixed font-stamp text-sm lg:text-base">
                    <span className="material-symbols-outlined text-base lg:text-xl">check_circle</span><span>VOID CERTIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OUTRO */}
          <section className="min-w-screen h-full flex-shrink-0 snap-start bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo-bg.svg" alt="" className="w-[70vh] h-[70vh] object-contain" />
            </div>
            <div className="relative z-10 text-center flex flex-col items-center">
              <div className="font-street text-[10vw] lg:text-[13vw] xl:text-[15vw] leading-none text-primary-fixed -rotate-3 mb-8">
                STAY<br />UNHINGED
              </div>
              <div className="font-headline font-bold text-lg lg:text-2xl tracking-[0.5em] lg:tracking-[1em] text-on-surface opacity-40 uppercase">
                RYYAN SAFAR © 2026
              </div>
              <div className="mt-16 lg:mt-24 flex flex-col items-center gap-6">
                <div className="flex gap-8 lg:gap-12">
                  <a onClick={handleHomeClick} href="#" className="text-primary-fixed font-headline font-black text-2xl lg:text-4xl hover:line-through transition-all cursor-pointer">HOME</a>
                  <a href="https://ryyansafar.site" className="text-primary-fixed font-headline font-black text-2xl lg:text-4xl hover:line-through transition-all">PORTFOLIO</a>
                  <a href="https://ryyansafar.site/design" className="text-primary-fixed font-headline font-black text-2xl lg:text-4xl hover:line-through transition-all">DESIGN</a>
                </div>
                <a
                  href="https://razorpay.me/@ryyansafar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-fixed font-street text-3xl lg:text-5xl hover:scale-105 transition-all rotate-3 mt-4"
                >
                  BUY ME A CHAI
                </a>
              </div>
            </div>
          </section>
        </HorizontalScroller>

        {/* Desktop floating branding */}
        <div className="fixed top-6 lg:top-8 left-6 lg:left-8 z-[100] pointer-events-none">
          <div className="bg-primary-fixed text-surface px-4 lg:px-6 py-2 -rotate-3 sticker-shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-header-fr.svg" alt="RS_GALLERY" className="h-10 lg:h-12 w-auto" />
          </div>
        </div>
      </div>

      {/* ─── MOBILE: vertical scroll ─── */}
      <div className="md:hidden bg-surface min-h-screen overflow-x-hidden">

        {/* Fixed header */}
        <header className="fixed top-0 w-full z-50 bg-surface-container-low shadow-[0_0_40px_rgba(204,255,0,0.06)] flex justify-between items-center px-4 sm:px-5 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo-bg.svg" alt="RS" className="h-8 sm:h-9 w-auto" />
          <div className="font-street text-lg sm:text-xl text-primary-fixed -rotate-2">RYYAN SAFAR</div>
        </header>

        <main className="pt-20 sm:pt-24 pb-36 px-4 space-y-14 sm:space-y-20 overflow-x-clip">

          {/* Hero */}
          <section className="relative min-h-[360px] sm:min-h-[480px] flex flex-col justify-center items-start overflow-hidden">
            <div className="absolute -left-8 top-8 opacity-10 select-none pointer-events-none">
              <span className="font-street text-[6rem] sm:text-[8rem] leading-none text-primary-fixed block rotate-12">WALLS</span>
            </div>
            <div className="relative z-10 flex flex-col space-y-1 w-full">
              <h2 className="font-street text-[2.5rem] sm:text-5xl text-primary-fixed leading-[0.9] -rotate-2">WALL</h2>
              <h2 className="font-headline font-black text-[3.5rem] sm:text-7xl text-on-surface leading-[0.85] tracking-tighter translate-x-3 glitch-text">PAPERS</h2>
              <h2 className="font-street text-[2rem] sm:text-4xl text-primary-fixed leading-[0.9] rotate-3 translate-x-1">YEAH</h2>
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="font-headline font-black text-[3rem] sm:text-6xl text-on-surface leading-none uppercase">by</h2>
                <h2 className="font-street text-[2.5rem] sm:text-5xl text-primary-fixed leading-none -rotate-6">RYYAN</h2>
              </div>
              <h2 className="font-headline font-black text-[3rem] sm:text-6xl text-on-surface leading-none underline decoration-primary-fixed decoration-[5px] sm:decoration-[6px] underline-offset-4 break-words">SAFAR.</h2>
            </div>
            <div className="mt-6 sm:mt-8 self-end pr-2 sm:pr-4 flex flex-col items-center gap-1 opacity-90">
              <div className="font-street text-lg sm:text-xl text-primary-fixed">RYYAN SAFAR</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Logo-bg.svg" alt="" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            </div>
          </section>

          {/* Gallery slabs */}
          <section className="space-y-14 sm:space-y-20">

            {/* Card 1 — locked */}
            <div className="relative group">
              <div className="absolute -top-6 -right-2 z-20 font-stamp text-xs tracking-widest text-primary-fixed bg-surface px-2 py-1 rotate-3 border border-outline-variant/20">#ACID_01</div>
              <div className="relative overflow-hidden bg-surface-container-low shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full aspect-[4/5] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Ryyan has locked his phone" src="/w-locked.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-5 left-5 font-stamp text-[10px] tracking-tighter text-white/50 space-y-0.5 pointer-events-none">
                  <div>RES: 1242×2688</div>
                  <div>TYPE: SECURE_LOCK</div>
                </div>
                <div className="absolute bottom-5 right-5">
                  <WallpaperActions wallpaperId="w-locked" src="/w-locked.png" filename="wallpaper-locked-ryyan.png" overlay likeRotate="-rotate-2" downloadRotate="rotate-1 hover:rotate-0" />
                </div>
              </div>
            </div>

            {/* Card 2 — unlocked (offset right) */}
            <div className="relative group translate-x-2 sm:translate-x-3">
              <div className="absolute -top-4 -left-2 z-20 font-stamp text-xs tracking-widest text-primary-fixed bg-surface px-2 py-1 -rotate-2 border border-outline-variant/20">#VOID_99</div>
              <div className="relative overflow-hidden bg-surface-container-low shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full aspect-[4/5] object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="Ryyan has unlocked his phone" src="/w-unlocked.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute top-1/2 -right-3 font-stamp text-[9px] tracking-widest text-white/30 pointer-events-none" style={{ writingMode: 'vertical-rl' }}>
                  PROPERTY OF RYYAN SAFAR // 2026
                </div>
                <div className="absolute bottom-5 left-5">
                  <WallpaperActions wallpaperId="w-unlocked" src="/w-unlocked.png" filename="wallpaper-unlocked-ryyan.png" overlay likeRotate="rotate-3" downloadRotate="-rotate-1 hover:rotate-0" />
                </div>
              </div>
            </div>

            {/* Card 3 — yo (offset left) */}
            <div className="relative group -translate-x-1">
              <div className="absolute -top-6 right-10 z-20 font-stamp text-xs tracking-widest text-primary-fixed bg-surface px-2 py-1 rotate-6 border border-outline-variant/20">#VIBE_03</div>
              <div className="relative overflow-hidden bg-surface-container-low shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full aspect-[4/5] object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="yo. im ryyan." src="/w-yo.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-5 right-5">
                  <WallpaperActions wallpaperId="w-yo" src="/w-yo.png" filename="wallpaper-yo-ryyan.png" overlay likeRotate="-rotate-4" downloadRotate="rotate-2 hover:rotate-0" />
                </div>
              </div>
            </div>

            {/* Card 4 — main desktop wallpaper */}
            <div className="relative group">
              <div className="absolute -top-6 -right-2 z-20 font-stamp text-xs tracking-widest text-primary-fixed bg-surface px-2 py-1 rotate-2 border border-outline-variant/20">#MAIN_WP</div>
              <div className="relative overflow-hidden bg-surface-container-low shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full aspect-video object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="main desktop wallpaper — acid green geometry on obsidian." src="/w-mainwallpaper.svg" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-5 left-5 font-stamp text-[10px] tracking-tighter text-white/50 space-y-0.5 pointer-events-none">
                  <div>RES: 2560×1440</div>
                  <div>TYPE: DESKTOP_COVER</div>
                </div>
                <div className="absolute bottom-5 right-5">
                  <WallpaperActions wallpaperId="w-mainwallpaper" src="/w-mainwallpaper.svg" filename="wallpaper-main-ryyan.svg" overlay likeRotate="-rotate-1" downloadRotate="rotate-2 hover:rotate-0" />
                </div>
              </div>
            </div>

            {/* Card 5 — screensaver (translate right) */}
            <div className="relative group translate-x-1 sm:translate-x-2">
              <div className="absolute -top-4 -left-2 z-20 font-stamp text-xs tracking-widest text-primary-fixed bg-surface px-2 py-1 -rotate-3 border border-outline-variant/20">#ULTRA_WIDE</div>
              <div className="relative overflow-hidden bg-surface-container-low shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full aspect-video object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" alt="yes, this is a screensaver." src="/w-screensaver.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-5 right-5">
                  <WallpaperActions wallpaperId="w-screensaver" src="/w-screensaver.png" filename="wallpaper-screensaver-ryyan.png" overlay likeRotate="rotate-1" downloadRotate="-rotate-2 hover:rotate-0" />
                </div>
              </div>
            </div>

          </section>
        </main>

        {/* Footer */}
        <footer className="px-4 pt-10 pb-28 border-t border-outline-variant/10">
          <div className="space-y-3">
            <div className="font-street text-4xl sm:text-5xl text-on-surface leading-none">NO MORE</div>
            <div className="font-street text-4xl sm:text-5xl text-primary-fixed leading-none pl-8">WALLPAPERS</div>
            <div className="font-street text-4xl sm:text-5xl text-on-surface leading-none pl-4">TODAY</div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href="https://razorpay.me/@ryyansafar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-fixed font-street text-3xl hover:scale-105 transition-all rotate-2 w-fit italic"
            >
              BUY ME A CHAI
            </a>
          </div>

          <div className="mt-10 sm:mt-12 flex justify-between items-end">
            <div className="font-stamp text-[10px] tracking-[0.3em] text-on-surface/40 uppercase leading-relaxed">
              DESIGNED IN THE VOID<br />BY RYYAN SAFAR © 2026
            </div>
            <div className="font-street text-xl sm:text-2xl text-primary-fixed rotate-12">BYE.</div>
          </div>
        </footer>

        {/* Fixed bottom pill — scroll to top */}
        <nav className="fixed bottom-5 sm:bottom-6 w-full flex justify-center z-50 pointer-events-none">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto bg-primary-fixed text-surface px-6 sm:px-8 py-2.5 sm:py-3 font-street text-lg sm:text-xl -rotate-1 shadow-[0_0_24px_rgba(195,244,0,0.25)] hover:rotate-0 hover:scale-105 active:scale-95 transition-all"
          >
            STAY UNHINGED ↑
          </button>
        </nav>

      </div>
    </>
  );
}
