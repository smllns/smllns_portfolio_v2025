// smooth scrolling wrapper used on all pages
'use client';
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger);
export default function LenisWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    // Connecting Lenis to ScrollTrigger with scrollerProxy
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    // updating ScrollTrigger
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <>{children}</>;
}
