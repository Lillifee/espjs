import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    Background: string;
    Foreground: string;
    SubForeground: string;
    SubBorder: string;

    HighlightBackground: string;
    HighlightForeground: string;

    SelectedBackground: string;
    SelectedForeground: string;
  }
}
