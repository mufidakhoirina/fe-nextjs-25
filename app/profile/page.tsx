"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Box, Button, Typography, Paper, Divider, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/services/api";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  if (!user) {
    return null; // or loading spinner
  }

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      setDeleting(true);
      try {
        const response = await api.post("/delete-account");
        if (response.data.status) {
          toast.success("Account deleted successfully");
          logout();
        } else {
          toast.error("Failed to delete account");
        }
      } catch (error) {
        toast.error("Failed to delete account");
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 800,
        mx: "auto",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, color: "#374151", mb: 4, fontFamily: "Poppins" }}
      >
        My Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontFamily: "Poppins" }}
            >
              Full Name
            </Typography>
            <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
              {user.name}
            </Typography>
          </Box>

          <Divider />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Box flex={1}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontFamily: "Poppins" }}
              >
                Username
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
                @{user.username}
              </Typography>
            </Box>

            <Box flex={1}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontFamily: "Poppins" }}
              >
                Email Address
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
                {user.email}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontFamily: "Poppins" }}
            >
              Joined On
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
              {new Date(user.created_at).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          <Divider />

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              color="error"
              gutterBottom
              sx={{ fontFamily: "Poppins" }}
            >
              Danger Zone
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph
              sx={{ fontFamily: "Poppins" }}
            >
              Once you delete your account, there is no going back. Please be
              certain.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDeleteAccount}
              disabled={deleting}
              sx={{ fontFamily: "Poppins", textTransform: "none" }}
            >
              {deleting ? "Deleting..." : "Delete My Account"}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
