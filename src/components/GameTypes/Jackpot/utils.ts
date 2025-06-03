
export const getSlotSize = (): number => {
  const containerWidth = window.innerWidth || 400;
  if (containerWidth < 350) return 50;
  if (containerWidth < 500) return 60;
  return 70;
};

export const getSlotGap = (slotSize: number): number => {
  return Math.max(8, slotSize * 0.15);
};
