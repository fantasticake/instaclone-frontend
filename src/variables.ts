import { makeVar } from "@apollo/client";

const localStorage = window.localStorage;

export const tokenVar = makeVar(localStorage.getItem("token"));
