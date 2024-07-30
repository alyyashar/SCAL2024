const express = require('express');
const router = express.Router();

// import controller
const {
  readController,
  updateController,
  updateScan,
  getUserScan,
  contactController,
} = require('../controllers/user.controller');

router.get('/user/:id', readController);
router.put('/user/update', updateController);
router.post('/user/updatescan/:id', updateScan);
router.post('/user/scan/:_id', getUserScan);

module.exports = router;