import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Card,
  CardTitle,
  CardInfo,
  LabelS,
  LabelXL,
  Label,
  CardFooter,
  SubLabelS,
  SubLabelXS,
  CardSetting,
  Input,
  CardContainer,
  CardFooterPanel,
  Button,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { themePrimary, theme } from '../theme';

export const Network: React.FC = () => (
  <CardContainer>
    <Card>
      <CardTitle>Network</CardTitle>

      <ThemeProvider theme={themePrimary}>
        <CardInfo>
          <LabelS>IP Address</LabelS>
          <LabelXL>192.168.1.115</LabelXL>
        </CardInfo>
      </ThemeProvider>

      <CardFooter>
        <ThemeProvider theme={themePrimary}>
          <RoundIcon type="Settings" />
        </ThemeProvider>
        <CardFooterPanel>
          <Label>Configuration</Label>
          <SubLabelS>Static IP Address</SubLabelS>
        </CardFooterPanel>
        <ThemeProvider theme={theme}>
          <ButtonIcon type="ExpandMore" />
        </ThemeProvider>
      </CardFooter>

      <CardSetting>
        <SubLabelXS>IP Address</SubLabelXS>
        <Input value="192.168.1.115" />

        <SubLabelXS>Subnet Mask</SubLabelXS>
        <Input value="255.255.255.0" />

        <SubLabelXS>Default Gateway</SubLabelXS>
        <Input value="192.168.1.1" />

        <SubLabelXS>Domain Name Server</SubLabelXS>
        <Input value="192.168.1.1" />

        <ThemeProvider theme={themePrimary}>
          <Button>Apply</Button>
        </ThemeProvider>
      </CardSetting>
    </Card>
  </CardContainer>
);
