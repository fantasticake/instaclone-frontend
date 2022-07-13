import { DefaultTheme } from "styled-components";

const shared = { blue: "#0095f6" };

export const darkTheme: DefaultTheme = {
  colors: {
    ...shared,
    backgroundColor: "#2e2f37",
    blurryBackgroundColor: "rgba(255, 255, 255, 0.03)",
    textColor: "white",
    borderColor: "rgba(255, 255, 255, 0.5)",
    focusedBorderColor: "rgba(255, 255, 255, 0.7)",
    faintLineColor: "rgba(255, 255, 255, 0.15)",
  },
};

export const lightTheme: DefaultTheme = {
  colors: {
    ...shared,
    backgroundColor: "white",
    blurryBackgroundColor: "rgba(0, 0, 0, 0.02)",
    textColor: "black",
    borderColor: "rgba(0, 0, 0, 0.5)",
    focusedBorderColor: "rgba(0, 0, 0, 0.7)",
    faintLineColor: "rgba(0, 0, 0, 0.1)",
  },
};
