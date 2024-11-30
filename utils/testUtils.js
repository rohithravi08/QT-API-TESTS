const fs = require('fs');
const path = require('path');
const request = require('supertest');
//const token = process.env.TOKEN;

function getToken() {
    const token = process.env.TOKEN;
    if (!token) {
      throw new Error('TOKEN environment variable is not set');
    }
    return token;
}

function generateUniqueEmail(baseEmail) {
  const timestamp = new Date().getTime();
  const uniqueEmail = `${baseEmail.split('@')[0]}_${timestamp}@${baseEmail.split('@')[1]}`;
  return uniqueEmail;
}

function generateUniqueName(baseName) {
    const timestamp = new Date().getTime();
    const uniqueName = `${baseName}_${timestamp}`;
    return uniqueName;
}

function readJsonFile(relativePath) {
  const requestBodyPath = path.join(__dirname, relativePath);
  try {
    const requestBody = JSON.parse(fs.readFileSync(requestBodyPath, 'utf8'));
    return requestBody;
  } catch (error) {
    console.error(`Error reading or parsing JSON file at ${requestBodyPath}:`, error);
    throw error;
  }
}

async function postRequest(url, path, body) {
    const token = getToken();
    return request(url)
      .post(path)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
}

async function postRequestWithoutToken(url, path, body) {
  return request(url)
    .post(path)
    .send(body)
    .set('Content-Type', 'application/json');
}

async function getRequest(url, path) {
    const token = getToken();
    return request(url)
      .get(path)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
}

async function putRequest(url, path, body) {
    const token = getToken();
    return request(url)
      .put(path)
      .send(body)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
}

async function deleteRequest(url, path) {
    const token = getToken();
    return request(url)
      .delete(path)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
}

module.exports = {
  getToken,
  generateUniqueEmail,
  generateUniqueName,
  readJsonFile,
  postRequest,
  postRequestWithoutToken,
  getRequest,
  putRequest,
  deleteRequest
};