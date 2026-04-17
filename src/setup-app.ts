import express, { Express, Request, Response } from 'express';
import { testingRouter } from './testing/routers/testing.router';
import { HttpStatus } from './core/types/http-statuses';
import { setupSwagger } from './core/swagger/setup-swagger';
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from './core/paths/path';
import { blogsRouter } from './blogs/routers/blogs.router';
import { postsRouter } from './posts/routers/posts.router';

/*Создаем функцию "setupApp()" для конфигурирования экземпляров приложения Express.*/
export const setupApp = (app: Express) => {
  /*Подключаем middleware для парсинга JSON в теле запроса.*/
  app.use(express.json());
  /*GET-запрос для получения главной страницы.*/
  app.get('/', (req: Request, res: Response) => res.status(HttpStatus.Ok).send('Hello World!'));
  /*Подключаем роутеры.*/
  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);
  app.use(TESTING_PATH, testingRouter);
  /*Инициализируем документацию Swagger.*/
  setupSwagger(app);
  return app;
};
