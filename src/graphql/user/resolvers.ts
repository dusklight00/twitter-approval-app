import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";
import PostService, { createPostPayload } from "../../services/post";

const queries = {
  hello: () => `Hello there, I am a graphql server`,
  say: (_: any, { name }: { name: string }) => `Hey ${name}, How are you?`,
  getUserToken(_: any, payload: GetUserTokenPayload) {
    return UserService.getUserToken(payload);
  },
  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("I don't know who are you");
  },
  getUserPosts: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const posts = await PostService.getUserPosts(id);
      const user = await UserService.getUserById(id);
      return posts.map((post) => ({ ...post, user }));
    }
    throw new Error("I don't know who are you");
  },
  getAllPosts: async (_: any, __: any) => {
    const posts = await PostService.getAllPosts();
    return posts.map((post) => ({
      ...post,
      user: UserService.getUserById(post.userId),
    }));
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res;
  },
  createPost: async (_: any, payload: createPostPayload, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const res = await PostService.createPost(payload, id);
      return res;
    }
    throw new Error("I don't know who are you");
  },
  approvePost: async (_: any, { postId }: { postId: string }) => {
    const res = await PostService.approvePost(postId);
    const user = await UserService.getUserById(res.userId);
    return { ...res, user };
  },
};

export const resolvers = { queries, mutations };
