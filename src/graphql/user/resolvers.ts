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
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res;
  },
  createPost: async (_: any, payload: createPostPayload) => {
    const res = await PostService.createPost(payload);
    return res;
  },
};

export const resolvers = { queries, mutations };
