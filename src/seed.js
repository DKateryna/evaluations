const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');

const initialState = {
  batches: [],
  nextBatchNumber: 3
};

const feathersClient = feathers();
feathersClient.configure(rest('http://localhost:3030').superagent(superagent));

const evaluations = feathersClient.service('evaluations');
evaluations.remove(null)
  .then(() => {
    evaluations
      .create(initialState)
      .catch(error => console.error('Error creating initial state!', error));
  }
  )
  .catch(error => console.error('Error deleting initial state!', error));
