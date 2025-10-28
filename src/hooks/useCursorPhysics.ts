import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
type Vec2 = { x: number; y: number };
export const useCursorPhysics = (
  cursorRef: React.RefObject<HTMLDivElement | null>
) => {
  const pos = useRef<Vec2>({ x: 0, y: 0 });
  const vel = useRef<Vec2>({ x: 0, y: 0 });
  const target = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    if (!cursorRef.current) return;

    const startX = window.innerWidth / 2;
    const startY = -100;

    pos.current = { x: startX, y: startY };
    target.current = { x: startX, y: startY };

    gsap.set(cursorRef.current, {
      x: startX,
      y: startY,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    });

    const updateTarget = (e: PointerEvent | TouchEvent) => {
      const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
      target.current.x = clientX;
      target.current.y = clientY;
    };

    window.addEventListener('pointermove', updateTarget, { passive: true });
    window.addEventListener('touchmove', updateTarget, { passive: true });

    const spring = 0.08;
    const friction = 0.4;

    const ticker = () => {
      if (!cursorRef.current) return;

      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;

      vel.current.x += dx * spring;
      vel.current.y += dy * spring;
      vel.current.x *= friction;
      vel.current.y *= friction;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      const speed = Math.abs(vel.current.x + vel.current.y);
      const scale = 0.6 + Math.min(speed * 0.08, 0.15);

      gsap.set(cursorRef.current, {
        x: pos.current.x + 25,
        y: pos.current.y + 25,
        xPercent: -50,
        yPercent: -50,
        force3D: true,
        scale,
      });
    };

    gsap.ticker.add(ticker);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('pointermove', updateTarget);
      window.removeEventListener('touchmove', updateTarget);
    };
  }, [cursorRef]);
};
