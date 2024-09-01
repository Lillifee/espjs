import * as React from 'react';
import {
  Card,
  CardInfo,
  Label,
  CardFooter,
  CardSetting,
  Input,
  CardInfoContent,
  CardContainer,
  CardFooterPanel,
  Button,
  SubLabel,
  CardSettingPanel,
  CardOverlay,
  SkeletonLine,
  Radio,
  Space,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { useFetch, FetchState, onChangeInput } from '../hooks';

export interface ApiNetworkSettings {
  mode: string;
  ipv4: string;
  dns: string;
  subnet: string;
  gateway: string;
}

const initSettings: ApiNetworkSettings = {
  mode: '',
  ipv4: '',
  dns: '',
  subnet: '',
  gateway: '',
};

export const Network: React.FC = () => {
  const [state, update, setInput] = useFetch<ApiNetworkSettings>('/api/network', initSettings, {
    refreshInterval: 3000,
  });

  return (
    <CardContainer>
      <NetworkStatus state={state} />
      <NetworkSettings state={state} update={update} setInput={setInput} />
    </CardContainer>
  );
};

export interface NetworkStatusProps {
  state: FetchState<ApiNetworkSettings>;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({ state }) => {
  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Network</Label>

        <CardInfoContent>
          <SubLabel fontSize="s">{state.isLoading ? <SkeletonLine /> : state.data.mode.toUpperCase()} </SubLabel>
          <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : state.data.ipv4} </Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface NetworkSettingsProps {
  state: FetchState<ApiNetworkSettings>;
  update: (data?: Partial<ApiNetworkSettings>) => void;
  setInput: (data: Partial<ApiNetworkSettings>) => void;
}

export const NetworkSettings: React.FC<NetworkSettingsProps> = ({ state, update, setInput }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const isDhcp = state.data.mode === 'dhcp';

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <Radio id="dhcp" checked={isDhcp} value="dhcp" onChange={onChangeInput(setInput, 'mode')}>
            Obain an IP address automatically
          </Radio>

          <Radio id="static" checked={!isDhcp} value="static" onChange={onChangeInput(setInput, 'mode')}>
            Use the following IP address
          </Radio>

          <Space />

          <SubLabel fontSize="xs">IP Address</SubLabel>
          <Input disabled={isDhcp} value={state.data.ipv4} onChange={onChangeInput(setInput, 'ipv4')} />

          <SubLabel fontSize="xs">Subnet Mask</SubLabel>
          <Input disabled={isDhcp} value={state.data.subnet} onChange={onChangeInput(setInput, 'subnet')} />

          <SubLabel fontSize="xs">Default Gateway</SubLabel>
          <Input disabled={isDhcp} value={state.data.gateway} onChange={onChangeInput(setInput, 'gateway')} />

          <Button disabled={!state.input} onClick={() => update()}>
            Apply
          </Button>
        </CardSettingPanel>
      </CardSetting>

      <CardFooter>
        <RoundIcon type="Settings" />
        <CardFooterPanel>
          <Label>Configuration</Label>
          <SubLabel fontSize="s">Static IP Address</SubLabel>
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
