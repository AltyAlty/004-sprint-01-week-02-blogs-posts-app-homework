import { Request, Response } from 'express';
import { BlogInputDto } from '../../dto/blog.input-dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blog } from '../../types/blog';
import { db } from '../../../db/in-memory.db';
import { blogsRepository } from '../../repositories/blogs.repository';

/*Создаем функцию-обработчика "createBlogHandler()" для POST-запросов для добавления нового блога.*/
export const createBlogHandler = (req: Request<{}, {}, BlogInputDto>, res: Response) => {
  /*Если ошибок валидации не было, то создаем объект с данными нового блога.*/
  const newBlog: Blog = {
    /*Генерация случайного id.*/
    id: db.blogs.length ? String(Number(db.blogs[db.blogs.length - 1].id) + 1) : '1',
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  /*Просим репозиторий "blogsRepository" добавить новый блог в БД.*/
  blogsRepository.create(newBlog);
  /*Сообщаем об успешном добавлении нового блога клиенту.*/
  res.status(HttpStatus.Created).send(newBlog);
};
