import express from 'express';
import { checkAuthHeader, validateRequestData, getToken } from '../lib';

const api = express.Router();

api.get('/', (req, res) => {
  res.status(200).send({response: "GET /v2/auth OK"});
});

api.post('/', (req, res) => {
  res.status(200).send({response: "POST /v2/auth OK"});
});

api.post('/token', (req, res) => {
    checkAuthHeader(req.headers, 'Basic')
      .then((credentials) => {
        req.body = {...req.body, ...credentials};
        return validateRequestData(req);
      })
      .then(() => getToken())
      .then((token) => res.status(200).send(token))
      .catch( err => {
        res.status(err.errStatus).send({message: err.message})
      })
});

export default api;
