import express from 'express';
const api = express.Router();

api.get('/', (req, res) => {
  res.status(200).send({response: "GET OK"});
});

api.post('/auth', (req, res) => {
  const { username, password } = req.body;
  req.checkBody('username', 'Username is required!').notEmpty();
  req.checkBody('password', 'Passowrd is required!').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.status(400).send(errors);
  } else {
    res.status(200).send({response: "POST OK"});
  }
});

export default api;
