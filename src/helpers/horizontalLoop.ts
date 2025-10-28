import gsap from 'gsap';

export function horizontalLoop(
  items: HTMLElement[],
  config: {
    repeat: number;
    speed: number;
    reversed: boolean;
    paused: boolean;
    gap: number;
  }
) {
  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: 'none' },
  });
  const pixelsPerSecond = (config.speed || 1) * 100;
  const widths: number[] = [];
  const xPercents: number[] = [];
  const startX = items[0].offsetLeft;

  gsap.set(items, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, 'width', 'px') as string
      ));
      xPercents[i] =
        (parseFloat(gsap.getProperty(el, 'x', 'px') as string) / w) * 100;
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const totalWidth =
    items[items.length - 1].offsetLeft +
    (xPercents[items.length - 1] / 100) * widths[items.length - 1] -
    startX +
    items[items.length - 1].offsetWidth +
    (config.gap || 0);

  items.forEach((item, i) => {
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToLoop = item.offsetLeft + curX - startX + widths[i];
    tl.to(
      item,
      {
        xPercent: ((curX - distanceToLoop) / widths[i]) * 100,
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    ).fromTo(
      item,
      {
        xPercent: ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
      },
      {
        xPercent: xPercents[i],
        duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
        immediateRender: false,
      },
      distanceToLoop / pixelsPerSecond
    );
  });

  tl.progress(1, true).progress(0, true);
  if (config.reversed) tl.reverse();
  return tl;
}
