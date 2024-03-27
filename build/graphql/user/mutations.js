"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!, isAdmin: Boolean!): User
    createPost(title: String!, content: String!): Post
`;
