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
  SliderValue,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { useFetch, FetchState, useUserInput } from '../hooks';
import styled from 'styled-components';

export interface ApiMpuSettings {
  side: number;
  requestDuration: number;
  setupDuration: number;

  duration: number;
  threshold: number;

  host: string;
  port: number;
}

const initSettings: ApiMpuSettings = {
  side: 0,
  requestDuration: 0,
  setupDuration: 0,
  duration: 0,
  threshold: 0,
  host: '',
  port: 0,
};

const sideArray = ['A', 'B', 'C', 'D', 'E', 'F'];

export const Mpu: React.FC = () => {
  const { state, update } = useFetch<ApiMpuSettings>('/api/mpu', initSettings, 3000);

  return (
    <CardContainer>
      <MpuStatus state={state} />
      <MpuSettings state={state} update={update} />
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

export interface MpuStatusProps {
  state: FetchState<ApiMpuSettings>;
}

export const MpuStatus: React.FC<MpuStatusProps> = ({ state }) => {
  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Cube</Label>

        <CardInfoContent>
          <LabelSide fontSize="xl">{state.isLoading ? '#' : sideArray[state.data.side]} </LabelSide>

          <Space />
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

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 1em;
  align-items: center;
  justify-self: center;
  align-self: center;
  flex: 1;
`;

interface SideButtonProps {
  active?: boolean;
}

export const SideButton = styled(Button).attrs<SideButtonProps>((p) => ({
  className: p.active ? 'active' : '',
}))<SideButtonProps>`
  padding: 1.3em 2em;
`;

export interface MpuSettingsProps {
  state: FetchState<ApiMpuSettings>;
  update: (data: Partial<ApiMpuSettings>) => void;
}

export const MpuSettings: React.FC<MpuSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput] = useUserInput<ApiMpuSettings>();

  const data = React.useMemo<Partial<ApiMpuSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">UDP Host</SubLabel>
          <Input value={data.host} onChange={setInput('host')} />

          <SubLabel fontSize="xs">UDP Port</SubLabel>
          <Input value={data.port} onChange={setInput('port')} />

          <Space />
          <Space />

          <SubLabel fontSize="xs">Motion duration (default = 1)</SubLabel>
          <SliderValue min="1" max="100" value={data.duration} onChange={setInput('duration')} />

          <SubLabel fontSize="xs">Motion threshold (default = 20)</SubLabel>
          <SliderValue min="1" max="100" value={data.threshold} onChange={setInput('threshold')} />

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
          <Label>Cube</Label>
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
