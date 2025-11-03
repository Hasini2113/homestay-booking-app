import React from "react";
import { Typography, Paper, Box, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import BackgroundWrapper from "../components/BackgroundWrapper";

export default function Admin() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const hosts = JSON.parse(localStorage.getItem("hosted")) || [];

  return (
    <BackgroundWrapper>
      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          maxWidth: 900,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Admin Dashboard
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Registered Users
        </Typography>
        {users.length === 0 ? (
          <Typography color="text.secondary">No users registered.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u, i) => (
                <TableRow key={i}>
                  <TableCell>{u.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Hosted Homestays
        </Typography>
        {hosts.length === 0 ? (
          <Typography color="text.secondary">No homestays listed.</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hosts.map((h, i) => (
                <TableRow key={i}>
                  <TableCell>{h.title}</TableCell>
                  <TableCell>{h.description}</TableCell>
                  <TableCell>₹{h.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </BackgroundWrapper>
  );
}
