import { DefaultTheme } from "styled-components";

const shared = { blue: "#0095f6" };

export const darkTheme: DefaultTheme = {
  colors: {
    ...shared,
    backgroundColor: "#2e2f37",
    textColor: "white",
    borderColor: "rgba(255, 255, 255, 0.7)",
    focusedBorderColor: "rgba(255, 255, 255, 0.9)",
  },
};
