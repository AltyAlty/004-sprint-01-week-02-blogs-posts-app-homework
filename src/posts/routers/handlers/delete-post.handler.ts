import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsRepository } from '../../repositories/posts.repository';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';

export const deletePostHandler = (req: Request<{ id: string }, {}, {}, {}>, res: Response) => {
  const post = postsRepository.findById(req.params.id);

  if (!post) {
    res.status(HttpStatus.NotFound).send(createErrorMessages([{ field: 'id', message: 'Post was not found' }]));
    return;
  }

  postsRepository.delete(req.params.id);
  res.sendStatus(HttpStatus.NoContent);
};
