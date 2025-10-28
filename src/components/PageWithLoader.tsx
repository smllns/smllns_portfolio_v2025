'use client';

import { ReactNode } from 'react';
import FlowerLoader from '@/components/FlowerLoader';
import { usePageLoader } from '@/hooks/usePageLoader';

type Props = {
  children: ReactNode;
};

export default function PageWithLoader({ children }: Props) {
  const { loading, onLoaded } = usePageLoader();

  return <>{loading ? <FlowerLoader setLoading={onLoaded} /> : children}</>;
}
