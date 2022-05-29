import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { tokenVar } from "./variables";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://cake-instaclone-backend.herokuapp.com/graphql"
      : " http://localhost:4000/graphql",
});

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

const wsLink = new GraphQLWsLink(
  createClient({
    url:
      process.env.NODE_ENV === "production"
        ? "ws://cake-instaclone-backend.herokuapp.com/graphql"
        : "wss://localhost:4000/graphql",
    connectionParams: { token: tokenVar() },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind == "OperationDefinition" &&
      definition.operation == "subscription"
    );
  },
  wsLink,
  /* @ts-ignore */
  authLink.concat(errorLink).concat(uploadLink)
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          seeFeed: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          seeComments: {
            keyArgs: ["photoId"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  link: splitLink,
});

export default client;
