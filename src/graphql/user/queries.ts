export const queries = `#graphql
    hello: String
    say(name: String): String
    getUserToken(username: String!, password: String!): String
    getCurrentLoggedInUser: User
    getUserPosts: [Post]
    getAllPosts: [Post]
    getUsers: [User]
`;
