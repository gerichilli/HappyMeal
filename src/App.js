import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Homepage from "./pages/Homepage";
import Loading from "./components/Loading";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layout/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./auth/Login";
import { fetchBookmarks } from "./redux/thunks/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastestRecipes, fetchRandomRecipes } from "./redux/thunks/recipeThunk";

const LazyRecipePage = lazy(() => import("./pages/Recipe"));
const LazySearch = lazy(() => import("./pages/Search"));
const LazyCategoryList = lazy(() => import("./pages/Category/CategoryList"));
const LazyCategory = lazy(() => import("./pages/Category"));
const LazyAreaList = lazy(() => import("./pages/Area/AreaList"));
const LazyArea = lazy(() => import("./pages/Area"));
const LazyIngredientList = lazy(() => import("./pages/Ingredient/IngredientList"));
const LazyIngredient = lazy(() => import("./pages/Ingredient"));
const LazyBrowse = lazy(() => import("./pages/Browse"));
const LazyRegister = lazy(() => import("./auth/Register"));
const LazyForgotPassword = lazy(() => import("./auth/ForgotPassword"));
const LazyBookmark = lazy(() => import("./pages/Bookmark"));
const LazyProfile = lazy(() => import("./pages/Profile"));

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.account.userId);

  useEffect(() => {
    if (userId) {
      dispatch(fetchBookmarks(userId));
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchLastestRecipes());
    dispatch(fetchRandomRecipes());
  }, []);

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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<LazyRegister />} />
              <Route path="/forgot-password" element={<LazyForgotPassword />} />
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
