"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function DirectSaleForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    notificationUrl: "",
    firstName: "",
    email: "",
    street1: "",
    amount:"",
    currency:"KYD",
    city: "",
    country: "KY",
    zip: "",
    returnUrl: "",
    lastName: "",
    state: "",
    phone: "",
    street2: "",
    receiptText: "Transaction successful. Please go back.",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      "sale": {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
        "notificationUrl": form.notificationUrl,
        "firstName": form.firstName,
        "email": form.email,
        "street1": form.street1,
        "city": form.city,
        "currency": form.currency,
        "amount": form.amount,
        "country": form.country,
        "zip": form.zip,
        "returnUrl": form.returnUrl,
        "lastname": form.lastName,
        "state": form.state,
        "phone": form.phone,
        "street2": form.street2,
        "receiptText": form.receiptText,
      },
    };

      console.log("Submitting:", payload);

      const data = await fetch("/api/direct-sale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });
      const result = await data.json();
      router.push(`/payment-module/card-info?consumerUrl=${encodeURIComponent(result["consumer-url"])}`);

  ;
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Direct Sale
      </Typography>
      <TextField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />

      <TextField label="Last Name (optional)" name="lastName" value={form.lastName} onChange={handleChange} />

      <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />

      <TextField label="Currency" name="currency" type="text" value={form.currency} onChange={handleChange} required />

      <TextField label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} required />

      <TextField label="Phone (optional)" name="phone" value={form.phone} onChange={handleChange} />

      <TextField label="Street 1" name="street1" value={form.street1} onChange={handleChange} required />

      <TextField label="Street 2 (optional)" name="street2" value={form.street2} onChange={handleChange} />

      <TextField label="City" name="city" value={form.city} onChange={handleChange} required />

      <TextField label="State (optional)" name="state" value={form.state} onChange={handleChange} />

      <TextField label="Country" name="country" value={form.country} onChange={handleChange} required />

      <TextField label="ZIP" name="zip" value={form.zip} onChange={handleChange} required />

      <TextField
        label="Notification URL"
        name="notificationUrl"
        value={form.notificationUrl}
        onChange={handleChange}
        required
      />

      <TextField
        label="Return URL (optional)"
        name="returnUrl"
        value={form.returnUrl}
        onChange={handleChange}
      />

      <TextField
        label="Receipt Text (optional)"
        name="receiptText"
        multiline
        rows={3}
        value={form.receiptText}
        onChange={handleChange}
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}
