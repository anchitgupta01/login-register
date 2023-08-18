import express from 'express';

// const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, "auth")));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
