import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import Homepage from "./pages/Homepage";
import Loading from "./components/Loading";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layout/Layout";

const LazyRecipePage = lazy(() => import("./pages/Recipe"));
const LazyBrowse = lazy(() => import("./pages/Browse"));

// TODO: Search form
// TODO: Login / Register
// TODO: Use Firebase to store user data
// TODO: Bookmark page
// TODO: Print recipe
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/recipe/:id" element={<LazyRecipePage />} />
              <Route path="/browse" element={<LazyBrowse />} />
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
