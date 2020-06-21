import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Card,
  CardTitle,
  CardInfo,
  LabelS,
  LabelXL,
  Label,
  CardFooter,
  SubLabelS,
  SubLabelXS,
  CardSetting,
  Input,
  CardContainer,
  CardFooterPanel,
  Button,
  SkeletonLine,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { themePrimary } from '../theme';
import { useFetch, useInterval } from '../hooks';

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

export const WifiStatus: React.FC = () => {
  const [status, isLoading, refresh] = useFetch<ApiWifiStatus>('/api/wifiStatus');
  useInterval(() => refresh(), 5000);

  let signal = 'Unknown';
  if (status && status.rssi) {
    const rssi = parseInt(status.rssi);
    if (rssi > -90) signal = 'Bad';
    if (rssi > -80) signal = 'Weak';
    if (rssi > -70) signal = 'Fair';
    if (rssi > -60) signal = 'Good';
    if (rssi > -50) signal = 'Excellent';
  }

  return (
    <ThemeProvider theme={themePrimary}>
      <CardInfo>
        <LabelS>{isLoading ? <SkeletonLine /> : 'Signal strength'}</LabelS>
        <LabelXL>{isLoading ? <SkeletonLine /> : signal}</LabelXL>
        <Label>{isLoading ? <SkeletonLine /> : `${status?.rssi} dBm`} </Label>
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
          <SubLabelS>{isLoading ? <SkeletonLine /> : wifi?.host}</SubLabelS>
        </CardFooterPanel>

        <ButtonIcon type={expanded ? 'ExpandLess' : 'ExpandMore'} onClick={() => setExpanded(!expanded)} />
      </CardFooter>

      {expanded && (
        <CardSetting>
          <SubLabelXS>Host</SubLabelXS>
          <Input defaultValue={data?.host} onChange={(e) => setUserInput({ ...data, host: e.target.value })} />

          <SubLabelXS>SSID</SubLabelXS>
          <Input defaultValue={data?.ssid} onChange={(e) => setUserInput({ ...data, ssid: e.target.value })} />

          <SubLabelXS>Password</SubLabelXS>
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
