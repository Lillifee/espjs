import * as React from 'react';
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
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { themePrimary } from '../theme';
import { useUserInput, useFetch } from '../hooks';

export interface ApiWifiSettings {
  host: string;
  password: string;
  ssid: string;
}

export const WifiSettings: React.FC = () => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const { state, update } = useFetch<ApiWifiSettings>('/api/wifi', { host: '', ssid: '', password: '' });
  const [userInput, setInput, clearUserInput] = useUserInput<ApiWifiSettings>();

  const data = React.useMemo<Partial<ApiWifiSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);

  return (
    <React.Fragment>
      <CardFooter>
        <RoundIcon theme={themePrimary} type="Wifi" />

        <CardFooterPanel>
          <Label>{state.isLoading ? <SkeletonLine /> : state.data?.ssid}</Label>
          <SubLabel size="s">{state.isLoading ? <SkeletonLine /> : state.data?.host}</SubLabel>
        </CardFooterPanel>

        <ButtonIcon type={expanded ? 'ExpandLess' : 'ExpandMore'} onClick={() => setExpanded(!expanded)} />
      </CardFooter>

      {expanded && (
        <CardSetting>
          <CardSettingPanel>
            <SubLabel size="xs">Host</SubLabel>
            <Input value={data.host} onChange={setInput('host')} />

            <SubLabel size="xs">SSID</SubLabel>
            <Input value={data.ssid} onChange={setInput('ssid')} />

            <SubLabel size="xs">Password</SubLabel>
            <Input type="Password" value={data.password} onChange={setInput('password')} />
          </CardSettingPanel>

          {userInput && (
            <Button
              disabled={!userInput}
              theme={themePrimary}
              onClick={() => {
                userInput && update(userInput);
                clearUserInput();
              }}
            >
              Apply
            </Button>
          )}
        </CardSetting>
      )}
    </React.Fragment>
  );
};
