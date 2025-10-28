// flower info in portfolio section
import { FlowerVariant } from '@/components/Flower';

export interface FlowerConfig {
  variant: FlowerVariant;
  position: string;
}

export const flowerConfigs: FlowerConfig[] = [
  {
    variant: 'two',
    position: 'top-15 sm:left-15 min-[320px]:left-5',
  },
  {
    variant: 'one',
    position: 'top-15 sm:right-15 min-[320px]:right-0',
  },
  {
    variant: 'one',
    position: 'sm:top-25 min-[320px]:top-48 sm:left-70 min-[320px]:left-50',
  },
  {
    variant: 'three',
    position: 'top-5 sm:left-50 min-[320px]:left-35',
  },
  {
    variant: 'four',
    position: 'sm:top-15 min-[320px]:top-20 sm:left-2/3 min-[320px]:left-1/2',
  },
];
