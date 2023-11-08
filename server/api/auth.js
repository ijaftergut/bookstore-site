const {
  authenticate,
  findUserByToken,
  createUser,
  fetchUsers,
  fetchUser,
  updateUser
} = require('../db');

const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');


app.post('/login', async(req, res, next)=> {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  }
  catch(ex){
    next(ex);
  }
});


app.get('/me', isLoggedIn, (req, res, next)=> {
  try {
    res.send(req.user);
  } 
  catch(ex){
    next(ex);
  }
});
app.post('/users', async(req,res,next) => {
  try {
    res.send(await createUser(req.body))
  } catch (error) {
    next(error)
  }
})

app.get('/users', async(req,res,next) => {
  try {
    res.send(await fetchUsers())
  } catch (error) {
    next(error)
  }
})

app.get('/users/:id', async(req,res,next) => {
  try {
    res.send(await fetchUser(req.params.id))
  } catch (error) {
    next(error)
  }
})

app.put('/users/:id', async(req,res,next) => {
  try {
    res.send(await updateUser(req.body))
  } catch (error) {
    next(error)
  }
})
module.exports = app;
