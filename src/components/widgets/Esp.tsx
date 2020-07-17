import * as React from 'react';
import { CardContainer, Card, CardInfo, CardInfoGrid, CardInfoState } from '../styles';
import { Label, SkeletonLine, SubLabel } from '../styles';
import { useFetch } from '../hooks';
import styled from 'styled-components';

export interface ApiEsp {
  heap: number;
  cupFreq: number;
  sketchSizeFree: number;
  sketchSize: number;
}

const initSettings: ApiEsp = {
  heap: 0,
  cupFreq: 0,
  sketchSize: 0,
  sketchSizeFree: 0,
};

export const CardInfoContentFullStretch = styled.div`
  flex: 1;
  display: flex;
`;

const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

function formatNumber(number: number, unit: string, fractionDigits = 2) {
  const tier = (Math.log10(number) / 3) | 0;
  if (tier == 0) return number;

  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  const scaled = number / scale;
  return `${scaled.toFixed(fractionDigits)} ${suffix}${unit}`;
}

export const Esp: React.FC = () => {
  const { state } = useFetch<ApiEsp>('/api/esp', initSettings, 5000);

  return (
    <CardContainer>
      <Card>
        <CardInfo>
          <Label fontSize="s">Status</Label>

          <CardInfoContentFullStretch>
            <CardInfoGrid>
              <CardInfoState>
                <SubLabel fontSize="s">CPU FREQUENCY</SubLabel>
                <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.cupFreq} Hz`} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel fontSize="s">FREE HEAP</SubLabel>
                <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : formatNumber(state.data.heap, 'B')} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel fontSize="s">FREE SKETCH SIZE</SubLabel>
                <Label fontSize="m">
                  {state.isLoading ? <SkeletonLine /> : formatNumber(state.data.sketchSizeFree, 'B')}
                </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel fontSize="s">SKETCH SIZE</SubLabel>
                <Label fontSize="m">
                  {state.isLoading ? <SkeletonLine /> : formatNumber(state.data.sketchSize, 'B')}{' '}
                </Label>
              </CardInfoState>
            </CardInfoGrid>
          </CardInfoContentFullStretch>
        </CardInfo>
      </Card>
    </CardContainer>
  );
};
