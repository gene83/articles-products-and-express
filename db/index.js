const config = require('../knexfile');
const envorionment = process.env.NODE_ENV || 'development';

module.exports = require('knex')(config[envorionment]);
