import { Helmet } from "react-helmet-async";
import Header from "../Header";
import Footer from "../Footer";
import logo from "../../assets/images/logo.png";
import { BASE_URL } from "../../utils/constants";
import ScrollToTop from "../../components/ScrollToTop";

function Layout({
  children,
  title = "HappyMeal - Less Stress. More Joy",
  description = "Simply Recipes is here to help you cook delicious meals with less stress and more joy. We offer recipes and cooking advice for home cooks, by home cooks.",
  path,
}) {
  const url = path === "/" ? BASE_URL : BASE_URL + path;
  return (
    <ScrollToTop>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={logo} />
        <meta property="twitter:url" content={url} />
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </ScrollToTop>
  );
}

export default Layout;
