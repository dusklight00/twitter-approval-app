import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";
// import JWT from "jsonwebtoken";
import cors from "cors";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());

  const gqlServer = await createApolloGraphqlServer();

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use(cors());

  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req }) => {
        const token = req.headers["token"];
        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
}

init();
