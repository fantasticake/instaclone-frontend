import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blue: string;
      backgroundColor: string;
      blurryBackgroundColor: string;
      textColor: string;
      borderColor: string;
      focusedBorderColor: string;
      faintLineColor: string;
    };
  }
}
