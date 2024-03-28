"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `#graphql
    hello: String
    say(name: String): String
    getUserToken(username: String!, password: String!): String
    getCurrentLoggedInUser: User
    getUserPosts: [Post]
    getAllPosts: [Post]
`;