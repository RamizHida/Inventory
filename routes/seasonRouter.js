const { Router } = require('express');
const {
  getNewSeason,
  createNewSeason,
  showSeasonDetails,
  createNewHoliday,
} = require('../controller/seasonController');

const seasonRouter = Router();

seasonRouter.get('/', getNewSeason);

// Handle form submission for season creation
seasonRouter.post('/newSeason', createNewSeason);

// Handle form submission for holiday creation
seasonRouter.post('/newHoliday', createNewHoliday);

seasonRouter.get('/:season', showSeasonDetails);

module.exports = seasonRouter;
