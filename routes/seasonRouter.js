const { Router } = require('express');
const {
  getNewSeason,
  createNewSeason,
  showSeasonDetails,
  createNewHoliday,
  deleteHoliday,
} = require('../controller/seasonController');

const seasonRouter = Router();

seasonRouter.get('/', getNewSeason);

// Handle form submission for season creation
seasonRouter.post('/newSeason', createNewSeason);

// Handle form submission for holiday creation
seasonRouter.post('/newHoliday', createNewHoliday);

// Handle form submission for holiday deletion
seasonRouter.post('/deleteHoliday/:season/:holidayName', deleteHoliday);

seasonRouter.get('/:season', showSeasonDetails);

module.exports = seasonRouter;
