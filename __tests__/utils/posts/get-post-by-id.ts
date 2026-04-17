import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { POSTS_PATH } from '../../../src/core/paths/path';
import { Post } from '../../../src/posts/types/post';

export async function getPostById(app: Express, postId: string): Promise<Post> {
  const getPostByIdResponse = await request(app)
    .get(`${POSTS_PATH}/${postId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return getPostByIdResponse.body;
}
