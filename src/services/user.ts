import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const SYSTEM_USERNAME = process.env.SYSTEM_USERNAME as string;
const SYSTEM_PASSWORD = process.env.SYSTEM_PASSWORD as string;

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  type: string;
}

export interface GetUserTokenPayload {
  username: string;
  password: string;
}

class UserService {
  private static generateHash(salt: string, password: string) {
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    return hashedPassword;
  }

  public static createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password, username, type } = payload;

    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password);

    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        username,
        password: hashedPassword,
        type,
      },
    });
  }

  private static getUserByUsername(username: string) {
    return prismaClient.user.findUnique({ where: { username } });
  }

  public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { username, password } = payload;

    // System Check
    if (username === SYSTEM_USERNAME && password === SYSTEM_PASSWORD) {
      const token = JWT.sign(
        { id: "system", username: ", system" },
        JWT_SECRET
      );
      return token;
    }

    const user = await UserService.getUserByUsername(username);
    if (!user) throw new Error("user not found");
    const userSalt = user.salt;
    const usersHashPassword = UserService.generateHash(userSalt, password);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    return token;
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
  public static getAllUsers() {
    return prismaClient.user.findMany();
  }
}

export default UserService;
