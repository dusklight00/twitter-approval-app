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
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../lib/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const SYSTEM_USERNAME = process.env.SYSTEM_USERNAME;
const SYSTEM_PASSWORD = process.env.SYSTEM_PASSWORD;
class UserService {
    static generateHash(salt, password) {
        const hashedPassword = (0, node_crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest("hex");
        return hashedPassword;
    }
    static createUser(payload) {
        const { firstName, lastName, email, password, username, isAdmin } = payload;
        const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password);
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                username,
                password: hashedPassword,
                isAdmin,
            },
        });
    }
    static getUserByUsername(username) {
        return db_1.prismaClient.user.findUnique({ where: { username } });
    }
    static getUserById(id) {
        return db_1.prismaClient.user.findUnique({ where: { id } });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = payload;
            // System Check
            if (username === SYSTEM_USERNAME && password === SYSTEM_PASSWORD) {
                const token = jsonwebtoken_1.default.sign({ id: "system", username: ", system" }, JWT_SECRET);
                return token;
            }
            const user = yield UserService.getUserByUsername(username);
            if (!user)
                throw new Error("user not found");
            const userSalt = user.salt;
            const usersHashPassword = UserService.generateHash(userSalt, password);
            if (usersHashPassword !== user.password)
                throw new Error("Incorrect Password");
            // Gen Token
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET);
            return token;
        });
    }
    static decodeJWTToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.default = UserService;
