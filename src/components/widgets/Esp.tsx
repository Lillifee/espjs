import * as React from 'react';
import { CardContainer, Card, CardInfo } from '../styles';
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

const CardInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 0.1em;
  align-items: center;
  flex: 1;
`;

const CardInfoState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const EspCardInfo = styled.div`
  display: flex;
  flex: 1;
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
          <Label size="s">Status</Label>

          <EspCardInfo>
            <CardInfoGrid>
              <CardInfoState>
                <SubLabel size="s">CPU FREQUENCY</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : `${state.data.cupFreq} Hz`} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel size="s">FREE HEAP</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : formatNumber(state.data.heap, 'B')} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel size="s">FREE SKETCH SIZE</SubLabel>
                <Label size="l">
                  {state.isLoading ? <SkeletonLine /> : formatNumber(state.data.sketchSizeFree, 'B')}
                </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel size="s">SKETCH SIZE</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : formatNumber(state.data.sketchSize, 'B')} </Label>
              </CardInfoState>
            </CardInfoGrid>
          </EspCardInfo>
        </CardInfo>
      </Card>
    </CardContainer>
  );
};
