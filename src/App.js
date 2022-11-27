import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import Homepage from "./pages/Homepage";
import Loading from "./components/Loading";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSavedRecipes } from "./services/apiServices";
import { getSavedRecipes } from "./redux/action/recipeAction";

const LazyRecipePage = lazy(() => import("./pages/Recipe"));
const LazySearch = lazy(() => import("./pages/Search"));
const LazyCategoryList = lazy(() => import("./pages/Category/CategoryList"));
const LazyCategory = lazy(() => import("./pages/Category"));
const LazyAreaList = lazy(() => import("./pages/Area/AreaList"));
const LazyArea = lazy(() => import("./pages/Area"));
const LazyIngredientList = lazy(() => import("./pages/Ingredient/IngredientList"));
const LazyIngredient = lazy(() => import("./pages/Ingredient"));
const LazyBrowse = lazy(() => import("./pages/Browse"));
const LazyLogin = lazy(() => import("./auth/Login"));
const LazyRegister = lazy(() => import("./auth/Register"));
const LazyBookmark = lazy(() => import("./pages/Bookmark"));
const LazyProfile = lazy(() => import("./pages/Profile"));

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userId = useSelector((state) => state.user.account.userId);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSavedRecipeIds();
    } else {
      dispatch(getSavedRecipes([]));
    }
  }, [isAuthenticated]);

  async function fetchSavedRecipeIds() {
    const res = await getAllSavedRecipes(userId);

    if (res && res.status === 200) {
      dispatch(getSavedRecipes(res.data));
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/recipe/:id" element={<LazyRecipePage />} />
              <Route path="/category" element={<LazyCategoryList />} />
              <Route path="/category/:category" element={<LazyCategory />} />
              <Route path="/area" element={<LazyAreaList />} />
              <Route path="/area/:area" element={<LazyArea />} />
              <Route path="/ingredient" element={<LazyIngredientList />} />
              <Route path="/ingredient/:ingredient" element={<LazyIngredient />} />
              <Route path="/search/:query" element={<LazySearch />} />
              <Route path="/browse/:browseBy" element={<LazyBrowse />} />
              <Route path="/login" element={<LazyLogin />} />
              <Route path="/register" element={<LazyRegister />} />
              <Route
                path="/bookmark"
                element={
                  <PrivateRoute>
                    <LazyBookmark />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <LazyProfile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={true} />
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
