import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TrailerPlayerPage from "./pages/TrailerPlayePager";
import { AuthProvider } from "./auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/watch/:movieId/:videoKey"
            element={<TrailerPlayerPage />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
