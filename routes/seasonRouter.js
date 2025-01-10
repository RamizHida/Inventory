const { Router } = require('express');
const {
  getNewSeason,
  createNewSeason,
  showSeasonDetails,
} = require('../controller/seasonController');

const seasonRouter = Router();

seasonRouter.get('/', getNewSeason);

// Handle form submission for season creation
seasonRouter.post('/newSeason', createNewSeason);

seasonRouter.get('/:season', showSeasonDetails);

module.exports = seasonRouter;
