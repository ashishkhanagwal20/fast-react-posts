import { useAuth } from '../services/useAuth';
import Blogs from '../features/blogs/Blogs';
import LinkButton from './LinkButton';
import { useQuery } from 'react-query';
import { fetchBlogs } from '../services/blogServices';

// import Users from '../features/users/Users';
// import Loader from './Loader';

const Home = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated>>>>>>", isAuthenticated);

 
  const { data: blogs, isLoading, isError, error } = useQuery('blogs', fetchBlogs);

  console.log("isAuthenticated>>>>>>", isAuthenticated);

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <div className="flex">
          {/* <aside className="hidden lg:block w-64 bg-gray-100 h-full fixed left-0 top-0 mt-20 pt-4">
            <div className="px-4">
              <h2 className="text-xl font-semibold mb-4">Post Titles</h2>
              <ul>
                {blogs?.map((blog) => (
                  <li key={blog.Post.id} className="mb-2">
                    {blog.Post.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside> */}
          <main className="flex-grow">
            <Blogs />
          </main>
        </div>
      ) : (
        <div className="my-10 px-4 text-center sm:my-16">
          <h1 className="my-32 text-stone-500 text-xl font-semibold md:text-3xl">
            Welcome to the Blog
          </h1>
          <h2 className="my-40 text-stone-500 text-lg font-semibold md:text-xl">
            Please <LinkButton to="/login">Login</LinkButton> or <LinkButton to="/signup">Sign Up</LinkButton> to see the posts.
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
