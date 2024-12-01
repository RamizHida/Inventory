const { Router } = require('express');
const { getHomeView } = require('../controller/indexController');

const indexRouter = Router();

//
indexRouter.get('/', getHomeView);

module.exports = indexRouter;
