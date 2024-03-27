import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./index.css";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
