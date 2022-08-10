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
import { useFetch, FetchState, onChangeInput } from '../hooks';
import styled from 'styled-components';
import { Gauge } from '../common';

export interface ApiCo2Settings {
  host: string;
  port: number;
  autoCalibration: boolean;
  requestInterval: number;
  setupDuration: number;
  requestDuration: number;
  co2: number;
  temp: number;
}

const initSettings: ApiCo2Settings = {
  host: '',
  port: 0,
  autoCalibration: false,
  requestInterval: 0,
  setupDuration: 0,
  requestDuration: 0,
  co2: 0,
  temp: 0,
};

export const Co2: React.FC = () => {
  const [state, update, setInput] = useFetch<ApiCo2Settings>('/api/co2', initSettings, { refreshInterval: 3000 });

  return (
    <CardContainer>
      <Co2Status state={state} />
      <Co2Settings state={state} update={update} setInput={setInput} />
    </CardContainer>
  );
};

export const Co2Gauge = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Co2GaugeGaugeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 1em;
  z-index: 5;
`;

export interface Co2StatusProps {
  state: FetchState<ApiCo2Settings>;
}

export const Co2Status: React.FC<Co2StatusProps> = ({ state }) => {
  let quality = 'Unknown';

  const co2 = state.data.co2;
  if (co2 < 2100) quality = 'Bad';
  if (co2 < 1500) quality = 'Mediocre';
  if (co2 < 1000) quality = 'Fair';
  if (co2 < 800) quality = 'Good';
  if (co2 < 600) quality = 'Excelent';

  const percentage = (co2 - 400) / 16;

  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">CO2</Label>
        <CardInfoContent>
          <Co2Gauge>
            <Gauge value={percentage} />
            <Co2GaugeGaugeDisplay>
              <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `${co2} ppm`} </Label>
              <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : quality}</Label>
            </Co2GaugeGaugeDisplay>
          </Co2Gauge>

          <Space />
          <SubLabel fontSize="s">TEMPERATURE</SubLabel>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.temp.toFixed(2)} °C`}</Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface Co2SettingsProps {
  state: FetchState<ApiCo2Settings>;
  update: (data?: Partial<ApiCo2Settings>) => void;
  setInput: (data: Partial<ApiCo2Settings>) => void;
}

export const Co2Settings: React.FC<Co2SettingsProps> = ({ state, update, setInput }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">UDP Host</SubLabel>
          <Input value={state.data.host} onChange={onChangeInput(setInput, 'host')} />

          <SubLabel fontSize="xs">UDP Port</SubLabel>
          <Input value={state.data.port} onChange={onChangeInput(setInput, 'port')} />

          <SubLabel fontSize="xs">Send interval (ms)</SubLabel>
          <Input value={state.data.requestInterval} onChange={onChangeInput(setInput, 'requestInterval')} />

          <Button onClick={() => fetch('/api/co2Calibrate').then()}>Calibrate (400ppm)</Button>

          <Button disabled={!state.input} onClick={() => update()}>
            Apply
          </Button>
        </CardSettingPanel>
      </CardSetting>

      <CardFooter>
        <RoundIcon type="Cloud" />

        <CardFooterPanel>
          <Label>CO2</Label>
          <SubLabel fontSize="s">{state.isLoading ? <SkeletonLine /> : `Configuration`}</SubLabel>
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
