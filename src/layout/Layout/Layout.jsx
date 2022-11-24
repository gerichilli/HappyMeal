import Header from "../Header";
import Footer from "../Footer";
import ScrollToTop from "../../components/ScrollToTop";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <ScrollToTop>
      <div className="page-container">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollToTop>
  );
}

export default Layout;
