import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Card,
  CardTitle,
  CardInfo,
  Label,
  CardFooter,
  CardSetting,
  Input,
  CardContainer,
  CardFooterPanel,
  Button,
  SubLabel,
} from '../styles';
import { RoundIcon, ButtonIcon } from '../Icons';
import { themePrimary, theme } from '../theme';

export const Network: React.FC = () => (
  <CardContainer>
    <Card>
      <CardTitle>Network</CardTitle>

      <ThemeProvider theme={themePrimary}>
        <CardInfo>
          <Label size="s">IP Address</Label>
          <Label size="xl">192.168.1.115</Label>
        </CardInfo>
      </ThemeProvider>

      <CardFooter>
        <ThemeProvider theme={themePrimary}>
          <RoundIcon type="Settings" />
        </ThemeProvider>
        <CardFooterPanel>
          <Label>Configuration</Label>
          <SubLabel size="s">Static IP Address</SubLabel>
        </CardFooterPanel>
        <ThemeProvider theme={theme}>
          <ButtonIcon type="ExpandMore" />
        </ThemeProvider>
      </CardFooter>

      <CardSetting>
        <SubLabel size="xs">IP Address</SubLabel>
        <Input value="192.168.1.115" />

        <SubLabel size="xs">Subnet Mask</SubLabel>
        <Input value="255.255.255.0" />

        <SubLabel size="xs">Default Gateway</SubLabel>
        <Input value="192.168.1.1" />

        <SubLabel size="xs">Domain Name Server</SubLabel>
        <Input value="192.168.1.1" />

        <ThemeProvider theme={themePrimary}>
          <Button>Apply</Button>
        </ThemeProvider>
      </CardSetting>
    </Card>
  </CardContainer>
);
