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
  
  app.post('/', async (req, res, next) => {
    try {
     {
        const response = await createTopTen(req.body)
        res.send(response)
      }
    } catch (error) {
      next(error);
    }
  });
  
module.exports = app;
