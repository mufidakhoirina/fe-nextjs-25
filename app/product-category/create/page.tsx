"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import api from "@/services/api";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/categories", formData);
      toast.success("Category created successfully");
      router.push("/product-category");
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error("Operation failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/product-category")}
        sx={{ mb: 3 }}
      >
        Back to Categories
      </Button>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, color: "#374151", fontSize: "18px", mb: 3 }}
      >
        Create New Category
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => router.push("/product-category")}
              color="inherit"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
