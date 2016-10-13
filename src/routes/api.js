import express from 'express';
const api = express.Router();

api.get('/', (req, res) => {
  res.status(200).send({response: "GET OK"});
});

api.post('/', (req, res) => {
  res.status(200).send({response: "POST OK"});
});

export default api;
