import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { BLOGS_PATH } from '../../../src/core/paths/path';
import { Blog } from '../../../src/blogs/types/blog';

/*Создаем функцию "getBlogById()", получающую данные о блоге по ID и возвращающую их, для целей тестирования.*/
export async function getBlogById(app: Express, blogId: string): Promise<Blog> {
  const getBlogByIdResponse = await request(app)
    .get(`${BLOGS_PATH}/${blogId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return getBlogByIdResponse.body;
}
