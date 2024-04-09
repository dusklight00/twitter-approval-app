export const mutations = `#graphql
    createUser(firstName: String!, lastName: String!, email: String!, username: String!, password: String!, type: String!): User
    createPost(title: String!, content: String!): Post
    approvePost(postId: ID!): Post
    increaseTweeted(userId: ID!): User
    increaseApproved(userId: ID!): User
`;
