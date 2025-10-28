// Picks a random position only near the screen edges
export function getEdgePosition(
  size: number,
  vw: number,
  vh: number
): { x: number; y: number } {
  const padding = size / 2;
  const edgeZone = 150; // width of the "edge" band
  let x = 0,
    y = 0;

  const side = Math.floor(Math.random() * 4);
  switch (side) {
    case 0: // left
      x = padding + Math.random() * edgeZone;
      y = padding + Math.random() * (vh - 2 * padding);
      break;
    case 1: // right
      x = vw - padding - Math.random() * edgeZone;
      y = padding + Math.random() * (vh - 2 * padding);
      break;
    case 2: // top
      x = padding + Math.random() * (vw - 2 * padding);
      y = padding + Math.random() * edgeZone;
      break;
    case 3: // bottom
      x = padding + Math.random() * (vw - 2 * padding);
      y = vh - padding - Math.random() * edgeZone;
      break;
  }

  // small jitter inside the band
  x += (Math.random() - 0.5) * 40;
  y += (Math.random() - 0.5) * 40;

  // clamp to viewport
  x = Math.max(padding, Math.min(vw - padding, x));
  y = Math.max(padding, Math.min(vh - padding, y));

  return { x, y };
}
