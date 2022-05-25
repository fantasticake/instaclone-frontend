import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({ uri: "http://localhost:4000/graphql" });

const authLink = setContext(({ operationName }, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      "x-apollo-operation-name": operationName,
      ...(token && { token }),
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  /* @ts-ignore */
  link: authLink.concat(errorLink).concat(uploadLink),
});

export default client;
