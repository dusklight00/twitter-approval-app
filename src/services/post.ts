import { prismaClient } from "./../lib/db";

export interface createPostPayload {
  title: string;
  content: string;
  userId: string;
}

class PostService {
  public static createPost(payload: createPostPayload) {
    const { title, content, userId } = payload;
    return prismaClient.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }
}

export default PostService;
