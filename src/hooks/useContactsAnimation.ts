import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { horizontalLoop } from '@/helpers/horizontalLoop';

gsap.registerPlugin(ScrollTrigger);

interface UseContactsAnimationParams {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  leftCircleRef: React.RefObject<HTMLDivElement | null>;
  rightCircleRef: React.RefObject<HTMLDivElement | null>;
  textRef: React.RefObject<HTMLDivElement | null>;
  marqueeContainerRef: React.RefObject<HTMLDivElement | null>;
  downloadRef: React.RefObject<HTMLDivElement | null>;
  arrowRefs: React.MutableRefObject<SVGSVGElement[]>;
  buttonsRef: React.MutableRefObject<HTMLDivElement[]>;
  highlightCV: React.MutableRefObject<{
    start: () => void;
    reset: () => void;
  } | null>;
}

export const useContactsAnimation = ({
  sectionRef,
  leftCircleRef,
  rightCircleRef,
  textRef,
  marqueeContainerRef,
  downloadRef,
  arrowRefs,
  buttonsRef,
  highlightCV,
}: UseContactsAnimationParams) => {
  const loopRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const left = leftCircleRef.current;
    const right = rightCircleRef.current;
    const text = textRef.current;
    const marquee = marqueeContainerRef.current;
    const download = downloadRef.current;

    if (!left || !right || !text || !marquee || !download) return;

    // Circles grow on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 45%',
        end: 'top 5%',
        scrub: true,
      },
    });

    tl.fromTo(
      left,
      { width: 40, height: 40 },
      { width: '150vmax', height: '150vmax', ease: 'power1.inOut' },
      0
    );
    tl.fromTo(
      right,
      { width: 40, height: 40 },
      { width: '150vmax', height: '150vmax', ease: 'power1.inOut' },
      0
    );

    // Background color transition
    gsap.to(section, {
      backgroundColor: '#f3f4f6',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 15%',
        end: 'top 8%',
        scrub: true,
      },
    });

    // Download text fade-in + CV highlight trigger
    gsap.fromTo(
      download,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 30%',
          end: 'top 5%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
        onComplete: () => highlightCV.current?.start(),
        onReverseComplete: () => highlightCV.current?.reset(),
      }
    );

    // Arrows fade-in with stagger
    gsap.fromTo(
      arrowRefs.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top 20%',
          end: 'top 10%',
          scrub: true,
        },
      }
    );

    // Pulsing animation for each arrow
    arrowRefs.current.forEach((el, i) => {
      gsap.to(el, {
        scale: 1.3,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // Buttons pop-in with stagger
    gsap.fromTo(
      buttonsRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        duration: 0.4,
        scrollTrigger: {
          trigger: section,
          start: 'top 10%',
          end: 'top 1%',
          scrub: true,
        },
      }
    );

    // Horizontal marquee loop
    const words = gsap.utils.toArray<HTMLElement>(
      text.querySelectorAll('.loop-word')
    );
    const loop = horizontalLoop(words, {
      repeat: -1,
      speed: 1,
      reversed: false,
      paused: false,
      gap: 36,
    });
    loopRef.current = loop;

    // Hover/touch speed control on marquee loop
    const handleEnter = () => {
      gsap.to(loop, { timeScale: 2.5, duration: 0.45, ease: 'power2.out' });
    };
    const handleLeave = () => {
      gsap.to(loop, { timeScale: 1, duration: 0.7, ease: 'power3.out' });
    };

    marquee.addEventListener('mouseenter', handleEnter);
    marquee.addEventListener('mouseleave', handleLeave);
    marquee.addEventListener('touchstart', handleEnter, { passive: true });
    marquee.addEventListener('touchend', handleLeave);
    marquee.addEventListener('touchcancel', handleLeave);

    // Cleanup
    return () => {
      marquee.removeEventListener('mouseenter', handleEnter);
      marquee.removeEventListener('mouseleave', handleLeave);
      marquee.removeEventListener('touchstart', handleEnter);
      marquee.removeEventListener('touchend', handleLeave);
      marquee.removeEventListener('touchcancel', handleLeave);

      loop.kill();
      tl.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === section)
        .forEach((st) => st.kill());
    };
  }, [
    sectionRef,
    leftCircleRef,
    rightCircleRef,
    textRef,
    marqueeContainerRef,
    downloadRef,
    arrowRefs,
    buttonsRef,
    highlightCV,
  ]);
};
