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
import { useFetch, FetchState, useUserInput } from '../hooks';

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
  const { state, update } = useFetch<ApiNetworkSettings>('/api/network', initSettings, 3000);

  return (
    <CardContainer>
      <NetworkStatus state={state} />
      <NetworkSettings state={state} update={update} />
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
        <Label size="s">Network</Label>

        <CardInfoContent>
          <SubLabel size="s">{state.isLoading ? <SkeletonLine /> : state.data.mode.toUpperCase()} </SubLabel>
          <Label size="l">{state.isLoading ? <SkeletonLine /> : state.data.ipv4} </Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface NetworkSettingsProps {
  state: FetchState<ApiNetworkSettings>;
  update: (data: Partial<ApiNetworkSettings>) => void;
}

export const NetworkSettings: React.FC<NetworkSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const [userInput, setInput, clearUserInput] = useUserInput<ApiNetworkSettings>();
  const data = React.useMemo<Partial<ApiNetworkSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);
  const isDhcp = data.mode === 'dhcp';

  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <CardSettingPanel>
          <Radio id="dhcp" checked={isDhcp} value="dhcp" onChange={setInput('mode')}>
            Obain an IP address automatically
          </Radio>

          <Radio id="static" checked={!isDhcp} value="static" onChange={setInput('mode')}>
            Use the following IP address
          </Radio>

          <Space />

          <SubLabel size="xs">IP Address</SubLabel>
          <Input disabled={isDhcp} value={data.ipv4} onChange={setInput('ipv4')} />

          <SubLabel size="xs">Subnet Mask</SubLabel>
          <Input disabled={isDhcp} value={data.subnet} onChange={setInput('subnet')} />

          <SubLabel size="xs">Default Gateway</SubLabel>
          <Input disabled={isDhcp} value={data.gateway} onChange={setInput('gateway')} />

          <Button
            disabled={!userInput}
            onClick={() => {
              update(data);
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
          <Label>Configuration</Label>
          <SubLabel size="s">Static IP Address</SubLabel>
        </CardFooterPanel>

        <ButtonIcon type={expanded ? 'ArrowDown' : 'ArrowUp'} onClick={() => setExpanded(!expanded)} />
      </CardFooter>
    </CardOverlay>
  );
};
