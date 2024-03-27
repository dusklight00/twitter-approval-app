export const mutations = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!): User
    createPost(title: String!, content: String!, userId: String!): Post
`;
