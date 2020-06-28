import { DefaultTheme } from 'styled-components';

const fontSize = {
  xs: '0.7em',
  s: '0.8em',
  m: '1em',
  l: '1.5em',
  xl: '2em',
};

export const theme: DefaultTheme = {
  Background: '#242424',
  SubBackground: '#1d1d1d',

  Border: '#373737',
  SubBorder: '#2c2c2c',

  Foreground: '#e2e2e2',
  SubForeground: '#a2a2a2',

  HighlightBackground: '#373737',
  HighlightForeground: '#e2e2e2',

  SelectedBackground: '#323232',
  SelectedForeground: '#e2e2e2',

  PrimaryBackground: '#78b956',
  PrimarySubBackground: '#56aab9',

  PrimaryForeground: '#1d1d1d',
  PrimarySubForeground: '#242424',

  FontSize: fontSize,
};
