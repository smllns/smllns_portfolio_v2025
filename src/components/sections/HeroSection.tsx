'use client';

import { useEffect, useState } from 'react';
import { generateFlowers } from '@/helpers/generateFlowers';
import Flower from '../Flower';
import Header from '../Header';

export type Variant = 'one' | 'two' | 'three' | 'four' | 'five';

export interface FlowerConfig {
  id: number;
  variant: Variant;
  size: number;
  x: number;
  y: number;
  delay: number;
}

export default function HeroSection() {
  const [flowers, setFlowers] = useState<FlowerConfig[]>([]);
  const [ready, setReady] = useState(false);

  // Generate flowers once on mount
  useEffect(() => {
    const generated = generateFlowers();
    setFlowers(generated);
    // tiny delay to allow CSS fade-in
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className='relative flex items-center justify-center w-full h-screen overflow-hidden transition-opacity duration-500'
      style={{ opacity: ready ? 1 : 0 }}
    >
      {flowers.map((f) => (
        <div
          key={f.id}
          className='absolute'
          style={{
            left: `${f.x}px`,
            top: `${f.y}px`,
            transform: 'translate(-50%, -50%)',
            zIndex: Math.floor(f.size / 25),
            filter: 'brightness(0.9)',
          }}
        >
          <Flower variant={f.variant} size={f.size} delay={f.delay} />
        </div>
      ))}
      <Header />
    </div>
  );
}
