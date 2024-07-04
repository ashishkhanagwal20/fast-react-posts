
// import { useAuth } from '../services/Authcontext';
import { useAuth } from '../services/useAuth';
import Blogs from '../features/blogs/Blogs';
import LinkButton from './LinkButton';
import Users from '../features/users/Users';
const Home = (): JSX.Element => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated>>>>>>",isAuthenticated );
  return (
    <div >
      {isAuthenticated ? (
        <div>
        <Blogs/>
        <aside className="w-64 bg-gray-100">
          <Users />
        </aside>
        </div>
      ) : (
        <div className='my-10 px-4 text-center sm:my-16'>
          <h1 className="my-32 text-stone-500 text-xl font-semibold md:text-3xl">Welcome to the Blog</h1>
          <h2 className='my-40 text-stone-500 text-lg font-semibold md:text-xl'>
            Please {" "} <LinkButton to="/login">Login</LinkButton> or <LinkButton to="/signup">Sign Up</LinkButton> to see the posts.
          </h2>
        </div>
      )}
      
    </div>
  );
};

export default Home;
