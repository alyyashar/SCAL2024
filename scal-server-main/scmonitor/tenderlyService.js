// backend/scmonitor/tenderlyService.js
require('dotenv').config();
const axios = require('axios');

const TENDERLY_API_KEY = process.env.TENDERLY_API_KEY;
const TENDERLY_API_URL = process.env.TENDERLY_API_URL;

const tenderlyApi = axios.create({
  baseURL: TENDERLY_API_URL,
  headers: {
    'Authorization': `Bearer ${TENDERLY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Function to get contract events
const getContractEvents = async (contractAddress) => {
  try {
    const response = await tenderlyApi.get(`/contracts/${contractAddress}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching contract events:', error);
    throw error;
  }
};

module.exports = {
  getContractEvents,
};
