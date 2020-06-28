import 'styled-components';

declare module 'styled-components' {
  /*
    Override the default theme properties of styled components.
  */
  export interface DefaultTheme {
    Background: string;
    SubBackground: string;
    Border: string;

    Foreground: string;
    SubForeground: string;

    SubBorder: string;

    HighlightBackground: string;
    HighlightForeground: string;

    SelectedBackground: string;
    SelectedForeground: string;

    PrimaryBackground: string;
    PrimarySubBackground: string;

    PrimaryForeground: string;
    PrimarySubForeground: string;

    FontSize: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
  }
}
