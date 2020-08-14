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

export interface ApiBmeSettings {
  host: string;
  port: number;
  requestInterval: number;
  setupDuration: number;
  requestDuration: number;
  temp: number;
  humidity: number;
  pressure: number;
  gas: number;
  altitude: number;
}

const initSettings: ApiBmeSettings = {
  host: '',
  port: 0,
  requestInterval: 0,
  setupDuration: 0,
  requestDuration: 0,
  temp: 0,
  humidity: 0,
  pressure: 0,
  gas: 0,
  altitude: 0,
};

export const Bme: React.FC = () => {
  const { state, update } = useFetch<ApiBmeSettings>('/api/bme', initSettings, 3000);

  return (
    <CardContainer>
      <BmeStatus state={state} />
      <BmeSettings state={state} update={update} />
    </CardContainer>
  );
};

export interface BmeStatusProps {
  state: FetchState<ApiBmeSettings>;
}

export const BmeStatus: React.FC<BmeStatusProps> = ({ state }) => {
  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Air quality</Label>
        <CardInfoContent>
          <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `Gas`} </Label>
          <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : `${state.data.gas} kΩ`} </Label>
          <Space />
          <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `Humidity`} </Label>
          <Label fontSize="m">{state.isLoading ? <SkeletonLine /> : `${state.data.humidity} %`}</Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface BmeSettingsProps {
  state: FetchState<ApiBmeSettings>;
  update: (data: Partial<ApiBmeSettings>) => void;
}

export const BmeSettings: React.FC<BmeSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput] = useUserInput<ApiBmeSettings>();

  const data = React.useMemo<Partial<ApiBmeSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);

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
