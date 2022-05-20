import { makeVar } from "@apollo/client";

export const tokenVar = makeVar(localStorage.getItem("token"));

export const themeVar = makeVar(localStorage.getItem("theme") || "dark");
