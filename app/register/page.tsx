"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import api from "@/services/api";

export default function RegisterPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/register", formData);
      if (response.data.status) {
        toast.success("Registration successful");
        login(response.data.token, response.data.data);
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{ fontWeight: 600, fontFamily: "Poppins" }}
        >
          Sign Up
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ fontFamily: "Poppins", textTransform: "none" }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
            Already have an account?{" "}
            <MuiLink component={Link} href="/login">
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
