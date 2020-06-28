import * as React from 'react';
import styled from 'styled-components';

const GaugeWrapper = styled.div`
  align-self: center;
`;

const Mask = styled.div`
  position: relative;
  overflow: hidden;

  display: block;
  width: 200px;
  height: 100px;
  margin: 20px;
`;

const SemiCircle = styled.div`
  position: relative;

  display: block;
  width: 200px;
  height: 100px;

  background: ${({ theme }) => theme.PrimaryBackground};

  border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;

  &::before {
    content: '';

    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 2;

    display: block;
    width: 160px;
    height: 80px;
    margin-left: -80px;

    background: ${({ theme }) => theme.Background};
    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
`;

interface SemiCircleMaskProps {
  degree: number;
}

const SemiCircleMask = styled.div<SemiCircleMaskProps>`
  position: absolute;
  top: 0;
  left: 0;

  width: 200px;
  height: 200px;

  background: transparent;

  transform: rotate(${({ degree }) => degree}deg) translate3d(0, 0, 0);
  transform-origin: center center;
  backface-visibility: hidden;
  transition: all 0.3s ease-in-out;

  &::before {
    content: '';

    position: absolute;
    top: 0;
    left: 0%;
    z-index: 2;

    display: block;
    width: 202px;
    height: 102px;
    margin: -1px 0 0 -1px;

    background: ${({ theme }) => theme.HighlightBackground};

    border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
  }
`;

export interface GaugeProps {
  value: number;
}

export const Gauge: React.FC<GaugeProps> = ({ value }) => {
  const degree = Math.min(180, Math.max(0, value * 1.8));
  return (
    <GaugeWrapper>
      <Mask>
        <SemiCircle />
        <SemiCircleMask degree={degree} />
      </Mask>
    </GaugeWrapper>
  );
};
