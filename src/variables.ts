import { makeVar } from "@apollo/client";
import client from "./client";

export const tokenVar = makeVar(localStorage.getItem("token"));

export const themeVar = makeVar(localStorage.getItem("theme") || "dark");

export const setLogin = (token: string) => {
  tokenVar(token);
  localStorage.setItem("token", token);
};

export const logout = () => {
  tokenVar(null);
  localStorage.removeItem("token");
  client.clearStore();
};

export const toggleTheme = () => {
  if (themeVar() == "dark") {
    themeVar("light");
    localStorage.setItem("theme", "light");
  } else {
    themeVar("dark");
    localStorage.setItem("theme", "dark");
  }
};
