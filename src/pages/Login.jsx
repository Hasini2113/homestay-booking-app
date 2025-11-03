// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Please enter email and password");

    try {
      const res = await login(email, password);

      if (res.ok) {
        // Determine role from email (lowercase to be safe)
        const lower = email.toLowerCase();
        let role = "user";
        if (lower.includes("admin")) role = "admin";
        else if (lower.includes("host")) role = "host";

        // Save role for App routing and persistence
        // We store both simple "role" and also role_<uid> when available
        localStorage.setItem("role", role);
        if (res.user && res.user.uid) {
          localStorage.setItem(`role_${res.user.uid}`, role);
        }

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin", { replace: true });
        } else if (role === "host") {
          navigate("/host", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        // login wrapper returned an error object
        console.error("Login wrapper error:", res);
        setError(res.message || "Login failed");
      }
    } catch (err) {
      // Firebase SDK threw — show friendly message and log details
      console.error("Firebase login error:", err);
      // err.code examples: auth/wrong-password, auth/user-not-found, auth/invalid-email
      setError(err.message || "Authentication error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/loginbackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: 420,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link component={RouterLink} to="/signup">
            Sign up
          </Link>
          <Link component={RouterLink} to="/forgot-password">
            Forgot password?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
