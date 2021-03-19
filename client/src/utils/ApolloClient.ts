import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials:'include',
    cache: new InMemoryCache()
});