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

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  product_category_id: number;
  product_category?: Category;
}

interface Variant {
  id: number;
  product_id: number;
  product_category_id: number;
  nama_varian: string;
  stok: number;
  harga: number;
  product?: Product;
  category?: Category;
}

export default function VariantsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/variants");
      if (response.data.status && Array.isArray(response.data.data)) {
        setRows(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this variant?")) {
      try {
        await api.delete(`/variants/${id}`);
        toast.success("Variant deleted successfully");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete variant");
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "nama_varian",
      headerName: "Variant Name",
      flex: 1,
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      valueGetter: (params: any) => params?.name || "N/A",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter: (params: any) => params?.name || "N/A",
    },
    {
      field: "stok",
      headerName: "Stock",
      width: 100,
      type: "number",
    },
    {
      field: "harga",
      headerName: "Price",
      width: 150,
      type: "number",
      valueFormatter: (params: any) => {
        if (params.value == null) return "";
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(params.value);
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Variant>) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => router.push(`/variants/edit/${params.row.id}`)}
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
          Product Variants
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/variants/create")}
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
