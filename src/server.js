require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 8000;

const typeDefs = `
    type Query {
        hello: String!
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hi 🥑",
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () =>
  console.log(`🔥 Server on: http://localhost:${PORT}`)
);
