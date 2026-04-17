import { PostInputDto } from '../../../src/posts/dto/post-input.dto';

/*Создаем функцию "getPostDto()", возвращающую DTO с корректными данными поста, для целей тестирования.*/
export function getPostDto(blogId: string): PostInputDto {
  return {
    title: 'Post 001',
    shortDescription: 'P 001',
    content: 'Content 001',
    blogId,
  };
}
