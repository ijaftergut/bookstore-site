const {
    fetchTopTen,
    createTopTen
  } = require('../db');
  
  const express = require('express');
  const app = express.Router();
  const { isLoggedIn, isAdmin } = require('./middleware');
  
  app.get('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(await fetchTopTen(req.user.id));
    }
    catch(ex){
      next(ex);
    }
  });
  
  app.post('/', isLoggedIn, async(req, res, next)=> {
    try {
      //TODO make sure the order's user_id is req.user.id 
      res.send(await createTopTen(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  
module.exports = app;
