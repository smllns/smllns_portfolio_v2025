import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

type ProjectFeaturesAnimationProps = {
  sectionRef: React.RefObject<HTMLDivElement | null>;
};

export function useProjectFeaturesScrollAnimations({
  sectionRef,
}: ProjectFeaturesAnimationProps) {
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const heading = section.querySelector('[data-features-heading]');
      const title = section.querySelector('[data-features-title]');
      const description = section.querySelector('[data-features-description]');
      const footer = section.querySelector('[data-features-footer]');

      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-feature-card]',
        section,
      );

      // Background transition — unchanged.
      gsap.to(section, {
        backgroundColor: '#f5f5f5',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 35%',
          end: 'top 30%',
          scrub: 1,
        },
      });

      // Header In — heading from the left, description from the right.
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 25%',
          end: 'top 15%',
          scrub: 1,
        },
      });

      if (heading && title) {
        headerTimeline
          .fromTo(
            heading,
            { x: -200, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out' },
          )
          .fromTo(
            title,
            { x: -200, opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out' },
            '-=0.7',
          );
      }

      if (description) {
        headerTimeline.fromTo(
          description,
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0,
        );
      }

      // Cards — reveal each row independently.
      mm.add(
        {
          desktop: '(min-width: 1024px)',
          tablet: '(min-width: 640px) and (max-width: 1023px)',
          mobile: '(max-width: 639px)',
        },
        () => {
          // Sort cards by their vertical position.
          const sortedCards = [...cards].sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          );

          // Group cards into rows.
          const rows: HTMLElement[][] = [];

          sortedCards.forEach((card) => {
            const top = card.getBoundingClientRect().top;
            const currentRow = rows[rows.length - 1];

            if (
              !currentRow ||
              Math.abs(currentRow[0].getBoundingClientRect().top - top) > 10
            ) {
              rows.push([card]);
            } else {
              currentRow.push(card);
            }
          });

          rows.forEach((row, rowIndex) => {
            const getStartPosition = () => {
              const rowHeight = Math.max(
                ...row.map((card) => card.offsetHeight),
              );

              const visiblePosition = window.innerHeight - rowHeight * 0.25;

              return `top ${visiblePosition}px`;
            };

            // Card entrance animation.
            const rowTimeline = gsap.timeline({
              paused: true,
            });

            rowTimeline.fromTo(
              row,
              {
                scale: 0.15,
                transformOrigin: '50% 80%',
              },
              {
                scale: 1,
                duration: 1.5,
                stagger: 0.15,
                ease: 'elastic.out(1, 0.6)',
              },
            );

            rowTimeline.fromTo(
              row,
              {
                y: 40,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
              },
              0,
            );

            // Normal entrance and reverse when scrolling back down the page.
            ScrollTrigger.create({
              trigger: row[0],
              start: getStartPosition,

              onEnter: () => {
                rowTimeline.timeScale(1).play();
              },

              onLeaveBack: () => {
                rowTimeline.timeScale(1.6).reverse();
              },
            });

            // Only the last row disappears when its top reaches 30%.
            if (rowIndex === rows.length - 1) {
              ScrollTrigger.create({
                trigger: row[0],
                start: 'top 30%',

                onEnter: () => {
                  rowTimeline.timeScale(1.6).reverse();
                },

                onLeaveBack: () => {
                  rowTimeline.timeScale(1).play();
                },
              });

              // Footer starts moving only when the last row reaches 30%.
              if (footer) {
                gsap.fromTo(
                  footer,
                  {
                    y: 0,
                  },
                  {
                    y: () => window.innerHeight * 0.45,
                    ease: 'none',
                    scrollTrigger: {
                      trigger: row[0],
                      start: 'top 30%',
                      end: 'top top',
                      scrub: 1,
                      invalidateOnRefresh: true,
                    },
                  },
                );
              }
            }
          });
        },
      );
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [sectionRef]);
}
