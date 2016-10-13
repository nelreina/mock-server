import moment from 'moment';
import Promise from 'bluebird';
import queryString from 'query-string';

const checkAuthHeader = (headers, auth_type) => new Promise((resolve, reject) => {
  const { authorization } = headers;
  const errStatus = 401;
  if (!authorization) {
    reject({ errStatus, message: 'Not Authorized' });
  } else {
    if (!new RegExp(auth_type).test(authorization)){
      reject({ errStatus, message: `${auth_type} authorization required` });
    }
  }

  const credentials_b64 = authorization.split(' ')[1];
  const credentials =  Buffer.from(credentials_b64, 'base64').toString();
  resolve(queryString.parse(credentials));
});

const validateRequestData = req => new Promise((resolve, reject) =>{
  const { username, password } = req.body;
  const errStatus = 400;
  req.checkBody('username', 'username is missing in base64value header!').notEmpty();
  req.checkBody('password', 'passowrd is missing in base64value header!').notEmpty();
  req.checkBody('grant_type', 'grant_type is required in body!').notEmpty();
  const errors = req.validationErrors();
  errors && reject({errStatus, message: errors}) || resolve();
})

const getToken = () => new Promise((resolve, reject) =>{
  resolve({
    access_token: "somevalidtokentobeset",
    expiration_date: moment().add(1, 'd'),
    token_type: 'Bearer'
  })
})

export {
  checkAuthHeader,
  validateRequestData,
  getToken
}
