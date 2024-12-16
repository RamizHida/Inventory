const { Router } = require('express');
const {
  getNewSeason,
  createNewSeason,
} = require('../controller/seasonController');

const seasonRouter = Router();

seasonRouter.get('/', getNewSeason);

// Handle form submission for season creation
seasonRouter.post('/newSeason', createNewSeason);

module.exports = seasonRouter;
