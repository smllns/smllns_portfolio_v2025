// clicks on AnimatedButton
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleButtonClick = (text: string, router: AppRouterInstance) => {
  if (text === 'LinkedIn') {
    window.open('https://www.linkedin.com/in/smllns/', '_blank');
  } else if (text === 'GitHub') {
    window.open('https://github.com/smllns', '_blank');
  } else if (text === '←') {
    const animate = window.pageTransition;
    if (animate) animate('/');
    else router.push('/');
  } else if (text === 'Email') {
    window.location.href = 'mailto:marysmoly@gmail.com';
  }
};
