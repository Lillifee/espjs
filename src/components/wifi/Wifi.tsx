import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import {
  Card,
  CardTitle,
  CardInfo,
  Label,
  CardFooter,
  CardSetting,
  Input,
  CardContainer,
  CardFooterPanel,
  Button,
  SkeletonLine,
  SubLabel,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { themePrimary } from '../theme';
import { useFetch, useInterval } from '../hooks';
import { Gauge } from '../common/Gauge';

export interface ApiWifiSettings {
  host?: string;
  password?: string;
  ssid?: string;
}

export interface ApiWifiStatus {
  rssi?: string;
}

export const Wifi: React.FC = () => {
  return (
    <CardContainer>
      <Card>
        <CardTitle>Wifi</CardTitle>
        <WifiStatus />
        <WifiFooter />
      </Card>
    </CardContainer>
  );
};

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
  const [status, isLoading, refresh] = useFetch<ApiWifiStatus>('/api/wifiStatus');
  useInterval(() => refresh(), 5000);

  let signal = 'Unknown';
  let percentage = 0;

  if (status && status.rssi) {
    const rssi = parseInt(status.rssi);
    if (rssi > -90) signal = 'Bad';
    if (rssi > -80) signal = 'Weak';
    if (rssi > -70) signal = 'Fair';
    if (rssi > -60) signal = 'Good';
    if (rssi > -50) signal = 'Excellent';
    percentage = 150 - (5 / 3) * Math.abs(rssi);
  }

  return (
    <ThemeProvider theme={themePrimary}>
      <CardInfo>
        <Label size="s">Signal strength</Label>
        <WifiGauge>
          <Gauge value={percentage} />
          <WifiGaugeDisplay>
            <Label size="s">{isLoading ? <SkeletonLine /> : `${status?.rssi} dBm`} </Label>
            <Label size="l">{isLoading ? <SkeletonLine /> : signal}</Label>
          </WifiGaugeDisplay>
        </WifiGauge>
      </CardInfo>
    </ThemeProvider>
  );
};

export const WifiFooter: React.FC = () => {
  const [wifi, isLoading] = useFetch<ApiWifiSettings>('/api/wifiSettings');
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setUserInput] = React.useState<ApiWifiSettings>();

  const data = userInput || wifi;

  return (
    <React.Fragment>
      <CardFooter>
        <RoundIcon theme={themePrimary} type="Wifi" />

        <CardFooterPanel>
          <Label>{isLoading ? <SkeletonLine /> : wifi?.ssid}</Label>
          <SubLabel size="s">{isLoading ? <SkeletonLine /> : wifi?.host}</SubLabel>
        </CardFooterPanel>

        <ButtonIcon type={expanded ? 'ExpandLess' : 'ExpandMore'} onClick={() => setExpanded(!expanded)} />
      </CardFooter>

      {expanded && (
        <CardSetting>
          <SubLabel size="xs">Host</SubLabel>
          <Input defaultValue={data?.host} onChange={(e) => setUserInput({ ...data, host: e.target.value })} />

          <SubLabel size="xs">SSID</SubLabel>
          <Input defaultValue={data?.ssid} onChange={(e) => setUserInput({ ...data, ssid: e.target.value })} />

          <SubLabel size="xs">Password</SubLabel>
          <Input
            type="Password"
            defaultValue={data?.password}
            onChange={(e) => setUserInput({ ...data, password: e.target.value })}
          />

          <Button theme={themePrimary}>Apply</Button>
          {/* onClick={() => update(data)} */}
        </CardSetting>
      )}
    </React.Fragment>
  );
};
