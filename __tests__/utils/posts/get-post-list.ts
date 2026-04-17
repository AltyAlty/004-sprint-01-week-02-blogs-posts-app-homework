import { Express } from 'express';
import request from 'supertest';
import { POSTS_PATH } from '../../../src/core/paths/path';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Post } from '../../../src/posts/types/post';

export async function getPostList(app: Express): Promise<Post[]> {
  const getPostListResponse = await request(app)
    .get(POSTS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return getPostListResponse.body;
}
