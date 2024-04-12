import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://twitter-approval-app-production-28af.up.railway.app/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem("token") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
