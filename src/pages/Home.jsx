// src/pages/Home.jsx
import React from "react";
import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/mainbackground.jpg')", // Ensure this image is in the public folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.6)" }}
      >
        Welcome to Homestay Finder
      </Typography>

      <Typography
        variant="h6"
        sx={{ maxWidth: 600, textShadow: "1px 1px 6px rgba(0,0,0,0.5)" }}
      >
        Find local homestays and nearby attractions with expert local guide tips.
      </Typography>
    </Box>
  );
}
