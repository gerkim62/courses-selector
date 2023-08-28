import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[85.6vh] overflow-hidden">
        <Outlet /> {/* Render the child route's content here */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
