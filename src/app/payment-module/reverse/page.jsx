"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RefundForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    transactionId: "cd44e68f-059a-356e-86cd-542daee0c401"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "refund": {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
        "transaction-id": form.transactionId
      },
    };

      console.log("Submitting:", payload);

      const data = await fetch("/api/reverse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });
      const result = await data.json();
      alert(result["result-text"]);

  ;
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Refund
      </Typography>
      <TextField label="Transaction Id" name="transactionId" value={form.transactionId} onChange={handleChange} required />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
