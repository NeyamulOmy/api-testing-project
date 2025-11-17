"use client";

import { useState } from "react";
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

export default function TransactionDetails() {
  const router = useRouter();
  const [transaction, setTransaction] = useState();
  const [form, setForm] = useState({
    transactionId: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
        "transaction-id": form.transactionId
    };

      console.log("Submitting:", payload);

      const data = await fetch("/api/transaction-info", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });
      const result = await data.json();
      if(result.transaction){
        setTransaction(result.transaction)
      }

  ;
    }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Transaction Details
      </Typography>
      <TextField label="Transaction Id" name="transactionId" value={form.transactionId} onChange={handleChange} required />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
      {/* Transaction JSON box */}
      {transaction && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            Transaction JSON
          </Typography>
          <Box
            component="pre"
            sx={{
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              p: 2,
              borderRadius: 1,
              maxHeight: 400,
              overflow: "auto",
            }}
          >
            {JSON.stringify(transaction, null, 2)}
          </Box>
        </Box>
      )}
    </Box>
  );
}
