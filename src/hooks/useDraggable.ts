// hook to make flowers draggable
import { useEffect, useRef } from 'react';
import { Draggable } from 'gsap/Draggable';
import InertiaPlugin from 'gsap/InertiaPlugin';
import { gsap } from 'gsap';

gsap.registerPlugin(Draggable, InertiaPlugin);

export function useDraggable(
  flowerRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const draggableRef = useRef<Draggable | null>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled || !flowerRef.current) return;

    const flower = flowerRef.current;
    const container = flower.parentElement?.parentElement;
    if (!container) return;

    // Kill previous instance
    draggableRef.current?.kill();
    cleanupRef.current?.();

    draggableRef.current = Draggable.create(flower, {
      type: 'x,y',
      bounds: container,
      inertia: true,
      edgeResistance: 0.85,
      dragResistance: 0,
    })[0];

    const ro = new ResizeObserver(() => {
      draggableRef.current?.applyBounds(container);
    });
    ro.observe(container);

    cleanupRef.current = () => {
      ro.disconnect();
      draggableRef.current?.kill();
    };

    return () => cleanupRef.current();
  }, [enabled, flowerRef]);
}
