"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RecurAuthForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    subscriptionId:"",
    customerGUID: "",
    clientRefId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "recurauth": {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
        "subscriptionId": form.subscriptionId,
        "customerGUID": form.customerGUID,
        "clientRefId": form.clientRefId,
      },
    };

      console.log("Submitting:", payload);

      const data = await fetch("/api/recurauth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });
      const result = await data.json();
      alert(result["transactionResponse"]["responseReasonText"]);

  ;
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        RecurAuth
      </Typography>
      <TextField label="Subscription Id" name="subscriptionId" type="number" value={form.subscriptionId} onChange={handleChange} required />

      <TextField label="Customer GUID" name="customerGUID" type="text" value={form.customerGUID} onChange={handleChange} required />

      <TextField label="Client Ref Id (optional)" name="clientRefId" type="text" value={form.clientRefId} onChange={handleChange}/>

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
