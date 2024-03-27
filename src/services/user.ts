import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";

const JWT_SECRET = "$uperM@n@123";

// const token =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwMzhiZWIwLTYzODMtNGRmOS1hZWNhLTAxZTY0YmZlOGE4ZCIsImVtYWlsIjoici5yYWh1bC5kZXZlbG9wZXJAZ21haWwuY29tIiwiaWF0IjoxNzExNTAwMjYyfQ._CA6slYkoQY8_6li63uLYclg7b1LBAjmF0Tx2Xtc9v";

// console.log(JWT.verify(token, JWT_SECRET));

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
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
    const { firstName, lastName, email, password, username } = payload;

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
}

export default UserService;
