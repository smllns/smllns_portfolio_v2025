import { FlowerConfig } from '@/components/sections/HeroSection';

//Pushes a flower away from the center if it landed inside the clear zone.
export function pushAwayFromCenter(
  flower: FlowerConfig,
  vw: number,
  vh: number,
  clearRadius: number
): void {
  const dx = flower.x - vw / 2;
  const dy = flower.y - vh / 2;
  const dist = Math.hypot(dx, dy);
  const safe = clearRadius + flower.size / 2;

  if (dist < safe) {
    const push = (safe - dist) / dist;
    flower.x += dx * push * 4;
    flower.y += dy * push * 4;

    const pad = flower.size / 2;
    flower.x = Math.max(pad, Math.min(vw - pad, flower.x));
    flower.y = Math.max(pad, Math.min(vh - pad, flower.y));
  }
}
