// random flower sizes
export function getRandomSize(): number {
  const r = Math.random();
  if (r < 0.03) return 200 + Math.random() * 80;
  if (r < 0.2) return 110 + Math.random() * 90;
  return 35 + Math.pow(Math.random(), 2) * 80;
}
