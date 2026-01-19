"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

const PUBLIC_PATHS = ["/login", "/register"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user && !PUBLIC_PATHS.includes(pathname)) {
        router.push("/login");
      } else if (user && PUBLIC_PATHS.includes(pathname)) {
        router.push("/");
      }
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Prevent flash of protected content while redirecting
  if (!user && !PUBLIC_PATHS.includes(pathname)) {
    return null;
  }

  // Prevent flash of login page when already logged in
  if (user && PUBLIC_PATHS.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
