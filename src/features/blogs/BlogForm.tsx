
import { useNavigate, Form } from "react-router-dom";
import Button from "../../ui/Button";
import { useState, FormEvent } from "react";
import { addBlog } from "../../services/blogServices";
import { useAuth } from '../../services/useAuth';
const BlogForm = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const blogData = {
      title,
      content,
      published: true, // or set based on checkbox value
    };

    try {
      const data = await addBlog(blogData);
      console.log('Blog added successfully:', data);

       
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
    login();
    navigate('/');
  };

  return (
    <div>
      <h1 className='mb-4 text-2xl text-yellow-600 md:text-base'>Add Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Form method="POST" onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input grow"
            placeholder="Title..."
          />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Content</label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
           className="input grow h-32 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
            placeholder="Content..."
          />
        </div>
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="publish"
            id="publish"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="publish" className="font-medium">
            Want to Publish your Post?
          </label>
        </div>
        <Button disabled={false} type="primary">
          Add Post
        </Button>
      </Form>
    </div>
  );
}

export default BlogForm;
