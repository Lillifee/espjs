import 'styled-components';

declare module 'styled-components' {
  /*
    Override the default theme properties of styled components.
  */
  export interface DefaultTheme {
    Background: string;
    Foreground: string;
    SubForeground: string;
    SubBorder: string;

    HighlightBackground: string;
    HighlightForeground: string;

    SelectedBackground: string;
    SelectedForeground: string;

    FontSize: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
  }
}
