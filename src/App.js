import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import Homepage from "./pages/Homepage";
import Loading from "./components/Loading";

const LazyRecipePage = lazy(() => import("./pages/Recipe"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/recipe/:id" element={<LazyRecipePage />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
