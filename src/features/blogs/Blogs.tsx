import { useQuery } from 'react-query';
import { fetchBlogs } from '../../services/blogServices'; // Replace with your API function
import BlogItem from './BlogItem'; // Assuming you have a BlogItem component

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
    if (isError) {
        return <div>Error: {error?.message}</div>;
      }
  
      return (
        // <div className="space-y-8 px-1 py-6">
        <div className="container mx-0 px-0 py-6">
          <h2>Recent Blogs</h2>
          {data?.map((blog: Blog) => (
            <BlogItem key={blog.Post.id} post={blog} />
          ))}
          
        </div>
      );
    };
    
    export default Blogs;