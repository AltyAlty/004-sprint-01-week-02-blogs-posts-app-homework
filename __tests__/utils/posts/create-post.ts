import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Express } from 'express';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getPostDto } from './get-post-dto';
import { POSTS_PATH } from '../../../src/core/paths/path';
import { PostInputDto } from '../../../src/posts/dto/post-input.dto';
import { Post } from '../../../src/posts/types/post';
import { createBlog } from '../blogs/create-blog';

export async function createPost(app: Express, postDto?: PostInputDto): Promise<Post> {
  const blog = await createBlog(app);
  const defaultPostData = getPostDto(blog.id);
  const testPostData = { ...defaultPostData, ...postDto };

  const createPostResponse = await request(app)
    .post(POSTS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testPostData)
    .expect(HttpStatus.Created);

  return createPostResponse.body;
}
