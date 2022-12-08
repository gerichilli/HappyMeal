import { Helmet } from "react-helmet-async";
import { BASE_URL } from "../utils/constants";
import logo from "../assets/images/logo.png";
import { useLocation } from "react-router-dom";

function Seo({
  title = "HappyMeal - Less Stress. More Joy",
  description = "Simply Recipes is here to help you cook delicious meals with less stress and more joy. We offer recipes and cooking advice for home cooks, by home cooks.",
  path,
}) {
  const location = useLocation();
  const url = BASE_URL + (path || location.pathname);

  return (
    <Helmet>
      <title>{title} | HappyMeal</title>
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
  );
}

export default Seo;
