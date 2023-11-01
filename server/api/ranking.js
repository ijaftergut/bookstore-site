const {
    fetchRanking,
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', async(req, res, next)=> {
    try {
      res.send(await fetchRanking());
    }
    catch(ex){
      next(ex);
    }
  });

  module.exports = app;
  