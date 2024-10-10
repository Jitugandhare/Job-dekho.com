// server/routes/stocks.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const dotenv=require("dotenv");

dotenv.config();

router.get('/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const apiKey = process.env.ALPHAVANTAGE_API_KEY;
    // const API="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=dem"
  
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
  
      // Check if the response is okay (status 200)
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data from Alpha Vantage.' });
      }
  
      const data = await response.json();
  
      // Check if the data contains an error
      if (data['Error Message']) {
        return res.status(400).json({ error: data['Error Message'] });
      }
  
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports=router
  
