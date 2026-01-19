"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/ui/Navbar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        {children}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}
