import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import HomestayCard from "../components/HomestayCard";
import { Typography, CircularProgress, Box, Paper } from "@mui/material";
import { AppContext } from "../context/AppContext";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function Homestays() {
  const { data, loading, error } = useFetch("/data/homestays.json");
  const { dispatch } = useContext(AppContext);

  function handleBook(item) {
    const booking = { ...item, id: Date.now(), date: new Date().toISOString() };
    dispatch({ type: "ADD_BOOKING", payload: booking });
    alert("Booked: " + item.title);
  }

  if (loading)
    return (
      <BackgroundWrapper>
        <CircularProgress sx={{ color: "white" }} />
      </BackgroundWrapper>
    );

  if (error)
    return (
      <BackgroundWrapper>
        <Typography color="error">Failed to load homestays.</Typography>
      </BackgroundWrapper>
    );

  return (
    <BackgroundWrapper>
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 5,
          maxWidth: "1300px",
          mx: "auto",
          backgroundColor: "rgba(255, 255, 255, 0.2)", // light and translucent
          backdropFilter: "blur(14px)",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.25)",
          color: "#fff",
        }}
      >
        {/* 🏡 Heading */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 900,
            mb: 5,
            color: "#000", // ✅ black text
            textShadow: "1px 1px 4px rgba(255,255,255,0.7)", // subtle glow for readability
            letterSpacing: "1.2px",
          }}
        >
          Available Homestays
        </Typography>

        {/* 💠 Card Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: 4,
            px: 1,
          }}
        >
          {data.map((h) => (
            <Box
              key={h.id}
              sx={{
                borderRadius: 4,
                backgroundColor: "rgba(255,255,255,0.25)",
                boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                },
              }}
            >
              <HomestayCard item={h} onBook={handleBook} />
            </Box>
          ))}
        </Box>
      </Paper>
    </BackgroundWrapper>
  );
}
