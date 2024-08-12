import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./stylesSheets/alignments.css";
import "./stylesSheets/custom.css";
import "./stylesSheets/form-elements.css";
import "./stylesSheets/sizes.css";
import "./stylesSheets/theme.css";
import ProtectedRoute from "./components/ProtectedRoutes";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import TheatreForm from "./pages/Profile/TheatreForm";
import TheatreForMovie from "./pages/TheatreForMovie";
import BookShow from "./pages/BookShow";
import { useSelector } from "react-redux";
import { ThaknYouPage } from "./pages/Layout/ThankYou.js";
import { PaymentErrorPage } from "./pages/Layout/PaymentErrorPage/index.js";

function App() {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div className="App">
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheatreForMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThaknYouPage />} />
          <Route path="/payment-failed" element={<PaymentErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
