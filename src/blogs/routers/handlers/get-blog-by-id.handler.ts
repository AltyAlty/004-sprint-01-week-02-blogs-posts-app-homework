import { Request, Response } from 'express';
import { Blog } from '../../types/blog';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

/*"Request" из Express используется для типизации параметра "req", а "Response" из Express используется для типизации
параметра "res".

Типизация первого параметра "req" второго параметра в виде асинхронной функции методов "get()", "post()", "delete()" и
"put()" внутри роутеров из Express:
1. На первом месте в типе идут URI-параметры.
2. На втором месте в типе идет "ResBody". Относится к параметру "res" внутри запроса, то есть что будет возвращено.
3. На третьем месте в типе идет "ReqBody". Это то, что приходит в body в запросе.
4. На четвертом месте в типе идут Query-параметры.

Создаем функцию-обработчика "getBlogByIdHandler()" для GET-запросов для поиска блога по ID при помощи URI-параметров.*/
export const getBlogByIdHandler = (
  req: Request<{ id: string }, Blog, {}, {}>,
  res: Response<Blog | null | unknown>,
) => {
  /*Просим репозиторий "blogsRepository" найти данные по блогу в БД.*/
  const blog = blogsRepository.findById(req.params.id);

  /*Если блог не был найден, то сообщаем об этом клиенту.*/
  if (!blog) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Blog was not found' }]));
    return;
  }

  /*Если блог был найден, то сообщаем об этом клиенту.*/
  res.status(HttpStatus.Ok).send(blog);
};
