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
        isApproved: false,
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
  public static getAllPosts() {
    return prismaClient.post.findMany();
  }
  public static approvePost(postId: string) {
    console.log(postId);
    return prismaClient.post.update({
      where: {
        postId,
      },
      data: {
        isApproved: true,
      },
    });
  }
}

export default PostService;
