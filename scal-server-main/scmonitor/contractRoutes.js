// scal-server-main/scmonitor/contractRoutes.js
const express = require('express');
const { getContractEvents } = require('./tenderlyService');
const router = express.Router();

// Route to get events for a specific contract
router.get('/contract/:contractAddress/events', async (req, res) => {
  const { contractAddress } = req.params;

  try {
    const events = await getContractEvents(contractAddress);
    res.json(events);
  } catch (error) {
    console.error('Error fetching contract events:', error);
    res.status(500).json({ error: 'Failed to fetch contract events' });
  }
});

module.exports = router;

