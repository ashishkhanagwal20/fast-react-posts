// import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import AppLayout from './ui/AppLayout';
// import Error from './ui/Error';
// import Home from './ui/Home';
// import BlogForm from './features/blogs/BlogForm';

// import Users from './features/users/Users';
// import LoginForm from './features/auth/LoginForm';
// import SignupForm from './features/auth/SignupForm';
// import { AuthProvider, useAuth } from './services/Authcontext';
// import { QueryClient, QueryClientProvider } from 'react-query';
// // import BlogItem from './features/blogs/BlogItem';
// const queryClient = new QueryClient();
// interface PrivateRouteProps {
//   element: JSX.Element;
// }

// const PrivateRoute = ({ element }: PrivateRouteProps): JSX.Element => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? element : <LoginForm />;
// };

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//       {
//         path: '/blogs',
//         element: <Home />,
//       },
//       {
//         path: '/blog/new',
//         element: <BlogForm />,
//       },
//       // {
//       //   path: '/blog/:blogId',
//       //   element: <PrivateRoute element={<BlogItem />} />,
//       // },
//       {
//         path: '/users',
//         element: <PrivateRoute element={<Users />} />,
//       },
//       {
//         path: '/login',
//         element: <LoginForm />,
//       },
//       {
//         path: '/signup',
//         element: <SignupForm />,
//       },
//     ],
//   },
// ]);

// const App = (): JSX.Element => {
//   return (
//     <AuthProvider>
//        <QueryClientProvider client={queryClient}>
//       <RouterProvider router={router} />
//       </QueryClientProvider>
//     </AuthProvider>
//   );
// };

// export default App;


import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './ui/Home';
import BlogForm from './features/blogs/BlogForm';
import Users from './features/users/Users';
import LoginForm from './features/auth/LoginForm';
import SignupForm from './features/auth/SignupForm';
import { AuthProvider } from './services/Authcontext';
import { useAuth } from './services/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { useEffect } from 'react';
// import { VoteProvider } from './services/VoteContext';
// Initialize react-query's QueryClient
const queryClient = new QueryClient();

// Define PrivateRoute component to handle authentication checks
interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to LoginForm if not authenticated
  return isAuthenticated ? element : <LoginForm />;
};

// Create router configuration
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blogs',
        element: <Home />,
      },
      {
        path: '/blog/new',
        element: <BlogForm />,
      },
      {
        path: '/users',
        element: <PrivateRoute element={<Users />} />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/signup',
        element: <SignupForm />,
      },
    ],
  },
]);

// Main App component
const App = (): JSX.Element => {
  
  return (
    <AuthProvider> {/* Ensure AuthProvider wraps your entire application */}
        
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        
    </AuthProvider>
  );
};

export default App;

