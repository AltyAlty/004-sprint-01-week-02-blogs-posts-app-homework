import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

/*Создаем функцию-обработчика "deleteBlogHandler()" для DELETE-запросов для удаления блога по ID при помощи
URI-параметров.*/
export const deleteBlogHandler = (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
  /*Просим репозиторий "blogsRepository" найти данные по блогу в БД.*/
  const blog = blogsRepository.findById(req.params.id);

  /*Если блог не был найден, то сообщаем об этом клиенту.*/
  if (!blog) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Blog was not found' }]));
    return;
  }

  /*Если блог был найден, то просим репозиторий "blogsRepository" удалить его из БД.*/
  blogsRepository.delete(req.params.id);
  /*Сообщаем об успешном удалении блога клиенту.*/
  res.sendStatus(HttpStatus.NoContent);
};
