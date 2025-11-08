import React, { useState, useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  Popover,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { CalendarMonth, ExpandMore, Add, Remove, Person } from "@mui/icons-material";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DESTINATIONS = [
  "Goa",
  "Mukteshwar",
  "Kasol",
  "Mumbai",
  "Gokarna",
  "Malvan",
  "Delhi",
  "Coonoor",
  "Jibhi",
];

export default function Explore() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(DESTINATIONS);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestsAnchorEl, setGuestsAnchorEl] = useState(null);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  // helper to build search params from current form state
  const buildSearchParams = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    if (adults || children) params.set("guests", `${adults},${children}`);
    return params.toString();
  };

  const handleGuestsClick = (event) => {
    setGuestsAnchorEl(event.currentTarget);
  };

  const handleGuestsClose = () => {
    setGuestsAnchorEl(null);
  };

  const guestsOpen = Boolean(guestsAnchorEl);
  const guestsPopoverId = guestsOpen ? 'guests-popover' : undefined;

  const handleAdultsChange = (delta) => {
    const newValue = adults + delta;
    if (newValue >= 1 && newValue <= 10) {
      setAdults(newValue);
    }
  };

  const handleChildrenChange = (delta) => {
    const newValue = children + delta;
    if (newValue >= 0 && newValue <= 6) {
      setChildren(newValue);
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault?.();
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      setResults(DESTINATIONS);
      return;
    }
    setResults(DESTINATIONS.filter((d) => d.toLowerCase().includes(q)));
  };

  const handleDestinationClick = (d) => {
    // navigate to homestays and pass all search params
    const params = new URLSearchParams();
    params.set('q', d);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (adults || children) params.set('guests', `${adults},${children}`);
    navigate(`/homestays?${params.toString()}`);
  };

  const visible = useMemo(() => results, [results]);

  return (
    <BackgroundWrapper>
      <Paper
        elevation={10}
        sx={{
          maxWidth: 1100,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        {/* If user is not logged in, show buttons that navigate to full auth pages */}
        {!user && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                const qs = buildSearchParams();
                navigate(`/login${qs ? `?${qs}` : ""}`);
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const qs = buildSearchParams();
                navigate(`/signup${qs ? `?${qs}` : ""}`);
              }}
            >
              Sign up
            </Button>
          </Box>
        )}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Book your ideal Homestay - Villas, Apartments & more
          </Typography>

          <Box component="form" onSubmit={handleSearch}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="City, Property Name or Location"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Check-In"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Check-Out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarMonth />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField
                  fullWidth
                  label="Guests"
                  value={`${adults} Adults${children ? `, ${children} Children` : ''}`}
                  onClick={handleGuestsClick}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ExpandMore />
                      </InputAdornment>
                    ),
                  }}
                />
                <Popover
                  id={guestsPopoverId}
                  open={guestsOpen}
                  anchorEl={guestsAnchorEl}
                  onClose={handleGuestsClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  PaperProps={{
                    sx: { width: '300px', p: 2 }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Adults</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleAdultsChange(-1)} disabled={adults <= 1}>
                          <Remove />
                        </IconButton>
                        <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>{adults}</Typography>
                        <IconButton size="small" onClick={() => handleAdultsChange(1)} disabled={adults >= 10}>
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Children</Typography>
                        <Typography variant="caption" color="text.secondary">0-17 years old</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleChildrenChange(-1)} disabled={children <= 0}>
                          <Remove />
                        </IconButton>
                        <Typography sx={{ minWidth: '20px', textAlign: 'center' }}>{children}</Typography>
                        <IconButton size="small" onClick={() => handleChildrenChange(1)} disabled={children >= 6}>
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                      Please provide right number of children along with their right age for best options and prices.
                    </Typography>
                  </Box>
                  <Button 
                    fullWidth
                    variant="contained"
                    onClick={handleGuestsClose}
                    startIcon={<Person />}
                  >
                    APPLY
                  </Button>
                </Popover>
              </Grid>
              <Grid item xs={6} md={1} sx={{ display: "flex", alignItems: "center" }}>
                <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSearch}>
                  SEARCH
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Popular Destinations
          </Typography>

          <Grid container spacing={2}>
            {visible.length === 0 ? (
              <Grid item xs={12}>
                <Typography align="center">No destinations match your search.</Typography>
              </Grid>
            ) : (
              visible.map((d) => (
                <Grid key={d} item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={3}
                    onClick={() => handleDestinationClick(d)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      cursor: "pointer",
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 30px rgba(0,0,0,0.18)' },
                    }}
                  >
                    <Avatar sx={{ width: 56, height: 56 }}>{d.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {d}
                      </Typography>
                      <Typography variant="caption">Homestays - Villas & Apts</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Paper>
    </BackgroundWrapper>
  );
}
