import * as React from 'react';
import styled from 'styled-components';
import { PageLimiter } from './styles';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.Background};
`;

const Title = styled.div`
  display: flex;
  align-items: center;

  font-size: 3em;
  font-weight: lighter;

  padding: 0.5em;

  color: ${(props) => props.theme.Foreground};
  fill: ${(props) => props.theme.Foreground};
`;

export const AppTitle: React.FC = () => (
  <Wrapper>
    <PageLimiter>
      <Title>Cube</Title>
    </PageLimiter>
  </Wrapper>
);
