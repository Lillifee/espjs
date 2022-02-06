import * as React from 'react';
import { Card, CardInfo, Label, CardInfoContent, CardContainer } from '../styles';

export const Loading: React.FC = () => {
  return (
    <CardContainer>
      <Card>
        <CardInfo>
          <CardInfoContent>
            <Label fontSize="m">Please wait...</Label>
          </CardInfoContent>
        </CardInfo>
      </Card>
    </CardContainer>
  );
};
