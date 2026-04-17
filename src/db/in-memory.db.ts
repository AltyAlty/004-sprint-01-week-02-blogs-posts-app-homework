import { Blog } from '../blogs/types/blog';
import { Post } from '../posts/types/post';

/*Моковая БД.*/
export const db = {
  blogs: <Blog[]>[
    {
      id: '1',
      name: 'Blog 001',
      description: 'Description of Blog 001',
      websiteUrl: 'https://www.example.com/in/blog-001/',
    },
    {
      id: '2',
      name: 'Blog 002',
      description: 'Description of Blog 002',
      websiteUrl: 'https://www.example.com/in/blog-002/',
    },
    {
      id: '3',
      name: 'Blog 003',
      description: 'Description of Blog 003',
      websiteUrl: 'https://www.example.com/in/blog-003/',
    },
  ],

  posts: <Post[]>[
    {
      id: '1',
      title: 'Post 001',
      shortDescription: 'P 001',
      content: 'Content 001',
      blogId: '2',
      blogName: 'Blog 002',
    },
    {
      id: '2',
      title: 'Post 002',
      shortDescription: 'P 002',
      content: 'Content 002',
      blogId: '1',
      blogName: 'Blog 001',
    },
  ],
};
