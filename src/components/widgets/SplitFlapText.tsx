import * as React from 'react';
import { CardContainer, Card, CardInfo, CardInfoContent } from '../styles';
import { Label, Input } from '../styles';
import { useFetch, FetchState } from '../hooks';

export interface ApiSplitFlapTextSettings {
  text: string;
}

const initSettings: ApiSplitFlapTextSettings = {
  text: '',
};

export const SplitFlapText: React.FC = () => {
  const [state, update] = useFetch<ApiSplitFlapTextSettings>('/api/splitflap', initSettings, {
    refreshInterval: 3000,
    updateDebounce: 500,
  });

  return (
    <CardContainer>
      <SplitFlap state={state} update={update} />
    </CardContainer>
  );
};

export interface SplitFlapProps {
  state: FetchState<ApiSplitFlapTextSettings>;
  update: (data?: ApiSplitFlapTextSettings) => void;
}

export const SplitFlap: React.FC<SplitFlapProps> = ({ state, update }) => (
  <Card>
    <CardInfo>
      <Label fontSize="s">Split-flap</Label>
      <CardInfoContent>
        <Input value={state.data.text} onChange={(e) => update({ text: e.target.value })} placeholder="HELLO :)" />
      </CardInfoContent>
    </CardInfo>
  </Card>
);
