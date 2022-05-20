import { ApolloProvider, useReactiveVar } from "@apollo/client";
import React from "react";
import { ThemeProvider } from "styled-components";
import client from "./client";
import GlobalStyle from "./Components/GlobalStyle";
import Router from "./Components/Router";
import { darkTheme, lightTheme } from "./themes";
import { themeVar } from "./variables";

function App() {
  const theme = useReactiveVar(themeVar);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
