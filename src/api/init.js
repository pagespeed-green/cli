const axios = require('axios');

const API_HOST = 'https://api.pagespeed.green';

function getAxiosInstance(token) {
  if (!token || token.trim().length === 0) {
    throw new Error('Token is empty!');
  }

  const headers = { Authorization: `Bearer ${token}` };

  return axios.create({
    baseURL: API_HOST,
    timeout: 60000,
    headers,
    withCredentials: true,
  });
}

module.exports = {
  getAxiosInstance,
};
