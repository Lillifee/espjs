import * as React from 'react';
import { CardContainer, Card, CardInfo, CardInfoContent } from '../styles';
import { Label, Input } from '../styles';
import { useUserInput, useFetch, FetchState } from '../hooks';
import { useDebounce } from '../hooks/useDebounce';

export interface ApiSplitFlapTextSettings {
  text: string;
}

const initSettings: ApiSplitFlapTextSettings = {
  text: '',
};

export const SplitFlapText: React.FC = () => {
  const { state, update } = useFetch<ApiSplitFlapTextSettings>('/api/splitflap', initSettings, 3000);

  return (
    <CardContainer>
      <SplitFlap state={state} update={update} />
    </CardContainer>
  );
};

export interface SplitFlapProps {
  state: FetchState<ApiSplitFlapTextSettings>;
  update: (data: Partial<ApiSplitFlapTextSettings>) => void;
}

export const SplitFlap: React.FC<SplitFlapProps> = ({ state, update }) => {
  const [userInput, setInput] = useUserInput<ApiSplitFlapTextSettings>();
  const data = React.useMemo<Partial<ApiSplitFlapTextSettings>>(
    () => ({ ...state.data, ...userInput }),
    [state, userInput],
  );

  const text = useDebounce(data.text, 500);

  React.useEffect(() => {
    update({ text: text });
  }, [text]);

  return (
    <Card>
      <CardInfo>
        <Label fontSize="s">Split-flap</Label>
        <CardInfoContent>
          <Input value={data.text} onChange={setInput('text')} placeholder="HELLO :)" />
        </CardInfoContent>
      </CardInfo>
    </Card>
  );
};
