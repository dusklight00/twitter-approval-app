"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
        isAdmin: Boolean!
        username: String!
    }

    type Post {
        postId: ID!
        title: String!
        content: String!
        userId: String!
        isApproved: Boolean!
        user: User
        image : Image
    }

    type Image {
        filename: String!
        contentType: String!
        data: String!
    }

input ImageInput {
  filename: String!
  contentType: String!
  data: String!
}
`;
