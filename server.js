const http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

// Web Socket Middleware
const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
    console.log(`server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:4000/${server.subscriptionsPath}`);
});