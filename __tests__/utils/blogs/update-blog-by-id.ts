import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { getBlogDto } from './get-blog-dto';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { BLOGS_PATH } from '../../../src/core/paths/path';
import { BlogInputDto } from '../../../src/blogs/dto/blog.input-dto';

/*Создаем функцию "updateBlogById()", изменяющую данные блога по ID и возвращающую их, для целей тестирования.*/
export async function updateBlogById(app: Express, blogId: string, blogDto?: BlogInputDto): Promise<void> {
  const defaultBlogData: BlogInputDto = getBlogDto();
  const testBlogData = { ...defaultBlogData, ...blogDto };

  const updateBlogByIdResponse = await request(app)
    .put(`${BLOGS_PATH}/${blogId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testBlogData)
    .expect(HttpStatus.NoContent);

  return updateBlogByIdResponse.body;
}
