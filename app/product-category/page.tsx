"use client";

import Layout from "@/components/ui/Layout";
import { service } from "@/services/services";
import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Link from "next/link";
const rows: GridRowsProp = [
  { id: 1, name: "Data Grid", description: "the Community version" },
  { id: 2, name: "Data Grid Pro", description: "the Pro version" },
  { id: 3, name: "Data Grid Premium", description: "the Premium version" },
];

const columns: GridColDef[] = [
  { field: "name", headerName: "Product Name", width: 200 },
  { field: "description", headerName: "Description", width: 300 },
];

export default function Page() {
  const [rows, setRows] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
    const response = await service("categories");
    if (!response.error) {
      setRows(response.data);
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div className="flex w-full items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-zinc-900">Product Category</h1>
        <Link href="/product-category/create">
          <Button variant="contained">Add New</Button>
        </Link>
      </div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </Layout>
  );
}
