import { BlogInputDto } from '../../../src/blogs/dto/blog.input-dto';

/*Создаем функцию "getBlogDto()", возвращающую DTO с корректными данными водителя, для целей тестирования.*/
export function getBlogDto(): BlogInputDto {
  return {
    name: 'Blog 001',
    description: 'Description of Blog 001',
    websiteUrl: 'https://www.example.com/in/blog-001/',
  };
}
