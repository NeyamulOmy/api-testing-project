"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DirectSaleForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    amount:"",
    currency:"KYD",
    customerVaultId: "4ltVqNpOd60cRgO"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "sale": {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
        "currency": form.currency,
        "amount": form.amount,
        "customer-vault-id": form.customerVaultId
      },
    };

      console.log("Submitting:", payload);

      const data = await fetch("/api/saved-card-sale", {
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
        Saved Card Sale
      </Typography>
      <TextField label="Customer Vault Id" name="customerVaultId" value={form.customerVaultId} onChange={handleChange} required />

      <FormControl fullWidth required>
        <InputLabel>Currency</InputLabel>
        <Select name="currency" value={form.currency} label="Currency" onChange={handleChange}>
          <MenuItem value="KYD">KYD</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
      </FormControl>

      <TextField label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} required />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
