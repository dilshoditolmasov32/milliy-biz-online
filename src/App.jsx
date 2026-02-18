import AOS from "aos";
import { useEffect, useState, lazy, Suspense, useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scrollTop/ScrollTop.jsx";
import MediaNav from "./components/media/MediaNav.jsx";
import AuthModal from "./auth/AuthModal.jsx"

import ProtectedRoute from "./auth/context/ProtectedRoute.jsx";
import { AuthContext } from "./auth/context/AuthContext";

import "./styles/scss/main.css";
import "aos/dist/aos.css";

const Home = lazy(() => import("./pages/home/Home.jsx"));
const Products = lazy(() => import("./pages/products/Products"));
const SingleProduct = lazy(() => import("./pages/single-page/SingleProduct"));
const Basket = lazy(() => import("./pages/basket/Basket.jsx"));
const UserProfile = lazy(() => import("./pages/account/UserProfile"));
const NotFoundPage = lazy(() => import("./pages/404/NotFoundPage.jsx"));

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthOpen, closeAuth } = useContext(AuthContext);
  const { t } = useTranslation;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <>
      <ScrollToTop/>
      <Suspense
      >
        <AuthModal onClose={closeAuth} />

        <Header
          st={isSearch}
          sfunc={setIsSearch}
          state={isOpen}
          func={setIsOpen}
        />


        <div className="app-page">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/basket" element={<Basket />} />

          <Route
            path="/account/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route path="/auth" element={<AuthModal />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
         <Footer />
      <MediaNav />
      </Suspense>

     

      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </>
  );
}

export default App;
