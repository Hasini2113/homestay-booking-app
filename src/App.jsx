// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
} from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Homestays from "./pages/Homestays";
import Host from "./pages/Host";
import Booking from "./pages/Booking";
import Guide from "./pages/Guide";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { AppContext } from "./context/AppContext";
import { useAuth } from "./context/AuthContext";

import loginBg from "./assets/loginbackground.jpg";
import mainBg from "./assets/mainbackground.jpg";

export default function App() {
  const { state } = useContext(AppContext);
  const { user, initializing } = useAuth();

  // 🎨 Custom Theme with Typography Styles
  const theme = createTheme({
    palette: {
      mode: state.darkMode ? "dark" : "light",
      background: {
        default: state.darkMode ? "#121212" : "#fafafa",
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontWeight: 700,
        fontSize: "2.4rem",
        letterSpacing: "0.5px",
      },
      h2: {
        fontWeight: 600,
        fontSize: "2rem",
      },
      h3: {
        fontWeight: 500,
        fontSize: "1.75rem",
      },
      h4: {
        fontWeight: 500,
        fontSize: "1.5rem",
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.25rem",
      },
      h6: {
        fontWeight: 400,
        fontSize: "1rem",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: state.darkMode ? "#e0e0e0" : "#333",
      },
      body2: {
        fontSize: "0.9rem",
        lineHeight: 1.5,
        color: state.darkMode ? "#cfcfcf" : "#555",
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: "0.5px",
        fontSize: "0.95rem",
      },
    },
  });

  // 🔒 Universal ProtectedRoute (uses actual user.role)
  const ProtectedRoute = ({ element, allowedRole }) => {
    if (initializing) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRole && user.role !== allowedRole) {
      return <Navigate to="/" replace />;
    }
    return element;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 🔷 Background setup */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${user ? mainBg : loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          {user && <Navbar />}

          <Container sx={{ mt: user ? 4 : 0, mb: 4 }}>
            <Routes>
              {/* 🔓 Public routes */}
              {!user ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              ) : (
                <>
                  {/* 🔐 Authenticated routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/homestays" element={<Homestays />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/guide" element={<Guide />} />

                  {/* 🎯 Role-based protected routes */}
                  <Route
                    path="/host"
                    element={<ProtectedRoute element={<Host />} allowedRole="host" />}
                  />
                  <Route
                    path="/admin"
                    element={<ProtectedRoute element={<Admin />} allowedRole="admin" />}
                  />

                  {/* 🚫 Redirect logged-in users away from auth pages */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/signup" element={<Navigate to="/" replace />} />
                  <Route
                    path="/forgot-password"
                    element={<Navigate to="/" replace />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
