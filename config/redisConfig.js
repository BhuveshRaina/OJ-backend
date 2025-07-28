require('dotenv').config();
const Queue = require('bull');

const submissionQueue = new Queue('submission', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

const runQueue = new Queue('run', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

module.exports = {
  submissionQueue,
  runQueue,
};
