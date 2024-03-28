export const typeDefs = `#graphql
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
    }
`;