// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [subscribedStocks, setSubscribedStocks] = useState([]);
  const token = localStorage.getItem('token'); // Retrieve the JWT token
  const userId = localStorage.getItem('userId'); // Dynamically get user ID from local storage

  useEffect(() => {
    // Fetch stock symbols or other stock data (e.g., Apple stock)
    axios
      .get('http://localhost:5000/user/stocks/IBM') // Replace with any stock symbol
      .then((response) => {
        setStocks(response.data['Time Series (Daily)']); // Example response for daily time series
      })
      .catch((error) => console.error('Error fetching stock data', error));
  }, []);

  const handleSubscribe = async (symbol) => {
    try {
      await axios.post(
        'http://localhost:5000/user/auth/subscribe',
        { userId, symbol },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubscribedStocks([...subscribedStocks, symbol]);
      alert('Subscribed to stock!');
    } catch (error) {
      alert('Error subscribing to stock. Please try again.');
    }
  };

  return (
    <div>
      <h1>Stock Dashboard</h1>
      {stocks &&
        Object.keys(stocks).map((date, index) => (
          <div key={index}>
            <h4>Date: {date}</h4>
            <p>Open: {stocks[date]['1. open']}</p>
            <p>High: {stocks[date]['2. high']}</p>
            <p>Low: {stocks[date]['3. low']}</p>
            <p>Close: {stocks[date]['4. close']}</p>
            <button onClick={() => handleSubscribe('AAPL')}>Subscribe</button>
          </div>
        ))}
      <h2>Subscribed Stocks</h2>
      <ul>
        {subscribedStocks.map((stock, index) => (
          <li key={index}>{stock}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
