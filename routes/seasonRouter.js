const { Router } = require('express');
const {
  getNewSeason,
  createNewSeason,
} = require('../controller/seasonController');

const seasonRouter = Router();

seasonRouter.get('/', getNewSeason);
seasonRouter.post('/uniqueSeason', createNewSeason);

module.exports = seasonRouter;
