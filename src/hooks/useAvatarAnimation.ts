// avatar animations in about section
import gsap from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

export function useAvatarAnimation(
  svgRef: React.RefObject<SVGSVGElement | null>,
  trigger: HTMLElement | null,
  flowerRefs: React.RefObject<HTMLDivElement | null>[]
) {
  useEffect(() => {
    if (!trigger || !svgRef.current || flowerRefs.some((r) => !r.current))
      return;

    const st = ScrollTrigger.create({
      trigger,
      start: 'top 40%',
      end: 'top 20%',
      scrub: 1.2,
      onLeave: () => {
        gsap.to(svgRef.current, {
          rotation: 10,
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 50%',
          ease: 'elastic.out(1, 0.2)',
          duration: 2,
        });
      },
    });

    gsap.fromTo(
      svgRef.current,
      { y: '50vh' },
      {
        y: '0vh',
        ease: 'circ.out',
        scrollTrigger: {
          trigger,
          start: 'top 40%',
          end: 'top 20%',
          scrub: 1.2,
        },
      }
    );

    gsap.fromTo(
      flowerRefs.map((r) => r.current!),
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        ease: 'circ.out',
        scrollTrigger: {
          trigger,
          start: 'top 30%',
          end: 'top 10%',
          scrub: 1.2,
        },
      }
    );
    const draggable = Draggable.create(svgRef.current, {
      type: 'rotation',
      inertia: true,
      transformOrigin: '50% 50%',
      onPressInit: () => {
        gsap.set(svgRef.current, { cursor: 'grabbing' });
      },
      onRelease: () => {
        gsap.set(svgRef.current, { cursor: 'grab' });
        gsap.to(svgRef.current, {
          rotation: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.4)',
        });
      },
    })[0];

    gsap.set(svgRef.current, { cursor: 'grab' });

    return () => {
      st.kill();
      draggable?.kill();
    };
  }, [svgRef, trigger, flowerRefs]);
}
