import * as React from 'react';
import { CardContainer, Card, CardInfo, CardInfoContent } from '../styles';
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

export interface ApiWaveshareSettings {
  host: string;
  user: string;
  password: string;
  updateInterval: number;
}

const initSettings: ApiWaveshareSettings = {
  host: '',
  user: '',
  password: '',
  updateInterval: 60,
};

export const Waveshare: React.FC = () => {
  const [state, update, setInput] = useFetch<ApiWaveshareSettings>('/api/waveshare', initSettings, {
    refreshInterval: 3000,
  });

  return (
    <CardContainer>
      <WaveshareStatus state={state} />
      <WaveshareSettings state={state} update={update} setInput={setInput} />
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
  update: (data?: Partial<ApiWaveshareSettings>) => void;
  setInput: (data: Partial<ApiWaveshareSettings>) => void;
}

export const WaveshareSettings: React.FC<WaveshareSettingsProps> = ({ state, update, setInput }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <SubLabel fontSize="xs">Url</SubLabel>
          <Input value={state.data.host} onChange={onChangeInput(setInput, 'host')} />

          <SubLabel fontSize="xs">User</SubLabel>
          <Input value={state.data.user} onChange={onChangeInput(setInput, 'user')} />

          <SubLabel fontSize="xs">Password</SubLabel>
          <Input type="Password" value={state.data.password} onChange={onChangeInput(setInput, 'password')} />

          <SubLabel fontSize="xs">Update interval (minutes)</SubLabel>
          <Input value={state.data.updateInterval} onChange={onChangeInput(setInput, 'updateInterval')} />

          <Button disabled={!state.input} onClick={() => update()}>
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
