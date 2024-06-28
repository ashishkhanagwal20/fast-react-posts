import { Link } from "react-router-dom";
import SearchBlog from "../features/blogs/SearchBlog";
import Username from "../features/users/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        {" "}
        Fast TypeScript Posts
      </Link>
      <SearchBlog />
      <Username />
    </header>
  );
}
