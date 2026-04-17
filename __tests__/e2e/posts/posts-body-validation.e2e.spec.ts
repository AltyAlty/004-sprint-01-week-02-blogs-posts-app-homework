import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { clearDb } from '../../utils/clear-db';
import { POSTS_PATH } from '../../../src/core/paths/path';

describe('Posts API body validation check', () => {
  const app = express();
  setupApp(app);
  const adminToken = generateBasicAuthToken();
  beforeAll(async () => await clearDb(app));

  it(`❌ should not create a post when incorrect body passed; POST /api/posts'`, async () => {
    await request(app).post(POSTS_PATH).send({}).expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        title: '   ',
        shortDescription: 'P 001',
        content: 1,
        blogId: '   ',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

    const invalidDataSet2 = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        title: '',
        shortDescription: '',
        content: 1,
        blogId: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorsMessages).toHaveLength(4);

    const invalidDataSet3 = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', generateBasicAuthToken())
      .send({
        title: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        shortDescription: 'P 001',
        content: 'Content 001',
        blogId: '2',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);
    const getPostListResponse = await request(app).get(POSTS_PATH).set('Authorization', adminToken);
    expect(getPostListResponse.body).toHaveLength(0);
  });
});
