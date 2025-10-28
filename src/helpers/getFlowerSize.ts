//flower sizes for portfolio section
export const getFlowerSize = ({
  i,
  isSmallScreen,
}: {
  i: number;
  isSmallScreen: boolean;
}) => {
  const baseSizes = [200, 150, 300, 100, 80];
  const smallSizes = [120, 90, 180, 60, 50];
  return isSmallScreen ? smallSizes[i] : baseSizes[i];
};
