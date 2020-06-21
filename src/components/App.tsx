import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle, themePrimary } from './theme';
import { AppTitle } from './AppTitle';
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
      <ThemeProvider theme={themePrimary}>
        <AppTitle />
      </ThemeProvider>

      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </Wrapper>
  </ThemeProvider>
);
