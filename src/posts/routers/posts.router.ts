import { Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { postInputDtoValidation } from '../validation/post.input-dto.validation-middlewares';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { getPostByIdHandler } from './handlers/get-post-by-id.handler';
import { updatePostByIdHandler } from './handlers/update-post-by-id.handler';
import { deletePostHandler } from './handlers/delete-post.handler';

export const postsRouter = Router({});

postsRouter
  .get('', getPostListHandler)
  .get('/:id', idValidation, inputValidationResultMiddleware, getPostByIdHandler)
  .post('', superAdminGuardMiddleware, postInputDtoValidation, inputValidationResultMiddleware, createPostHandler)

  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostByIdHandler,
  )

  .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deletePostHandler);
