import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme';
import { Main } from './Main';
import { ErrorBoundary } from './common';

const Wrapper = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />

    <Wrapper>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </Wrapper>
  </ThemeProvider>
);
