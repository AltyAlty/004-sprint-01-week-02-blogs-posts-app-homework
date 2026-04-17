import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { BLOGS_PATH } from '../../../src/core/paths/path';
import { generateBasicAuthToken } from '../../utils/generate-admin-auth-token';
import { clearDb } from '../../utils/clear-db';
import { BlogInputDto } from '../../../src/blogs/dto/blog.input-dto';
import { getBlogDto } from '../../utils/blogs/get-blog-dto';
import { createBlog } from '../../utils/blogs/create-blog';
import { getBlogById } from '../../utils/blogs/get-blog-by-id';
import { updateBlogById } from '../../utils/blogs/update-blog-by-id';

/*Описываем тестовый набор.*/
describe('Blogs API', () => {
  /*Создание экземпляра приложения Express.*/
  const app = express();
  /*Настраиваем экземпляр приложения Express при помощи функции "setupApp()".*/
  setupApp(app);
  /*Генерируем токен для Basic авторизации.*/
  const adminToken = generateBasicAuthToken();
  /*Перед запуском тестов, очищаем БД.*/
  beforeAll(async () => await clearDb(app));

  /*Описываем тест, проверяющий добавление нового блога в БД.*/
  it('✅ should create a blog; POST /api/blogs', async () => {
    const newBlog: BlogInputDto = {
      ...getBlogDto(),
      name: 'Blog 002',
      description: 'Description of Blog 002',
    };

    await createBlog(app, newBlog);
  });

  /*Описываем тест, проверяющий получение данных по всем блогам из БД.*/
  it('✅ should return a list of blogs; GET /api/blogs', async () => {
    await createBlog(app);
    await createBlog(app);

    const getBlogListResponse = await request(app)
      .get(BLOGS_PATH)
      .set('Authorization', adminToken)
      .expect(HttpStatus.Ok);

    expect(getBlogListResponse.body).toBeInstanceOf(Array);
    expect(getBlogListResponse.body.length).toBeGreaterThanOrEqual(2);
  });

  /*Описываем тест, проверяющий получение данных по блогу по ID из БД.*/
  it('✅ should return a blog by ID; GET /api/blogs/:id', async () => {
    const newBlog = await createBlog(app);
    const getBlogByIdResponse = await getBlogById(app, newBlog.id);

    expect(getBlogByIdResponse).toEqual({
      ...newBlog,
      id: expect.any(String),
      description: expect.any(String),
    });
  });

  /*Описываем тест, проверяющий изменение данных по блогу по ID в БД.*/
  it('✅ should update a blog by ID; PUT /api/blogs/:id', async () => {
    const newBlog = await createBlog(app);

    const blogUpdateData: BlogInputDto = {
      name: 'Blog 003',
      description: 'Description of Blog 003',
      websiteUrl: 'https://www.example.com/in/blog-003/',
    };

    await updateBlogById(app, newBlog.id, blogUpdateData);
    const getBlogByIdResponse = await getBlogById(app, newBlog.id);

    expect(getBlogByIdResponse).toEqual({
      ...blogUpdateData,
      id: newBlog.id,
      description: expect.any(String),
    });
  });

  /*Описываем тест, проверяющий удаление блога по ID в БД.*/
  it('✅ should delete a blog by ID; DELETE /api/blogs/:id', async () => {
    const newBlog = await createBlog(app);

    await request(app)
      .delete(`${BLOGS_PATH}/${newBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatus.NoContent);

    const getBlogByIdResponse = await request(app).get(`${BLOGS_PATH}/${newBlog.id}`);
    expect(getBlogByIdResponse.status).toBe(HttpStatus.NotFound);
  });
});
