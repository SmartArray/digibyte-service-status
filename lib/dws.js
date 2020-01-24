const Promise = require('bluebird');
const API = require('./api');
const DWSInstances = require('../config/').DWSInstances;

/**
 * DigibyteJS Wallet Service doesnt not currently have a 'Status' endpoint so we justs check that we get a 200 response from FeeLevels
 */
const getDWSStatus = async (url) => {
  const statusPath = 'dws/api/v2/feelevels';
  try {
    return await { ...API.getRequest(`${url}/${statusPath}`), status: 'finished' };
  } catch (e) {
    return e;
  }
};

/**
 * Gets the sync status of All DWS services
 */
const getAllDWSStatus = async (url) => {
  try {
    return await Promise.all(DWSInstances, async (dws) => {
      return { ...dws, ...await getDWSStatus(dws.url) };
    });
  } catch(e) {
    return e;
  }
}

module.exports = {
  getAllDWSStatus,
  getDWSStatus
}