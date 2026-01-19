"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/utils/theme";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/ui/Navbar";
import AuthGuard from "@/components/AuthGuard";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AuthGuard>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            {children}
          </div>
        </AuthGuard>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
  );
}
