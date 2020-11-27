import * as React from 'react';
import { CardContainer, Card, CardInfo, CardInfoContent, Space } from '../styles';
import {
  Label,
  CardFooter,
  CardSetting,
  Input,
  CardFooterPanel,
  Button,
  SkeletonLine,
  SubLabel,
  CardSettingPanel,
  CardOverlay,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { useUserInput, useFetch, FetchState } from '../hooks';
import styled from 'styled-components';
import { Gauge } from '../common';

export interface ApiWifiSettings {
  host: string;
  password: string;
  ssid: string;
  rssi: string;
  time: string;
}

const initSettings: ApiWifiSettings = {
  host: '',
  ssid: '',
  password: '',
  rssi: '-100',
  time: '',
};

export const Wifi: React.FC = () => {
  const { state, update } = useFetch<ApiWifiSettings>('/api/wifi', initSettings, 3000);

  return (
    <CardContainer>
      <WifiStatus state={state} />
      <WifiSettings state={state} update={update} />
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

export interface WifiStatusProps {
  state: FetchState<ApiWifiSettings>;
}

export const WifiStatus: React.FC<WifiStatusProps> = ({ state }) => {
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
    <Card>
      <CardInfo>
        <Label fontSize="s">WIFI</Label>
        <CardInfoContent>
          <WifiGauge>
            <Gauge value={percentage} />
            <WifiGaugeDisplay>
              <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `${state.data.rssi} dBm`} </Label>
              <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : signal}</Label>
            </WifiGaugeDisplay>
          </WifiGauge>

          <Space />

          <SubLabel fontSize="s">CONNECTION</SubLabel>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.time} ms`}</Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface WifiSettingsProps {
  state: FetchState<ApiWifiSettings>;
  update: (data: Partial<ApiWifiSettings>) => void;
}

export const WifiSettings: React.FC<WifiSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput] = useUserInput<ApiWifiSettings>();

  const data = React.useMemo<Partial<ApiWifiSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">Host</SubLabel>
          <Input value={data.host} onChange={setInput('host')} />

          <SubLabel fontSize="xs">SSID</SubLabel>
          <Input value={data.ssid} onChange={setInput('ssid')} />

          <SubLabel fontSize="xs">Password</SubLabel>
          <Input type="Password" value={data.password || ''} onChange={setInput('password')} />

          <Button
            disabled={!userInput}
            onClick={() => {
              userInput && update(userInput);
              clearUserInput();
            }}
          >
            Apply
          </Button>
        </CardSettingPanel>
      </CardSetting>

      <CardFooter>
        <RoundIcon type="Wifi" />

        <CardFooterPanel>
          <Label>{state.isLoading ? <SkeletonLine /> : state.data?.ssid}</Label>
          <SubLabel fontSize="s">{state.isLoading ? <SkeletonLine /> : state.data?.host}</SubLabel>
        </CardFooterPanel>

        <ButtonIcon
          disabled={state.isLoading}
          type={expanded ? 'ArrowDown' : 'ArrowUp'}
          onClick={() => setExpanded(!expanded)}
        />
      </CardFooter>
    </CardOverlay>
  );
};
