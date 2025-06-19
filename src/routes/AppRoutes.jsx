import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import TrailerPlayerPage from "../pages/TrailerPlayePager";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
        
      } />
      <Route path="/watch/:movieId/:videoKey" element={
        <ProtectedRoute>
          <TrailerPlayerPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;