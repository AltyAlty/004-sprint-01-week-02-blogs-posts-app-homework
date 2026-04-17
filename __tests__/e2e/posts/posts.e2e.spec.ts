import request from 'supertest';
import express from 'express';
import { setupApp } from '../../../src/setup-app';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { clearDb } from '../../utils/clear-db';
import { POSTS_PATH } from '../../../src/core/paths/path';
import { createPost } from '../../utils/posts/create-post';
import { getPostById } from '../../utils/posts/get-post-by-id';

describe('Posts API', () => {
  const app = express();
  setupApp(app);
  const adminToken = generateBasicAuthToken();
  beforeAll(async () => await clearDb(app));

  it('✅ should create a post; POST /api/posts', async () => await createPost(app));

  it('✅ should return a list of posts; GET /api/posts', async () => {
    await createPost(app);

    const getPostListResponse = await request(app)
      .get(POSTS_PATH)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);

    expect(getPostListResponse.body).toBeInstanceOf(Array);
    expect(getPostListResponse.body).toHaveLength(2);
  });

  it('✅ should return a post by ID; GET /api/posts/:id', async () => {
    const newPost = await createPost(app);
    const getRide = await getPostById(app, newPost.id);

    expect(getRide).toEqual({
      ...newPost,
      id: expect.any(String),
      shortDescription: expect.any(String),
    });
  });
});
