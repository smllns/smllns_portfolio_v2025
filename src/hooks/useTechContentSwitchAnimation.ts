import gsap from 'gsap';

export const useTechContentSwitchAnimation = (
  titleRef: React.RefObject<HTMLHeadingElement | null>,
  descRef: React.RefObject<HTMLParagraphElement | null>,
  cardRef: React.RefObject<HTMLDivElement | null>,
  activeIndex: number | null,
  setActiveIndex: (index: number) => void
) => {
  const handleTechChange = (index: number) => {
    // Mobile: open drawer
    if (window.innerWidth < 640) {
      setActiveIndex(index);
      return true; // Signal drawer should open
    }

    // Desktop: animate content switch
    if (index === activeIndex) return false;

    const title = titleRef.current;
    const desc = descRef.current;
    const card = cardRef.current;
    if (!title || !desc || !card) return false;

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

    tl.to([title, desc], {
      opacity: 0,
      y: -15,
      filter: 'blur(10px)',
      duration: 0.4,
      stagger: 0.05,
    })
      .add(() => {
        setActiveIndex(index);
        gsap.set([title, desc], {
          y: 20,
          opacity: 0,
          filter: 'blur(8px)',
        });
      })
      .to([title, desc], {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.1,
      });

    return false;
  };

  return handleTechChange;
};
