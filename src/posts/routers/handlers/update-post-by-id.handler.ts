import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Post } from '../../types/post';
import { postsRepository } from '../../repositories/posts.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

export const updatePostByIdHandler = (req: Request<{ id: string }, {}, Post, {}>, res: Response) => {
  const post = postsRepository.findById(req.params.id);

  if (!post) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Post was not found' }]));
    return;
  }

  postsRepository.update(req.params.id, req.body);
  res.sendStatus(HttpStatus.NoContent);
};
