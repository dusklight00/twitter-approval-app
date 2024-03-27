export const typeDefs = `#graphql
    type User {
        id: ID!
        firstName: String!
        lastName: String
        email: String!
    }

    type Post {
        postId: ID!
        title: String!
        content: String!
        userId: String!
    }
`;
