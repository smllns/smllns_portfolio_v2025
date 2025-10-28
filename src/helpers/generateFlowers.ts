import { pushAwayFromCenter } from './pushAwayFromCenter';
import { getRandomSize } from './getRandomSize';
import { getEdgePosition } from './getEdgePosition';
import { FlowerConfig, Variant } from '@/components/sections/HeroSection';
const VARIANTS: Variant[] = ['one', 'two', 'three', 'four', 'five'];

export function generateFlowers(): FlowerConfig[] {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const targetCount = vw <= 768 ? 50 : 150;
  const appearanceInterval = 0.025; // seconds
  const centerClearRadius = Math.min(vw, vh) * 0.35;

  const flowers: FlowerConfig[] = [];

  for (let i = 0; i < targetCount; ) {
    const size = getRandomSize();
    const { x, y } = getEdgePosition(size, vw, vh);

    // discard if inside center (re-try)
    const distToCenter = Math.hypot(x - vw / 2, y - vh / 2);
    if (distToCenter < centerClearRadius) continue;

    flowers.push({
      id: i,
      variant: VARIANTS[Math.floor(Math.random() * VARIANTS.length)],
      size,
      x,
      y,
      delay: i * appearanceInterval,
    });
    i++;
  }

  // final push-away (in case any slipped through)
  flowers.forEach((f) => pushAwayFromCenter(f, vw, vh, centerClearRadius));

  // larger flowers → lower z-index (appear behind)
  flowers.sort((a, b) => a.size - b.size);

  return flowers;
}
