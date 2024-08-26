// src/services/apiService.js
const TENDERLY_API_URL = process.env.REACT_APP_TENDERLY_API_URL;
const TENDERLY_API_KEY = process.env.REACT_APP_TENDERLY_API_KEY;

export const fetchContractEvents = async (contractAddress) => {
  const response = await fetch(`${TENDERLY_API_URL}/contracts/${contractAddress}/events`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TENDERLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contract events');
  }

  const data = await response.json();
  return data.events; // Adjust based on actual API response structure
};
