"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import api from "@/services/api";

interface Product {
  id: number;
  name: string;
  product_category_id: number;
}

export default function CreateVariantPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    product_id: "",
    product_category_id: "",
    nama_varian: "",
    stok: "",
    harga: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        if (response.data.status && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (e: SelectChangeEvent) => {
    const prodId = Number(e.target.value);
    const selectedProduct = products.find((p) => p.id === prodId);

    setFormData((prev) => ({
      ...prev,
      product_id: e.target.value,
      product_category_id: selectedProduct
        ? selectedProduct.product_category_id.toString()
        : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/variants", formData);
      toast.success("Variant created successfully");
      router.push("/variants");
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
        onClick={() => router.push("/variants")}
        sx={{ mb: 3 }}
      >
        Back to Variants
      </Button>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600, color: "#374151", fontSize: "18px", mb: 3 }}
      >
        Create New Variant
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Variant Name"
            variant="outlined"
            value={formData.nama_varian}
            onChange={(e) =>
              setFormData({ ...formData, nama_varian: e.target.value })
            }
            required
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="product-select-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              value={formData.product_id}
              label="Product"
              onChange={handleProductChange}
              required
            >
              {products.map((prod) => (
                <MenuItem key={prod.id} value={prod.id}>
                  {prod.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Stock"
                type="number"
                variant="outlined"
                value={formData.stok}
                onChange={(e) =>
                  setFormData({ ...formData, stok: e.target.value })
                }
                required
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Price (IDR)"
                type="number"
                variant="outlined"
                value={formData.harga}
                onChange={(e) =>
                  setFormData({ ...formData, harga: e.target.value })
                }
                required
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            Auto-assigned Category ID: {formData.product_category_id || "None"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => router.push("/variants")}
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
              {loading ? "Creating..." : "Create Variant"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
