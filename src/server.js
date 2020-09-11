require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";
import morgan from "morgan";
import schema from "./schema";
import { isAuthenticated } from "./middleware";

import { authenticateJWT } from "./passport";

const PORT = process.env.PORT || 8000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(morgan("dev"));
server.express.use(authenticateJWT);

server.start({ port: PORT }, () =>
  console.log(`🔥 Server on: http://localhost:${PORT}`)
);
