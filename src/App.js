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
const LazyBrowse = lazy(() => import("./pages/Browse"));
const LazyLogin = lazy(() => import("./auth/Login"));
const LazyRegister = lazy(() => import("./auth/Register"));

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
              <Route path="/browse/:browseBy" element={<LazyBrowse />} />
              <Route path="/login" element={<LazyLogin />} />
              <Route path="/register" element={<LazyRegister />} />
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
