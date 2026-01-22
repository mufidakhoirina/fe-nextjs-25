"use client";

import Layout from "@/components/ui/Layout";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: "#374151", fontSize: "18px" }}
        >
          Home
        </Typography>
      </Box>
    </Layout>
  );
}
