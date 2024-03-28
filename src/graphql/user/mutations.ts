export const mutations = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!, isAdmin: Boolean!): User
    createPost(title: String!, content: String!): Post
    approvePost(postId: ID!): Post
`;
