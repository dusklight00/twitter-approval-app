"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        type: String!
        username: String!
        tweeted: Int!
        approved: Int!
    }

    type Post {
        postId: ID!
        title: String!
        content: String!
        userId: String!
        isApproved: Boolean!
        user: User
    }
`;
