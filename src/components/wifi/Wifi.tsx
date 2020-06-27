import * as React from 'react';
import { Card, CardTitle, CardContainer } from '../styles';
import { WifiStatus } from './WifiStatus';
import { WifiSettings } from './WifiSettings';

export const Wifi: React.FC = () => {
  return (
    <CardContainer>
      <Card>
        <CardTitle>Wifi</CardTitle>
        <WifiStatus />
        <WifiSettings />
      </Card>
    </CardContainer>
  );
};
