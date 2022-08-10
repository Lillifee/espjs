import * as React from 'react';
import {
  CardContainer,
  Card,
  CardInfo,
  CardInfoGrid,
  CardInfoState,
  CardInfoContentStretch,
  SliderValue,
} from '../styles';
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

export interface ApiBsecSettings {
  host: string;
  port: number;
  requestInterval: number;
  setupDuration: number;
  requestDuration: number;
  tempOffset: number;
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
  tempOffset: 0,
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
  const [state, update, setInput] = useFetch<ApiBsecSettings>('/api/bsec', initSettings, { refreshInterval: 3000 });

  return (
    <CardContainer>
      <BsecStatus state={state} />
      <BsecSettings state={state} update={update} setInput={setInput} />
    </CardContainer>
  );
};

export interface BsecStatusProps {
  state: FetchState<ApiBsecSettings>;
}

export const BsecStatus: React.FC<BsecStatusProps> = ({ state }) => {
  let quality = 'Unknown';

  const iaq = state.data.iaq;
  if (iaq > 350) quality = 'Extremly polluted';
  if (iaq < 350) quality = 'Really bad';
  if (iaq < 250) quality = 'Bad';
  if (iaq < 200) quality = 'Moderate';
  if (iaq < 150) quality = 'Fair';
  if (iaq < 100) quality = 'Good';
  if (iaq < 50) quality = 'Excellent';

  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Air quality</Label>

        <CardInfoContentStretch>
          <CardInfoGrid>
            <CardInfoState>
              <SubLabel fontSize="s">QUALITY</SubLabel>
              <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : quality} </Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">IAQ</SubLabel>
              <Label fontSize="l">
                {state.isLoading ? <SkeletonLine /> : `${state.data.iaq.toFixed(0)} / ${state.data.iaqAccuracy}`}{' '}
              </Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">TEMPERATURE</SubLabel>
              <Label fontSize="m">
                {state.isLoading ? <SkeletonLine /> : `${state.data.temperature.toFixed(2)} °C`}
              </Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">HUMIDITY</SubLabel>
              <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.humidity.toFixed(2)} %`}</Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">CO2eq</SubLabel>
              <Label fontSize="m">
                {state.isLoading ? <SkeletonLine /> : `${state.data.co2Equivalent.toFixed()} ppm`}
              </Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">bVOCeq</SubLabel>
              <Label fontSize="m">
                {state.isLoading ? <SkeletonLine /> : `${state.data.breathVocEquivalent.toFixed(2)} ppm`}
              </Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">Pressure</SubLabel>
              <Label fontSize="m">
                {state.isLoading ? <SkeletonLine /> : `${(state.data.pressure / 100).toFixed(2)} hPa`}{' '}
              </Label>
            </CardInfoState>

            <CardInfoState>
              <SubLabel fontSize="s">GAS</SubLabel>
              <Label fontSize="m">
                {state.isLoading ? <SkeletonLine /> : `${(state.data.gasResistance / 1000).toFixed(3)} kΩ`}{' '}
              </Label>
            </CardInfoState>
          </CardInfoGrid>
        </CardInfoContentStretch>
      </CardInfo>
    </Card>
  );
};

export interface BsecSettingsProps {
  state: FetchState<ApiBsecSettings>;
  update: (data?: Partial<ApiBsecSettings>) => void;
  setInput: (data: Partial<ApiBsecSettings>) => void;
}

export const BsecSettings: React.FC<BsecSettingsProps> = ({ state, update, setInput }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">Temperature Offset</SubLabel>
          <SliderValue
            min="0"
            max="20"
            step={0.2}
            value={state.data.tempOffset}
            onChange={onChangeInput(setInput, 'tempOffset')}
          />

          <SubLabel fontSize="xs">UDP Host</SubLabel>
          <Input value={state.data.host} onChange={onChangeInput(setInput, 'host')} />

          <SubLabel fontSize="xs">UDP Port</SubLabel>
          <Input value={state.data.port} onChange={onChangeInput(setInput, 'port')} />

          <SubLabel fontSize="xs">Send interval (ms)</SubLabel>
          <Input value={state.data.requestInterval} onChange={onChangeInput(setInput, 'requestInterval')} />

          <Button disabled={!state.input} onClick={() => update()}>
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
