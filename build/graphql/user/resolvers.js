"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = __importDefault(require("../../services/user"));
const post_1 = __importDefault(require("../../services/post"));
const queries = {
    hello: () => `Hello there, I am a graphql server`,
    say: (_, { name }) => `Hey ${name}, How are you?`,
    getUserToken(_, payload) {
        return user_1.default.getUserToken(payload);
    },
    getCurrentLoggedInUser: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const user = yield user_1.default.getUserById(id);
            return user;
        }
        throw new Error("I don't know who are you");
    }),
    getUserPosts: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const posts = yield post_1.default.getUserPosts(id);
            const user = yield user_1.default.getUserById(id);
            return posts.map((post) => (Object.assign(Object.assign({}, post), { user })));
        }
        throw new Error("I don't know who are you");
    }),
    getAllPosts: (_, __) => __awaiter(void 0, void 0, void 0, function* () {
        const posts = yield post_1.default.getAllPosts();
        return posts.map((post) => (Object.assign(Object.assign({}, post), { user: user_1.default.getUserById(post.userId) })));
    }),
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user_1.default.createUser(payload);
        return res;
    }),
    createPost: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const id = context.user.id;
            const res = yield post_1.default.createPost(payload, id);
            return res;
        }
        throw new Error("I don't know who are you");
    }),
};
exports.resolvers = { queries, mutations };
