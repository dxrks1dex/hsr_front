import React from "react";

interface Props {
  elementRef: React.MutableRefObject<HTMLDivElement | null>;
  isElementVisible: boolean;
}

export const isElementOutOfPage = ({
  elementRef,
  isElementVisible,
}: Props): boolean => {
  const tooltipElement = elementRef.current;

  if (isElementVisible && tooltipElement) {
    const windowWidth = window.innerWidth - 1000;
    const tooltipRect = tooltipElement.getBoundingClientRect();

    if (tooltipRect.right > windowWidth) {
      return true;
    }
  }

  return false;
};
