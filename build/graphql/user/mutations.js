"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!, type: String!): User
    createPost(title: String!, content: String!): Post
    approvePost(postId: ID!): Post
    increaseTweeted(userId: ID!): User
    increaseApproved(userId: ID!): User
`;
