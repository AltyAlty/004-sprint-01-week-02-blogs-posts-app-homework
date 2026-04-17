import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { Post } from '../../types/post';

export function getPostByIdHandler(req: Request<{ id: string }, Post, {}, {}>, res: Response<Post | null | unknown>) {
  const post = postsRepository.findById(req.params.id);

  if (!post) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Post was not found' }]));
    return;
  }

  res.status(HttpStatus.Ok).send(post);
}
