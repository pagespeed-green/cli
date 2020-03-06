const init = require('./init');
const {
  BACK_END_INVALID_MESSAGE,
} = require('../const/errorMessages');

async function runByPage({
  token, url, region,
}) {
  const axiosInstance = init.getAxiosInstance(token);
  try {
    const response = await axiosInstance.post('/cli/run', {
      payload: {
        url,
        region,
      },
    });

    if (response && response.data && response.data.is_success) {
      return response.data.payload;
    }
    throw Error(response.data.error_code || BACK_END_INVALID_MESSAGE);
  } catch (e) {
    throw Error(e.message);
  }
}

async function runAllByRegion({
  token, region,
}) {
  const axiosInstance = init.getAxiosInstance(token);
  try {
    const response = await axiosInstance.post('/cli/run-all', {
      payload: {
        region,
      },
    });
    if (response && response.data && response.data.is_success) {
      return response.data.payload;
    }

    throw Error(response.data.error_code || BACK_END_INVALID_MESSAGE);
  } catch (e) {
    throw Error(e.message);
  }
}

module.exports = {
  runByPage,
  runAllByRegion,
};
