"use client";

import { Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component="main" sx={{ p: 0 }}>
      {children}
    </Box>
  );
}
