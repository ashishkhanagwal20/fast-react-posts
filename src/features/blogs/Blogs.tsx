import React from 'react';
import { useQuery } from 'react-query';
import { fetchBlogs } from '../../services/blogServices'; // Adjust path as per your file structure
import BlogItem from './BlogItem'; // Assuming BlogItem component is defined correctly

interface BlogOwner {
  id: number;
  email: string;
  created_at: string;
}

interface BlogPost {
  title: string;
  content: string;
  published: boolean;
  id: number;
  created_at: string;
  owner_id: number;
  owner: BlogOwner;
}

interface Blog {
  Post: BlogPost;
  votes: number;
}

const Blogs: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<Blog[], Error>('blogs', fetchBlogs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Blogs</h2>
      {data?.map((blog: Blog) => (
        <BlogItem key={blog.Post.id} post={blog} />
      ))}
    </div>
  );
};

export default Blogs;
