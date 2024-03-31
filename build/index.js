"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./services/user"));
// import JWT from "jsonwebtoken";
const cors_1 = __importDefault(require("cors"));
// import twitterClient from "./services/twitter";
const twitter_api_v2_1 = require("twitter-api-v2");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = process.env.PORT || 8000;
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        const gqlServer = yield (0, graphql_1.default)();
        const client = new twitter_api_v2_1.TwitterApi({
            appKey: "h0QyAHrDwVV5pF9UWr3guS4ND",
            appSecret: "gjiG0r9ZNCPxxQ4Z5G4TkiepfGTCPigQvUsFbjgnbR0hBlzUJ7",
            accessToken: "1773923161395929089-HabCqpk6BmfwSrzAKegHpjkYz7MBO2",
            accessSecret: "ysGu9blTficrqUrF1AinsYMvjCnRDuoDImDbcSuOnGHmc",
        });
        const twitterClient = client.readWrite;
        app.get("/", (req, res) => {
            res.json({ message: "Server is up and running" });
        });
        app.use("/approve", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req.body;
                yield twitterClient.v2.tweet(body);
                res.json({ message: "Tweeted successfully" });
            }
            catch (e) {
                console.log(e);
            }
        }));
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const token = req.headers["token"];
                try {
                    const user = user_1.default.decodeJWTToken(token);
                    return { user };
                }
                catch (error) {
                    return {};
                }
            }),
        }));
        app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
    });
}
init();
