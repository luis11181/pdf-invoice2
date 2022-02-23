import React, { Suspense } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

import "./App.css";

import { Counter } from "./pages/CounterPage";
import RequireAuth from "./components/middleware/RequireAuth";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Layout>
      {
        //* suspense with  React.lazy(() => import("./pages/NewQuote")) let us only load the component that is being deployed at first, so it will only load the initial page or the one we visit or want, and later the other ones
      }
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signIn" element={<AuthPage />} />
        <Route path="/crear-comprobante" element={<AuthPage />} />
        <Route
          path="/counter"
          element={
            <RequireAuth>
              <Counter />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
