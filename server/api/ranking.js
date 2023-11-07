const {
    fetchRanking,
    createRanking
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
  app.post('/', async (req, res, next) => {
    try {
     {
        const response = await createRanking(req.body)
        res.send(response)
      }
    } catch (error) {
      next(error);
    }
  });
  module.exports = app;
  