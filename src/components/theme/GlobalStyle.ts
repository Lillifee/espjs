import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  html, body, #root {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  body {
    margin: 0;
    font-family: Roboto, Helvetica, Arial, sans-serif;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
