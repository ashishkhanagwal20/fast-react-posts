
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import Users from "../features/users/Users";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <div className="flex overflow-hidden">
        {/* <main className="flex-grow mx-auto max-w-3xl overflow-y-auto"> */}
        <main className="mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-7xl overflow-y-auto no-scrollbar">
          <Outlet />
          </main>
        {/* <aside className="hidden lg:block w-64 bg-gray-100 h-full fixed right-0 top-0 mt-20 pt-4">
          <Users />
        </aside> */}
       
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
