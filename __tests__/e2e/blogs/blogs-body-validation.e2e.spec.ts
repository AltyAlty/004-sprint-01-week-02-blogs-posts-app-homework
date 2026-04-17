import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGS_PATH } from '../../../src/core/paths/path';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { clearDb } from '../../utils/clear-db';
import { BlogInputDto } from '../../../src/blogs/dto/blog.input-dto';
import { getBlogDto } from '../../utils/blogs/get-blog-dto';
import { getBlogList } from '../../utils/blogs/get-blog-list';
import { createBlog } from '../../utils/blogs/create-blog';
import { getBlogById } from '../../utils/blogs/get-blog-by-id';

describe('Blogs API body validation check', () => {
  const app = express();
  setupApp(app);
  const adminToken = generateBasicAuthToken();
  const correctTestBlogData: BlogInputDto = getBlogDto();
  beforeAll(async () => await clearDb(app));

  /*Описываем тест, проверяющий отказ в добавлении блога с непрошедшими валидацию данными.*/
  it('❌ should not create a blog when incorrect body passed; POST /api/blogs', async () => {
    await request(app).post(BLOGS_PATH).send(correctTestBlogData).expect(HttpStatus.Unauthorized);

    const invalidDataSet1 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...correctTestBlogData,
        name: '   ',
        description: '    ',
        websiteUrl: 'invalid url',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

    const invalidDataSet2 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...correctTestBlogData,
        name: '',
        description: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorsMessages).toHaveLength(2);

    const invalidDataSet3 = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...correctTestBlogData,
        name: '111111111111111111111111111111111111111111111111111111111111111111111111111',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);
    const getBlogListResponse = await getBlogList(app);
    expect(getBlogListResponse).toHaveLength(0);
  });

  /*Описываем тест, проверяющий отказ в изменении данных блога с непрошедшими валидацию данными.*/
  it('❌ should not update a blog when incorrect body passed; PUT /api/blogs/:id', async () => {
    const newBlog = await createBlog(app, correctTestBlogData);

    const invalidDataSet1 = await request(app)
      .put(`${BLOGS_PATH}/${newBlog.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestBlogData,
        name: '   ',
        description: '    ',
        websiteUrl: 'invalid url',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

    const invalidDataSet2 = await request(app)
      .put(`${BLOGS_PATH}/${newBlog.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestBlogData,
        name: '',
        description: '',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet2.body.errorsMessages).toHaveLength(2);

    const invalidDataSet3 = await request(app)
      .put(`${BLOGS_PATH}/${newBlog.id}`)
      .set('Authorization', adminToken)
      .send({
        ...correctTestBlogData,
        name: '111111111111111111111111111111111111111111111111111111111111111111111111111',
      })
      .expect(HttpStatus.BadRequest);

    expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);
    const getBlogByIdResponse = await getBlogById(app, newBlog.id);

    expect(getBlogByIdResponse).toEqual({
      ...correctTestBlogData,
      id: newBlog.id,
      description: expect.any(String),
    });
  });
});
