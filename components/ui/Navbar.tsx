"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Product Category", href: "/product-category" },
    { name: "Products", href: "/products" },
    { name: "Variants", href: "/variants" },
  ];

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const styles = {
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <nav
      className="bg-gray-800 shadow-sm border-b border-gray-700"
      style={styles}
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            {/* Logo removed */}
            {user && (
              <div className="hidden sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const isActive =
                    pathname.startsWith(item.href) &&
                    (item.href !== "/" || pathname === "/");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "border-blue-400 text-white"
                          : "border-transparent text-gray-300 hover:border-gray-400 hover:text-white"
                      }`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center ml-auto gap-4">
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                >
                  {user.name}
                </Typography>
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Avatar
                    sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1.5, // Add margin top to separate from navbar
                      },
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      router.push("/profile");
                    }}
                    sx={{ fontFamily: "Poppins" }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{ fontFamily: "Poppins" }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/login")}
                sx={{ fontFamily: "Poppins", textTransform: "none" }}
              >
                Login
              </Button>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2 px-4">
            {user &&
              navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    pathname.startsWith(item.href)
                      ? "border-blue-400 bg-gray-700 text-white"
                      : "border-transparent text-gray-300 hover:border-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            <div className="border-t border-gray-700 mt-4 pt-4">
              {user ? (
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div
                      className="text-base font-medium text-white"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {user.name}
                    </div>
                    <div
                      className="text-sm font-medium text-gray-400"
                      style={{ fontFamily: "Poppins" }}
                    >
                      {user.email}
                    </div>
                  </div>
                </div>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/login")}
                  sx={{ mt: 1, fontFamily: "Poppins" }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
