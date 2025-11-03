// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link as RouterLink } from "react-router-dom";

export default function ForgotPassword(){
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ ok:null, msg:"" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ok:null, msg:"" });
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({ ok:true, msg: "Reset email sent. Check your mailbox (and Promotions/Spam)." });
    } catch (err) {
      setStatus({ ok:false, msg: err.message || "Failed to send reset email." });
    }
  };

  return (
    <Box sx={{ maxWidth:480, mx:"auto", mt:8, p:3 }}>
      <Typography variant="h5" gutterBottom>Forgot Password</Typography>
      {status.ok === true && <Alert severity="success" sx={{mb:2}}>{status.msg}</Alert>}
      {status.ok === false && <Alert severity="error" sx={{mb:2}}>{status.msg}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Your registered email"
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          fullWidth required sx={{mb:2}}
        />
        <Button type="submit" variant="contained" fullWidth>Send reset email</Button>
      </form>
      <Typography sx={{mt:2}}>
        Remembered? <RouterLink to="/login">Login</RouterLink>
      </Typography>
    </Box>
  )
}
