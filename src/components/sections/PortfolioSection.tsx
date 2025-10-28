import React, { useRef, useState, useEffect } from 'react';
import { getFlowerSize } from '@/helpers/getFlowerSize';
import { flowerConfigs } from '@/lib/portfolioFlowerConfigs';
import { usePortfolioAnimation } from '@/hooks/usePortfolioAnimation';
import Flower from '../Flower';
import FlowingMenu from '../FlowingMenu';

const PortfolioSection = ({
  portfolioSectionRef,
}: {
  portfolioSectionRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const flowerRefs = useRef<HTMLDivElement[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size for responsive flower sizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  usePortfolioAnimation({
    titleRef,
    flowerRefs,
    menuRef,
    sectionRef: portfolioSectionRef,
  });

  return (
    <div
      ref={portfolioSectionRef}
      className='h-screen w-full flex flex-col min-[320px]:justify-center sm:justify-evenly gap-20 bg-neutral-900 relative'
    >
      {/* Title  */}
      <div
        ref={titleRef}
        className='opacity-0 font-holtwood tracking-wide min-[320px]:text-5xl sm:text-7xl w-full text-center z-10'
      >
        projects
      </div>

      {/* Flowers with staggered positions */}
      {flowerConfigs.map(({ variant, position }, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) flowerRefs.current[i] = el;
          }}
          className={`absolute z-0 scale-0 opacity-0 ${position}`}
        >
          <Flower
            variant={variant}
            size={getFlowerSize({ i, isSmallScreen })}
            delay={0}
            draggable
            opacity
          />
        </div>
      ))}

      {/* FlowingMenu with initial offset */}
      <div className='h-[50vh] translate-y-48 opacity-0' ref={menuRef}>
        <FlowingMenu />
      </div>
    </div>
  );
};

export default PortfolioSection;
