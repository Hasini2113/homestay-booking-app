// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Switch } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext'; // dark mode, etc.
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

export default function Navbar(){
  const { state, dispatch } = useContext(AppContext);
  const { user, logout } = useAuth();

  // Minimal bar before login:
  if (!user) {
    return (
      <AppBar position="static">
        <Toolbar>

          <IconButton edge="start" color="inherit" sx={{mr:2}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{flexGrow:1}}>Homestay Finder</Typography>
          {/* optionally show signup/login here, but we hide them because the routes show pages */}
        </Toolbar>
      </AppBar>
    );
  }

  // Full navbar after login:
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{mr:2}} component={RouterLink} to="/">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{flexGrow:1}}>
          Homestay Finder
        </Typography>

        <Button color="inherit" component={RouterLink} to="/homestays">Homestays</Button>
  <Button color="inherit" component={RouterLink} to="/explore">Explore</Button>
        <Button color="inherit" component={RouterLink} to="/guide">Guides</Button>
        <Button color="inherit" component={RouterLink} to="/host">Host</Button>
        <Button color="inherit" component={RouterLink} to="/booking">Bookings</Button>
        <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>
        

        <Switch checked={state.darkMode} onChange={()=>dispatch({type:'TOGGLE_DARK'})} />

        <Typography variant="body2" sx={{ml:2, mr:1}}>{user.email}</Typography>
        <Button color="inherit" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
