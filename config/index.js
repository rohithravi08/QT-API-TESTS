const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'production';
const configPath = path.resolve(__dirname, `config.${env}.json`);

if (!fs.existsSync(configPath)) {
  throw new Error(`Config file for environment "${env}" not found at path "${configPath}"`);
}

const config = require(configPath);

module.exports = config;
