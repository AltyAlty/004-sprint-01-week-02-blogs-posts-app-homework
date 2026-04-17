import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';

/*Создаем функцию-обработчика "getBlogListHandler()" для GET-запросов для получения данных по всем блогам.*/
export const getBlogListHandler = (req: Request, res: Response) => {
  /*Просим репозиторий "blogsRepository" найти данные по всем блогам в БД.*/
  const blogs = blogsRepository.findAll();
  res.status(HttpStatus.Ok).send(blogs);
};
