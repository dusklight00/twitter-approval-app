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

  const client = new TwitterApi({
    appKey: "h0QyAHrDwVV5pF9UWr3guS4ND",
    appSecret: "gjiG0r9ZNCPxxQ4Z5G4TkiepfGTCPigQvUsFbjgnbR0hBlzUJ7",
    accessToken: "1773923161395929089-HabCqpk6BmfwSrzAKegHpjkYz7MBO2",
    accessSecret: "ysGu9blTficrqUrF1AinsYMvjCnRDuoDImDbcSuOnGHmc",
  });

  const twitterClient = client.readWrite;

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use("/approve", async (req, res) => {
    const title = req.body.title as string;
    const content = req.body.content as string;
    const tweet = `${title.toUpperCase()}\n${content}`;
    try {
      await twitterClient.v2.tweet(tweet);
      res.json({ message: "Tweeted successfully" });
    } catch (e) {
      console.log(e);
    }
  });

  app.use(
    "/graphql",
    expressMiddleware(gqlServer, {
      context: async ({ req }) => {
        const token = req.headers["token"];
        // console.log("token", token)
        try {
          const user = UserService.decodeJWTToken(token as string);
          console.log("user", user)
          return { user };
        } catch (error) {
          console.log(error)
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
}

init();
