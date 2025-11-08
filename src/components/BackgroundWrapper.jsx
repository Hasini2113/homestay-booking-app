// src/components/BackgroundWrapper.jsx
import React from "react";
import { Box } from "@mui/material";
import mainBg from "../assets/mainbackground.jpg";

export default function BackgroundWrapper({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${mainBg})`,
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
