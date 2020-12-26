import * as React from 'react';
import {
  CardContainer,
  Card,
  CardInfo,
  CardInfoContent,
  SliderValue,
  Radio,
  Space,
  Slider,
  CardInfoGrid,
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
import styled, { css } from 'styled-components';
import { RoundIcon, ButtonIcon } from '../Icons';
import { useUserInput, useFetch, FetchState } from '../hooks';

export interface ApiLedSettings {
  brightness: number;
  mode: number;
  color: number;
  min: number;
  max: number;
  initHue: number;
  deltaHue: number;
  endHue: number;
  value: number;
  animation: number;
}

const initSettings: ApiLedSettings = {
  brightness: 0,
  mode: 0,
  color: 0,
  min: 0,
  max: 0,
  initHue: 0,
  deltaHue: 0,
  endHue: 0,
  value: 0,
  animation: 0,
};

export const Led: React.FC = () => {
  const { state, update } = useFetch<ApiLedSettings>('/api/led', initSettings, 10000, false);

  return (
    <CardContainer>
      <LedStatus state={state} />
      <LedSettings state={state} update={update} />
    </CardContainer>
  );
};

export interface LedStatusProps {
  state: FetchState<ApiLedSettings>;
}

const getModeText = (mode: number) => {
  switch (mode) {
    case 0:
      return 'Rainbow';
    case 1:
      return 'Solid';
    case 2:
      return 'Color change';
    default:
      break;
  }
};

const getAnimationText = (animation: number) => {
  switch (animation) {
    case 0:
      return 'Off';
    case 1:
      return 'Rainbow';
    case 2:
      return 'Rainbow stripe';
    case 3:
      return 'Cloud';
    case 4:
      return 'Party';
    case 5:
      return 'Ocean';
    case 6:
      return 'Heat';
    case 7:
      return 'Forest';
    case 8:
      return 'Lava';
    default:
      break;
  }
};

export const LedStatus: React.FC<LedStatusProps> = ({ state }) => {
  const mode = getModeText(state.data.mode);

  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">LED ring</Label>
        <CardInfoContent>
          <SubLabel fontSize="s">MODE</SubLabel>
          <Label fontSize="l">{state.isLoading ? <SkeletonLine /> : mode} </Label>
          <Space />
          <SubLabel fontSize="s">Brightness</SubLabel>
          <Label fontSize="m">
            {state.isLoading ? <SkeletonLine /> : state.data.brightness === -1 ? 'Auto' : state.data.brightness}
          </Label>
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};

export interface LedSettingsProps {
  state: FetchState<ApiLedSettings>;
  update: (data: Partial<ApiLedSettings>) => void;
}

function hexToVbColor(colorString: string) {
  const color = colorString.replace('#', '');
  const bbggrr = color.substr(0, 2) + color.substr(2, 2) + color.substr(4, 2);
  return parseInt(bbggrr, 16);
}

function vbColorToHEX(colorNumber?: number) {
  if (!colorNumber) return '#000000';
  const bbggrr = ('000000' + colorNumber.toString(16)).slice(-6);
  const rrggbb = bbggrr.substr(0, 2) + bbggrr.substr(2, 2) + bbggrr.substr(4, 2);
  return '#' + rrggbb;
}

const HueSlider = styled(Slider)`
  flex: 0 0 auto;
  background: linear-gradient(
    90deg,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
`;

const activeCss = css`
  border-bottom: 3px solid ${(p) => p.theme.PrimaryBackground};
`;

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabPanel = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
`;

export const TabButton = styled.button<{ active?: boolean }>`
  flex: 1;
  outline: 0;

  border: 0;
  border-top: 3px solid ${(p) => p.theme.SubBackground};
  border-bottom: 3px solid ${(p) => p.theme.SubBackground};

  background: ${(p) => p.theme.SubBackground};
  color: ${(p) => p.theme.Foreground};
  fill: ${(p) => p.theme.Foreground};

  padding-top: 0.7em;
  padding-bottom: 0.6em;
  cursor: pointer;

  :hover {
    background: ${(p) => p.theme.HighlightBackground};
    color: ${(p) => p.theme.HighlightForeground};
    fill: ${(p) => p.theme.HighlightForeground};
  }

  ${(p) => p.active && activeCss}
  :active {
    ${activeCss}
  }

  :disabled {
    cursor: default;
    visibility: hidden;
    opacity: 0.8;
    background: ${(p) => p.theme.Background};
    color: ${(p) => p.theme.Foreground};
    fill: ${(p) => p.theme.Foreground};
  }
`;

const animationActiveCss = css`
  background: ${(p) => p.theme.PrimaryBackground};
  color: ${(p) => p.theme.PrimaryForeground};
  fill: ${(p) => p.theme.PrimaryForeground};
`;

export const AnimationButton = styled.button<{ active?: boolean }>`
  flex: 1;
  outline: 0;
  border: 0;

  background: ${(p) => p.theme.Background};
  color: ${(p) => p.theme.Foreground};
  fill: ${(p) => p.theme.Foreground};

  padding: 1em;
  margin: 0.2em;
  cursor: pointer;

  :hover {
    background: ${(p) => p.theme.HighlightBackground};
    color: ${(p) => p.theme.HighlightForeground};
    fill: ${(p) => p.theme.HighlightForeground};
  }

  ${(p) => p.active && animationActiveCss}
  :active {
    background: ${(p) => p.theme.PrimaryBackground};
    color: ${(p) => p.theme.PrimaryForeground};
    fill: ${(p) => p.theme.PrimaryForeground};
  }

  :disabled {
    cursor: default;
    visibility: hidden;
    opacity: 0.8;
    background: ${(p) => p.theme.Background};
    color: ${(p) => p.theme.Foreground};
    fill: ${(p) => p.theme.Foreground};
  }
`;

const calculateStep = (start?: number, end?: number) => Math.round(((end || 0) - (start || 0)) / 24);

export const LedSettings: React.FC<LedSettingsProps> = ({ state, update }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [userInput, setInput, clearUserInput, setUserInput] = useUserInput<ApiLedSettings>();

  const data = React.useMemo<Partial<ApiLedSettings>>(() => ({ ...state.data, ...userInput }), [state, userInput]);
  const [tab, setTab] = React.useState(0);
  return (
    <CardOverlay>
      <CardSetting expanded={expanded}>
        <TabContainer>
          <TabButton active={tab === 0} onClick={() => setTab(0)}>
            Animations
          </TabButton>
          <TabButton active={tab === 1} onClick={() => setTab(1)}>
            Mode
          </TabButton>
          <TabButton active={tab === 2} onClick={() => setTab(2)}>
            Settings
          </TabButton>
        </TabContainer>
        <CardSettingPanel>
          {tab === 0 && (
            <TabPanel>
              <CardInfoGrid>
                {[...Array(9).keys()].map((x) => (
                  <AnimationButton
                    key={x}
                    active={x === data.animation}
                    onClick={() => {
                      setUserInput({ ...data, animation: x });
                    }}
                  >
                    {getAnimationText(x)}
                  </AnimationButton>
                ))}
              </CardInfoGrid>
            </TabPanel>
          )}

          {tab === 1 && (
            <TabPanel>
              <SubLabel fontSize="xs">Mode</SubLabel>
              <Space />
              {[...Array(3).keys()].map((mode) => (
                <Radio
                  key={mode}
                  value={mode}
                  checked={data?.mode === mode}
                  onChange={(e) => setUserInput({ ...data, mode: parseInt(e.target.value) })}
                >
                  {getModeText(mode)}
                </Radio>
              ))}

              {data.mode === 0 && (
                <React.Fragment>
                  <SubLabel fontSize="xs">Start</SubLabel>
                  <HueSlider
                    min="0"
                    max="255"
                    type="range"
                    value={data.initHue}
                    onChange={(e) => {
                      setUserInput({
                        ...userInput,
                        initHue: e.target.valueAsNumber,
                        deltaHue: calculateStep(e.target.valueAsNumber, data.endHue),
                      });
                    }}
                  />

                  <SubLabel fontSize="xs">End</SubLabel>
                  <HueSlider
                    min="0"
                    max="255"
                    type="range"
                    value={data.endHue}
                    onChange={(e) => {
                      setUserInput({
                        ...userInput,
                        endHue: e.target.valueAsNumber,
                        deltaHue: calculateStep(data.initHue, e.target.valueAsNumber),
                      });
                    }}
                  />
                </React.Fragment>
              )}
              {data.mode === 2 && (
                <React.Fragment>
                  <React.Fragment>
                    <SubLabel fontSize="xs">Start</SubLabel>
                    <HueSlider min="0" max="255" type="range" value={data.initHue} onChange={setInput('initHue')} />

                    <SubLabel fontSize="xs">End</SubLabel>
                    <HueSlider min="0" max="255" type="range" value={data.endHue} onChange={setInput('endHue')} />
                  </React.Fragment>
                </React.Fragment>
              )}
              {data.mode === 1 && (
                <React.Fragment>
                  <SubLabel fontSize="xs">Color</SubLabel>
                  <Input
                    type="color"
                    value={vbColorToHEX(data.color)}
                    onChange={(e) => setUserInput({ ...userInput, color: hexToVbColor(e.target.value) })}
                  />
                </React.Fragment>
              )}
            </TabPanel>
          )}

          {tab === 2 && (
            <TabPanel>
              <SubLabel fontSize="xs">Min value</SubLabel>
              <SliderValue min="0" max={data.max || 350 - 100} value={data.min} onChange={setInput('min')} />

              <SubLabel fontSize="xs">Brightness</SubLabel>
              <Space />
              <Radio
                value={-1}
                checked={data?.brightness === -1}
                onChange={(e) => setUserInput({ ...data, brightness: parseInt(e.target.value) })}
              >
                Value
              </Radio>
              <Radio
                value={0}
                checked={(data?.brightness || 0) > -1}
                onChange={() => setUserInput({ ...data, brightness: 255 })}
              >
                Manual
              </Radio>

              {data?.brightness !== -1 && (
                <SliderValue min="0" max={255} value={data.brightness} onChange={setInput('brightness')} />
              )}
            </TabPanel>
          )}

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
          <Label>Led settings</Label>
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
