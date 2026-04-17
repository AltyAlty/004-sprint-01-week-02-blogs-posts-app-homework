import { Request, Response } from 'express';
import { Blog } from '../../types/blog';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

/*Создаем функцию-обработчика "updateBlogByIdHandler()" для PUT-запросов для изменения данных блога по ID при помощи
URI-параметров.*/
export const updateBlogByIdHandler = (req: Request<{ id: string }, {}, Blog, {}>, res: Response) => {
  /*Просим репозиторий "blogsRepository" найти данные по блогу в БД.*/
  const blog = blogsRepository.findById(req.params.id);

  /*Если блог не был найден, то сообщаем об этом клиенту.*/
  if (!blog) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Blog was not found' }]));
    return;
  }

  /*Если водитель был найден, то просим репозиторий "blogsRepository" обновить данные блога в БД.*/
  blogsRepository.update(req.params.id, req.body);
  /*Сообщаем об успешном обновлении данных блога в БД клиенту.*/
  res.sendStatus(HttpStatus.NoContent);
};
