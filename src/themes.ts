import { DefaultTheme } from "styled-components";

const shared = { blue: "#0095f6" };

export const darkTheme: DefaultTheme = {
  colors: {
    ...shared,
    backgroundColor: "#2e2f37",
    textColor: "white",
    borderColor: "rgba(255, 255, 255, 0.5)",
    focusedBorderColor: "rgba(255, 255, 255, 0.7)",
    faintLineColor: "rgba(255, 255, 255, 0.1)",
  },
};

export const lightTheme: DefaultTheme = {
  colors: {
    ...shared,
    backgroundColor: "white",
    textColor: "black",
    borderColor: "rgba(0, 0, 0, 0.7)",
    focusedBorderColor: "rgba(0, 0, 0, 0.9)",
    faintLineColor: "rgba(0, 0, 0, 0.1)",
  },
};
