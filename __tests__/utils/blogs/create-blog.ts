import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getBlogDto } from './get-blog-dto';
import { BLOGS_PATH } from '../../../src/core/paths/path';
import { BlogInputDto } from '../../../src/blogs/dto/blog.input-dto';
import { Blog } from '../../../src/blogs/types/blog';

/*Создаем функцию "createBlog()", создающую блог и возвращающую данные о нем, для целей тестирования.*/
export async function createBlog(app: Express, blogDto?: BlogInputDto): Promise<Blog> {
  /*Получаем DTO с корректными данными блога для целей тестирования.*/
  const defaultBlogData: BlogInputDto = getBlogDto();
  /*Разбавляем полученный DTO другими данными, если таковые были переданы.*/
  const testBlogData = { ...defaultBlogData, ...blogDto };

  const createBlogResponse = await request(app)
    .post(BLOGS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testBlogData)
    .expect(HttpStatus.Created);

  return createBlogResponse.body;
}
