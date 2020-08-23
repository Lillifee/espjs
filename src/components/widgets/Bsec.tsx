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
import styled from 'styled-components';
import { RoundIcon, ButtonIcon } from '../Icons';
import { useUserInput, useFetch, FetchState } from '../hooks';
import { Gauge } from '../common';

export interface ApiBsecSettings {
  host: string;
  port: number;
  requestInterval: number;
  setupDuration: number;
  requestDuration: number;
  rtmp: number;
  pressure: number;
  rawHumidity: number;
  gasResistance: number;
  iaq: number;
  iaqAccuracy: number;
  temperature: number;
  humidity: number;
  staticIaq: number;
  co2Equivalent: number;
  breathVocEquivalent: number;
}

const initSettings: ApiBsecSettings = {
  host: '',
  port: 0,
  requestInterval: 0,
  setupDuration: 0,
  requestDuration: 0,
  rtmp: 0,
  pressure: 0,
  rawHumidity: 0,
  gasResistance: 0,
  iaq: 0,
  iaqAccuracy: 0,
  temperature: 0,
  humidity: 0,
  staticIaq: 0,
  co2Equivalent: 0,
  breathVocEquivalent: 0,
};

export const Bsec: React.FC = () => {
  const { state, update } = useFetch<ApiBsecSettings>('/api/bsec', initSettings, 3000);

  return (
    <CardContainer>
      <BsecStatus state={state} />
      <BsecSettings state={state} update={update} />
    </CardContainer>
  );
};

export const BsecGauge = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const BsecGaugeGaugeDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 1em;
  z-index: 5;
`;

export interface BsecStatusProps {
  state: FetchState<ApiBsecSettings>;
}

export const BsecStatus: React.FC<BsecStatusProps> = ({ state }) => {
  let quality = 'Unknown';

  const iaq = state.data.iaq;
  if (iaq > 350) quality = 'Extremly polluted';
  if (iaq < 350) quality = 'Severely polluted';
  if (iaq < 250) quality = 'Heavily polluted';
  if (iaq < 200) quality = 'Moderately polluted';
  if (iaq < 150) quality = 'Lightly polluted';
  if (iaq < 100) quality = 'Good';
  if (iaq < 50) quality = 'Excellent';

  const percentage = Math.min(iaq, 400) / 4;

  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Air quality</Label>

        <CardInfoContent>
          <BsecGauge>
            <Gauge value={percentage} />
            <BsecGaugeGaugeDisplay>
              <Label fontSize="s">
                {state.isLoading ? <SkeletonLine /> : `${iaq.toFixed(2)} / ${state.data.iaqAccuracy}`}
              </Label>
              <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : quality}</Label>
            </BsecGaugeGaugeDisplay>
          </BsecGauge>

          <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `Gas`} </Label>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.gasResistance} kΩ`} </Label>

          <Space />

          <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `Humidity`} </Label>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.humidity.toFixed(2)} %`}</Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface BsecSettingsProps {
  state: FetchState<ApiBsecSettings>;
  update: (data: Partial<ApiBsecSettings>) => void;
}

export const BsecSettings: React.FC<BsecSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput] = useUserInput<ApiBsecSettings>();

  const data = React.useMemo<Partial<ApiBsecSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">UDP Host</SubLabel>
          <Input value={data.host} onChange={setInput('host')} />

          <SubLabel fontSize="xs">UDP Port</SubLabel>
          <Input value={data.port} onChange={setInput('port')} />

          <SubLabel fontSize="xs">Send interval (ms)</SubLabel>
          <Input value={data.requestInterval} onChange={setInput('requestInterval')} />

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
        <RoundIcon type="Cloud" />

        <CardFooterPanel>
          <Label>Air quality</Label>
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
