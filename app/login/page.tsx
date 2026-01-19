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

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/login", formData);
      if (response.data.status) {
        toast.success("Login successful");
        login(response.data.token, response.data.data);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
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
          Login
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
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
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ fontFamily: "Poppins" }}>
            Don't have an account?{" "}
            <MuiLink component={Link} href="/register">
              Sign up
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
