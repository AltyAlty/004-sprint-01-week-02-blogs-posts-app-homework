import { Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogByIdHandler } from './handlers/get-blog-by-id.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { updateBlogByIdHandler } from './handlers/update-blog-by-id.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { blogInputDtoValidation } from '../validation/blog.input-dto.validation-middlewares';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

/*Создаем роутер из Express для работы с данными по блогам.*/
export const blogsRouter = Router({});

/*Конфигурируем роутер "blogsRouter".*/
blogsRouter
  /*GET-запрос для получения данных по всем блогам.*/
  .get('', getBlogListHandler)
  /*GET-запрос для поиска блога по ID при помощи URI-параметров. При помощи ":" Express позволяет указывать
  переменные в пути. Такие переменные доступны через объект "req.params".*/
  .get('/:id', idValidation, inputValidationResultMiddleware, getBlogByIdHandler)
  /*POST-запрос для добавления нового блога.*/
  .post('', superAdminGuardMiddleware, blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)

  /*PUT-запрос для изменения данных блога по ID при помощи URI-параметров.*/
  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    blogInputDtoValidation,
    inputValidationResultMiddleware,
    updateBlogByIdHandler,
  )

  /*DELETE-запрос для удаления блога по ID при помощи URI-параметров.*/
  .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteBlogHandler);
