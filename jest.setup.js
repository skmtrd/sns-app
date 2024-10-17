const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(__dirname, '.env.test') });
