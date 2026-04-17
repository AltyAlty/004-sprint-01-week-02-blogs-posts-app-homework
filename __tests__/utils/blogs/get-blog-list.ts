import { BLOGS_PATH } from '../../../src/core/paths/path';
import { Express } from 'express';
import { Blog } from '../../../src/blogs/types/blog';
import request from 'supertest';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { HttpStatus } from '../../../src/core/types/http-statuses';

/*Создаем функцию "getBlogList()", получающую данные о всех блогах и возвращающую их, для целей тестирования.*/
export async function getBlogList(app: Express): Promise<Blog[]> {
  const getBlogListResponse = await request(app)
    .get(BLOGS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return getBlogListResponse.body;
}
