import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
interface ButtonProps {
    children: ReactNode;
    to: string;
  }
function LinkButton({ children, to }:ButtonProps) {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';
  const loginClass = 'inline-block text-sm rounded-full bg-green-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-green-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed  px-4 py-2 md:px-5 md:py-2.5'
  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={loginClass}>
      {children}
    </Link>
  );
}

export default LinkButton;
