import { Blog } from '../types/blog';
import { db } from '../../db/in-memory.db';
import { BlogInputDto } from '../dto/blog.input-dto';

/*Создаем репозиторий "blogsRepository" для работы с данными по блогам в БД.*/
export const blogsRepository = {
  /*Создаем метод "findAll()" для получения данных по всем блогам из БД.*/
  findAll(): Blog[] {
    return db.blogs;
  },

  /*Создаем метод "findById()" для получения данных по блогу по ID из БД.*/
  findById(id: string): Blog | null {
    return db.blogs.find((b) => b.id === id) ?? null;
  },

  /*Создаем метод "create()" для добавления нового блога в БД.*/
  create(newBlog: Blog): Blog {
    db.blogs.push(newBlog);
    return newBlog;
  },

  /*Создаем метод "update()" для изменения данных блога по ID в БД.*/
  update(id: string, dto: BlogInputDto): void {
    const blog = this.findById(id);
    if (!blog) throw new Error('Blog does not exist');
    blog.name = dto.name;
    blog.description = dto.description;
    blog.websiteUrl = dto.websiteUrl;
    return;
  },

  /*Создаем метод "delete()" для удаления блога по ID в БД.*/
  delete(id: string): void {
    const index = db.blogs.findIndex((b) => b.id === id);
    if (index === -1) throw new Error('Blog does not exist');
    db.blogs.splice(index, 1);
    return;
  },
};
