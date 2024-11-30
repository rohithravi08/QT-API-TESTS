const request = require('supertest');
const config = require('../../config');
const { generateUniqueEmail, generateUniqueName, readJsonFile, postRequest, postRequestWithoutToken, getRequest, putRequest, deleteRequest } = require('../../utils/testUtils');
const requestBody = readJsonFile('../data/requestBody.json');

function getModifiedRequestBody() {
  const modifiedRequestBody = JSON.parse(JSON.stringify(requestBody));
  modifiedRequestBody.email = generateUniqueEmail(requestBody.email);
  modifiedRequestBody.name = generateUniqueName(requestBody.name);
  return modifiedRequestBody;
}

describe('CRUD Operations', () => {
  let userId;
  let clonedRequestBody;

  it('should create a new user with a unique email', async () => {
    clonedRequestBody = getModifiedRequestBody();
    const response = await postRequest(config.baseURL, config.apiPaths.users, clonedRequestBody);
    // Validations
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    userId = response.body.id;
    expect(response.body.email).toBe(clonedRequestBody.email);
    expect(response.body.name).toBe(clonedRequestBody.name);
    expect(response.body.gender).toBe(clonedRequestBody.gender);
    expect(response.body.status).toBe(clonedRequestBody.status);
  });

  it('should get a user using GET request', async () => {
    const response = await getRequest(config.baseURL, config.apiPaths.users + `/${userId}`);
    // Validations
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(clonedRequestBody.email);
    expect(response.body.name).toBe(clonedRequestBody.name);
    expect(response.body.gender).toBe(clonedRequestBody.gender);
    expect(response.body.status).toBe(clonedRequestBody.status);
  });

  it('should update a user using PUT request', async () => {
    clonedRequestBody = getModifiedRequestBody();
    const response = await putRequest(config.baseURL, config.apiPaths.users + `/${userId}`, clonedRequestBody);
    // Validations
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(clonedRequestBody.email);
    expect(response.body.name).toBe(clonedRequestBody.name);
    expect(response.body.gender).toBe(clonedRequestBody.gender);
    expect(response.body.status).toBe(clonedRequestBody.status);
  });

  it('should delete the user using DELETE request', async () => {
    const response = await deleteRequest(config.baseURL, config.apiPaths.users + `/${userId}`);
    expect(response.status).toBe(204);
    const getResponse = await getRequest(config.baseURL, config.apiPaths.users + `/${userId}`);
    expect(getResponse.status).toBe(404);
  });
});

describe('Error Handling', () => {
  it('should return validation error for invalid email', async () => {
    const invalidRequestBody = { "name": "John Jan", "email": 'test-email', "gender": 'male', "status": 'active' };
    const response = await postRequest(config.baseURL, config.apiPaths.users, invalidRequestBody);
    expect(response.status).toBe(422);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: 'is invalid'
        })
      ])
    );
  });

  it('should return validation error for blank email, gender & status', async () => {
    const invalidRequestBody = { "name": "John Jan" };
    const response = await postRequest(config.baseURL, config.apiPaths.users, invalidRequestBody);
    expect(response.status).toBe(422);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "field": "email",
          "message": "can't be blank"
        },
          {
            "field": "gender",
            "message": "can't be blank, can be male or female"
          },
          {
            "field": "status",
            "message": "can't be blank"
          })
      ])
    );
  });

  it('should return error for duplicate email', async () => {
    const clonedRequestBody = getModifiedRequestBody();;
    await postRequest(config.baseURL, config.apiPaths.users, clonedRequestBody);
    const response = await postRequest(config.baseURL, config.apiPaths.users, clonedRequestBody);
    expect(response.status).toBe(422);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: 'has already been taken'
        })
      ])
    );
  });

  it('should return error for non-existent user on GET request', async () => {
    const response = await getRequest(config.baseURL, `${config.apiPaths.users}/00000`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Resource not found');
  });

  it('should return error for non-existent user on PUT request', async () => {
    const response = await putRequest(config.baseURL, `${config.apiPaths.users}/12354`, requestBody);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Resource not found');
  });

  it('should return error for non-existent user on DELETE request', async () => {
    const response = await deleteRequest(config.baseURL, `${config.apiPaths.users}/5451215849842515545`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Resource not found');
  });

  it('should return unauthorized error for missing authentication token', async () => {
    const clonedRequestBody = getModifiedRequestBody();
    const response = await postRequestWithoutToken(config.baseURL, config.apiPaths.users, clonedRequestBody);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Authentication failed');
  });
});
