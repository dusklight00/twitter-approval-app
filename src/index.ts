require("dotenv").config();
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";
import UserService from "./services/user";
// import JWT from "jsonwebtoken";
import cors from "cors";
// import twitterClient from "./services/twitter";
import { TwitterApi } from "twitter-api-v2";

async function init() {
  const app = express();
  const PORT = process.env.PORT || 8000;

  app.use(express.json());
  app.use(cors());

  const gqlServer = await createApolloGraphqlServer();

g

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });


  app.use("/approve", async (req, res) => {
    try {
      await twitterClient.v2.tweet("Hello world!");
      res.json({ message: "Tweeted successfully" });
    } catch (e) {
      console.log(e)
    }
  });
  
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
