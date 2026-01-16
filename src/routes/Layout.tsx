import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  const location = useLocation();

  const routes = ["/login", "/register", "/dashboard"];
  const hideNavbar = routes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="grow">
        <Outlet />
      </main>
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default Layout;
