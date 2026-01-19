"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import api from "@/services/api";

// Types
interface Category {
  id: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export default function ProductCategoriesPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/categories");
      if (response.data.status && Array.isArray(response.data.data)) {
        setRows(response.data.data);
      } else {
        setRows([]);
        console.error("Unexpected API response format", response.data);
      }
    } catch (error) {
      toast.error("Failed to load categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success("Category deleted successfully");
        fetchCategories();
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Category>) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() =>
                router.push(`/product-category/edit/${params.row.id}`)
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, color: "#374151", fontSize: "18px" }}
        >
          Product Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/product-category/create")}
          color="primary"
        >
          Add New
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: "100%", overflow: "hidden" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
