"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function CancelSubscriptionForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    subscriptionId:"",
    customerGUID: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "cancel-subscription": {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
        "subscriptionId": form.subscriptionId,
        "customerGUID": form.customerGUID,
      },
    };

      console.log("Submitting:", payload);

      const data = await fetch("/api/cancel-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });
      const result = await data.json();
      alert(result["response"]["result-text"]);

  ;
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Cancel Subscription
      </Typography>
      <TextField label="Subscription Id" name="subscriptionId" type="number" value={form.subscriptionId} onChange={handleChange} required />

      <TextField label="Customer GUID" name="customerGUID" type="text" value={form.customerGUID} onChange={handleChange} required />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
