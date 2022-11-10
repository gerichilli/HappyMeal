import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../../components/ScrollToTop";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <ScrollToTop>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
}

export default Layout;
