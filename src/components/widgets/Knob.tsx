import * as React from 'react';
import {
  Card,
  CardInfo,
  Label,
  CardFooter,
  CardSetting,
  Input,
  CardContainer,
  CardFooterPanel,
  Button,
  SubLabel,
  CardSettingPanel,
  CardOverlay,
  SkeletonLine,
  CardInfoContent,
  Space,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { useFetch, FetchState, useUserInput } from '../hooks';
import styled from 'styled-components';
import { WifiGauge, WifiGaugeDisplay } from './Wifi';
import { Gauge } from '../common';

export interface ApiKnobSettings {
  value: number;
  host: string;
  port: number;
  requestDuration: number;
  setupDuration: number;
}

const initSettings: ApiKnobSettings = {
  value: 0,
  requestDuration: 0,
  setupDuration: 0,
  host: '',
  port: 0,
};

export const Knob: React.FC = () => {
  const { state, update } = useFetch<ApiKnobSettings>('/api/knob', initSettings, 1000);

  return (
    <CardContainer>
      <KnobStatus state={state} />
      <KnobSettings state={state} update={update} />
    </CardContainer>
  );
};

const LabelSide = styled(Label)`
  display: flex;
  background: ${(props) => props.theme.PrimarySubBackground};
  color: ${(props) => props.theme.PrimarySubForeground};
  border-radius: 10px;

  width: 4em;
  height: 4em;

  justify-content: center;
  align-items: center;
`;

export interface KnobStatusProps {
  state: FetchState<ApiKnobSettings>;
}

export const KnobStatus: React.FC<KnobStatusProps> = ({ state }) => {
  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Knob</Label>

        <CardInfoContent>
          <WifiGauge>
            <Gauge value={state.data.value} />
            <WifiGaugeDisplay>
              <Label fontSize="s">VALUE</Label>
              <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : `${state.data.value}`}</Label>
            </WifiGaugeDisplay>
          </WifiGauge>

          <Space />

          <SubLabel fontSize="s">SETUP</SubLabel>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.setupDuration} ms`} </Label>

          <Space />

          <SubLabel fontSize="s">REQUEST</SubLabel>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.requestDuration} ms`} </Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface KnobSettingsProps {
  state: FetchState<ApiKnobSettings>;
  update: (data: Partial<ApiKnobSettings>) => void;
}

export const KnobSettings: React.FC<KnobSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput] = useUserInput<ApiKnobSettings>();

  const data = React.useMemo<Partial<ApiKnobSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">UDP Host</SubLabel>
          <Input value={data.host} onChange={setInput('host')} />

          <SubLabel fontSize="xs">UDP Port</SubLabel>
          <Input value={data.port} onChange={setInput('port')} />

          <Space />

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
        <RoundIcon type="Settings" />
        <CardFooterPanel>
          <Label>Knob</Label>
          <SubLabel fontSize="s">Configuration</SubLabel>
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
