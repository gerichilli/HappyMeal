import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import Homepage from "./pages/Homepage";
import Loading from "./components/Loading";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layout/Layout";

const LazyRecipePage = lazy(() => import("./pages/Recipe"));
const LazySearch = lazy(() => import("./pages/Search"));
const LazyCategory = lazy(() => import("./pages/Category"));
const LazyArea = lazy(() => import("./pages/Area"));
const LazyIngredient = lazy(() => import("./pages/Ingredient"));

// TODO: Login / Register
// TODO: Use Firebase to store user data
// TODO: Bookmark feature
// TODO: Bookmark page
// TODO: Print recipe
// TODO: Responsive grid and layout
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/recipe/:id" element={<LazyRecipePage />} />
              <Route path="/category/:category" element={<LazyCategory />} />
              <Route path="/area/:area" element={<LazyArea />} />
              <Route path="/ingredient/:ingredient" element={<LazyIngredient />} />
              <Route path="/search/:query" element={<LazySearch />} />
              <Route path="/404" element={<PageNotFound />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
