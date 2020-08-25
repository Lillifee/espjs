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

export interface ApiWaveshareSettings {
  host: string;
  updateInterval: number;
}

const initSettings: ApiWaveshareSettings = {
  host: '',
  updateInterval: 60,
};

export const Waveshare: React.FC = () => {
  const { state, update } = useFetch<ApiWaveshareSettings>('/api/waveshare', initSettings, 3000);

  return (
    <CardContainer>
      <WaveshareStatus state={state} />
      <WaveshareSettings state={state} update={update} />
    </CardContainer>
  );
};

export interface WaveshareStatusProps {
  state: FetchState<ApiWaveshareSettings>;
}

export const WaveshareStatus: React.FC<WaveshareStatusProps> = ({ state }) => {
  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Display</Label>
        <CardInfoContent>
          <Label fontSize="s">{state.isLoading ? <SkeletonLine /> : `URL`} </Label>
          <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : `${state.data.host}`} </Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface WaveshareSettingsProps {
  state: FetchState<ApiWaveshareSettings>;
  update: (data: Partial<ApiWaveshareSettings>) => void;
}

export const WaveshareSettings: React.FC<WaveshareSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput] = useUserInput<ApiWaveshareSettings>();

  const data = React.useMemo<Partial<ApiWaveshareSettings>>(() => ({ ...state.data, ...userInput }), [
    state,
    userInput,
  ]);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">Url</SubLabel>
          <Input value={data.host} onChange={setInput('host')} />

          <SubLabel fontSize="xs">Update interval (minutes)</SubLabel>
          <Input value={data.updateInterval} onChange={setInput('updateInterval')} />

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
          <Label>Display</Label>
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
