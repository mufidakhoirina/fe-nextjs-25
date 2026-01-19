"use client";

import Layout from "@/components/ui/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Page() {
  return (
    <Layout>
      <h1 className="text-black text-2xl font-bold">Create Product Category</h1>
      <form action="">
        <div className="grid grid-cols-1 gap-4 my-4">
          <TextField id="name" label="Name" variant="standard" />
          <TextField
            name="description"
            id="description"
            label="Description"
            variant="standard"
          />
        </div>
        <Button variant="contained">Submit</Button>
      </form>
    </Layout>
  );
}

