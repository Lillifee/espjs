import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { CardInfo, Label, SkeletonLine } from '../styles';
import { themePrimary } from '../theme';
import { useFetch } from '../hooks';
import { Gauge } from '../common/Gauge';

export interface ApiWifiStatus {
  rssi: string;
}

export const WifiGauge = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const WifiGaugeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 1em;
  z-index: 5;
`;

export const WifiStatus: React.FC = () => {
  const { state } = useFetch<ApiWifiStatus>('/api/wifiStatus', { rssi: '-100' }, 3000);

  let signal = 'Unknown';
  let percentage = 0;

  const rssi = parseInt(state.data.rssi);
  if (rssi > -90) signal = 'Bad';
  if (rssi > -80) signal = 'Weak';
  if (rssi > -70) signal = 'Fair';
  if (rssi > -60) signal = 'Good';
  if (rssi > -50) signal = 'Excellent';
  percentage = 150 - (5 / 3) * Math.abs(rssi);

  return (
    <ThemeProvider theme={themePrimary}>
      <CardInfo>
        <Label size="s">Signal strength</Label>
        <WifiGauge>
          <Gauge value={percentage} />
          <WifiGaugeDisplay>
            <Label size="s">{state.isLoading ? <SkeletonLine /> : `${state.data.rssi} dBm`} </Label>
            <Label size="l">{state.isLoading ? <SkeletonLine /> : signal}</Label>
          </WifiGaugeDisplay>
        </WifiGauge>
      </CardInfo>
    </ThemeProvider>
  );
};
