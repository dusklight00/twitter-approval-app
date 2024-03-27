import { prismaClient } from "./../lib/db";

export interface createPostPayload {
  title: string;
  content: string;
  userId: string;
}

class PostService {
  public static createPost(payload: createPostPayload, userId: string) {
    const { title, content } = payload;
    return prismaClient.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }
  public static getUserPosts(userId: string) {
    return prismaClient.post.findMany({
      where: {
        userId,
      },
    });
  }
}

export default PostService;
