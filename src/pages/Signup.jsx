// src/pages/Signup.jsx
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

import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebase"; // your initialized firebase app

const db = getFirestore(app);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validations
    if (!email || !password || !confirmPassword)
      return setError("Please fill in all fields");

    if (password !== confirmPassword)
      return setError("Passwords do not match");

    // Disallow admin/host from signing up via UI
    const lower = email.toLowerCase();
    if (lower.includes("admin") || lower.includes("host")) {
      return setError("Admins and Hosts cannot sign up. Please login instead.");
    }

    // Perform signup
    try {
      const res = await signup(email, password);
      if (res.ok && res.user) {
        const newUser = res.user;
        const uid = newUser.uid;

        // Default role for self-signups
        const role = "user";

        // Save a simple user document in Firestore for admin listing
        await setDoc(doc(db, "users", uid), {
          uid,
          email: newUser.email,
          role,
          createdAt: new Date().toISOString(),
        });

        // Navigate to login or main page (onAuthStateChanged will update app state)
        navigate("/", { replace: true });
      } else {
        setError(res.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
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
          Sign Up
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
