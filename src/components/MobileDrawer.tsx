'use client';
import { useDrawerAnimation } from '@/hooks/useDrawerAnimation';
import { useEffect, useRef, useState } from 'react';

export default function MobileDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  activeIndex,
  technologies,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (v: boolean) => void;
  activeIndex: number | null;
  technologies: { title: string; description: string }[];
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Mount drawer only when opened at least once
  useEffect(() => {
    if (isDrawerOpen) {
      setIsMounted(true);
    }
  }, [isDrawerOpen]);

  useDrawerAnimation(isDrawerOpen, isMounted, overlayRef, drawerRef);

  // Don't render until mounted and has valid index
  if (!isMounted || activeIndex === null) return null;

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm invisible opacity-0'
      onClick={() => setIsDrawerOpen(false)}
    >
      <div
        ref={drawerRef}
        className='bg-neutral-100 rounded-2xl shadow-2xl w-[90vw] max-w-sm p-6 text-center relative opacity-0 invisible'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsDrawerOpen(false)}
          className='absolute top-3 right-3 text-neutral-500  text-md  leading-none'
          aria-label='Close drawer'
        >
          x
        </button>

        {/* Content */}
        <h3 className='text-2xl font-bold text-neutral-900 mb-2'>
          {technologies[activeIndex].title}
        </h3>
        <p className='text-neutral-900 text-sm leading-relaxed'>
          {technologies[activeIndex].description}
        </p>
      </div>
    </div>
  );
}
