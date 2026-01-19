"use client";

import Layout from "@/components/ui/Layout";
import { Box, Typography, Grid, Paper } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import LayersIcon from "@mui/icons-material/Layers";

export default function Home() {
  const stats = [
    {
      title: "Product Category",
      value: "Manage",
      icon: <CategoryIcon fontSize="large" color="primary" />,
      href: "/product-category",
    },
    {
      title: "Products",
      value: "Manage",
      icon: <InventoryIcon fontSize="large" color="secondary" />,
      href: "/products",
    },
    {
      title: "Variants",
      value: "Manage",
      icon: <LayersIcon fontSize="large" color="success" />,
      href: "/variants",
    },
  ];

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: "#374151", fontSize: "18px" }}
        >
          Dashboard
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                component="a"
                href={stat.href}
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                <Typography variant="h6" color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
