const { Router } = require('express');
const { getHomeView } = require('../controller/indexController');

const indexRouter = Router();

//  Home view
indexRouter.get('/', getHomeView);

module.exports = indexRouter;
