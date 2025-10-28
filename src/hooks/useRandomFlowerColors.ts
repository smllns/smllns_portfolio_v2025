import { CENTER_COLORS, PETAL_COLORS } from '@/lib/flowerColors';
import { useEffect, useState } from 'react';

export function useRandomFlowerColors() {
  const [colors, setColors] = useState<{
    petalColor: string;
    centerColor: string;
  } | null>(null);

  useEffect(() => {
    const petalIndex = Math.floor(Math.random() * PETAL_COLORS.length);
    const petalColor = PETAL_COLORS[petalIndex];
    const centerOptions = CENTER_COLORS.filter((c) => c !== petalColor);
    const centerColor =
      centerOptions[Math.floor(Math.random() * centerOptions.length)];
    setColors({ petalColor, centerColor });
  }, []);

  return colors;
}
