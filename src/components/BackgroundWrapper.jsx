// src/components/BackgroundWrapper.jsx
import React from "react";
import { Box } from "@mui/material";

export default function BackgroundWrapper({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/mainbackground.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
        textAlign: "center",
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Box>
  );
}
