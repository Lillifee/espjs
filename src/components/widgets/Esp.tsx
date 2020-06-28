import * as React from 'react';
import { CardContainer, Card, CardInfo } from '../styles';
import { Label, SkeletonLine, SubLabel } from '../styles';
import { useFetch } from '../hooks';
import styled from 'styled-components';

export interface ApiEsp {
  heap: number;
  cupFreq: number;
  chipRevision: number;
  sketchSize: number;
}

const initSettings: ApiEsp = {
  heap: 0,
  cupFreq: 0,
  chipRevision: 0,
  sketchSize: 0,
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

export const Esp: React.FC = () => {
  const { state } = useFetch<ApiEsp>('/api/esp', initSettings);

  return (
    <CardContainer>
      <Card>
        <CardInfo>
          <Label size="s">Status</Label>

          <EspCardInfo>
            <CardInfoGrid>
              <CardInfoState>
                <SubLabel size="s">CPU FREQUENCY</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : state.data.cupFreq} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel size="s">CHIP REVISION</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : state.data.chipRevision} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel size="s">HEAP</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : state.data.heap} </Label>
              </CardInfoState>

              <CardInfoState>
                <SubLabel size="s">SKETCH SIZE</SubLabel>
                <Label size="l">{state.isLoading ? <SkeletonLine /> : state.data.sketchSize} </Label>
              </CardInfoState>
            </CardInfoGrid>
          </EspCardInfo>
        </CardInfo>
      </Card>
    </CardContainer>
  );
};
