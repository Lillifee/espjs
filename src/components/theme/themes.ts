import { DefaultTheme } from 'styled-components';

const fontSize = {
  xs: '0.7em',
  s: '0.8em',
  m: '1em',
  l: '1.5em',
  xl: '3em',
};

export const theme: DefaultTheme = {
  Background: 'white',
  Foreground: '#383838',
  SubForeground: '#a0a0a0',
  SubBorder: '#d4d4d4',

  HighlightBackground: '#dadada',
  HighlightForeground: '#383838',

  SelectedBackground: '#28627a',
  SelectedForeground: 'white',

  FontSize: fontSize,
};

export const themePrimary: DefaultTheme = {
  Background: '#28627a',
  Foreground: '#d7f3ff',
  SubForeground: '#d7f3ff',
  SubBorder: '#a0a0a0',

  HighlightBackground: '#23566b',
  HighlightForeground: '#d7f3ff',

  SelectedBackground: '#28627a',
  SelectedForeground: '#d7f3ff',

  FontSize: fontSize,
};
