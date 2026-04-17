import { Request, Response } from 'express';
import { PostInputDto } from '../../dto/post-input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validation-result.middleware';
import { postsRepository } from '../../repositories/posts.repository';
import { Post } from '../../types/post';
import { db } from '../../../db/in-memory.db';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';

export function createPostHandler(req: Request<{}, {}, PostInputDto>, res: Response) {
  const blog = blogsRepository.findById(req.body.blogId);

  if (!blog) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages([{ field: 'id', message: 'Blog was not found' }]));
    return;
  }

  const newPost: Post = {
    id: db.posts.length ? String(Number(db.posts[db.posts.length - 1].id) + 1) : '1',
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogId: req.body.blogId,
    blogName: blog.name,
  };

  postsRepository.create(newPost);
  res.status(HttpStatus.Created).send(newPost);
}
