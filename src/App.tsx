import { ApolloProvider } from "@apollo/client";
import React from "react";
import { ThemeProvider } from "styled-components";
import client from "./client";
import GlobalStyle from "./Components/GlobalStyle";
import Router from "./Components/Router";
import { darkTheme } from "./themes";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
