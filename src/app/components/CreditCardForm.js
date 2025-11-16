"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function CreditCardForm({ consumerUrl }) {
  const [form, setForm] = useState({
    card_number: "4012000033330026",
    card_expiry: "11/28",
    card_cvv: "999",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <Box
      component="form"
      method="POST"
      action={consumerUrl}
      sx={{ maxWidth: 400, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Credit Card Details</Typography>

      <TextField
        label="Card Number"
        name="card_number"
        value={form.card_number}
        onChange={handleChange}
        required
      />

        <TextField
          label="Card Expiry Date"
          name="card_expiry"
          value={form.card_expiry}
          onChange={handleChange}
          required
        />

      <TextField
        label="CVV"
        name="card_cvv"
        value={form.card_cvv}
        onChange={handleChange}
        type="password"
        required
      />

      <Button type="submit" variant="contained" sx={{ mt: 1 }}>
        Submit
      </Button>
    </Box>
  );
}
