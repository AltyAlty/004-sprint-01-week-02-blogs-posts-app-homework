import { Express } from 'express';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/path';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { PostInputDto } from '../../../src/posts/dto/post-input.dto';
import { getPostDto } from './get-post-dto';

export async function updatePostById(app: Express, postId: string, postDto?: PostInputDto): Promise<void> {
  const defaultPostData: PostInputDto = getPostDto(postId);
  const testPostData = { ...defaultPostData, ...postDto };

  const updatepostByIdResponse = await request(app)
    .put(`${POSTS_PATH}/${postId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testPostData)
    .expect(HttpStatus.NoContent);

  return updatepostByIdResponse.body;
}
