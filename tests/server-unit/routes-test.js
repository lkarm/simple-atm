const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');
const routes = require('../../server/routes');

describe('routes.create', () => {
  it('returns 400 if there is no request body', () => {
    expect.assertions(1);
    const request = new MockExpressRequest();
    const response = new MockExpressResponse();
    request.body = null;
    routes.create(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 if there is no account id', () => {
    expect.assertions(1);
    const request = new MockExpressRequest({
      method: 'POST',
      body: {}
    });
    const response = new MockExpressResponse();
    routes.create(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 if balance is not a positive number', () => {
    expect.assertions(1);
    const request = new MockExpressRequest({
      method: 'POST',
      body: {
        account_id: 1234,
        balance: 'not a number'
      }
    });
    const response = new MockExpressResponse();
    routes.create(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns successfully on a good request', () => {
    expect.assertions(1);
    const request = new MockExpressRequest({
      method: 'POST',
      body: {
        account_id: 1234,
      }
    });
    const response = new MockExpressResponse();
    routes.create(request, response);
    expect(response.statusCode).toBe(200);
  });
  it('returns successfully on a good request with a balance', () => {
    expect.assertions(1);
    const request = new MockExpressRequest({
      method: 'POST',
      body: {
        account_id: 1234,
        balance: 100,
      }
    });
    const response = new MockExpressResponse();
    routes.create(request, response);
    expect(response.statusCode).toBe(200);
  });
});

describe('routes.get', () => {
  it('returns 200 on successful request', () => {
    const request = new MockExpressRequest({
      method: 'GET',
      params: {
        accountID: 1234,
      }
    });
    const response = new MockExpressResponse();
    routes.get(request, response);
    expect(response.statusCode).toBe(200);
  });
  it('returns 400 when missing account id', () => {
    expect.assertions(1);
    const request = new MockExpressRequest({
      method: 'GET',
      params: {}
    });
    const response = new MockExpressResponse();
    routes.get(request, response);
    expect(response.statusCode).toBe(400);
  });
});

describe('routes.update', () => {
  it('returns 400 when missing account_id', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {}
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 when missing body', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {
        accountID: 1234
      },
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 when missing ammount', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {
        accountID: 1234
      },
      body: {},
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 when missing action', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {
        accountID: 1234
      },
      body: {
        ammount: 500
      },
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 when action is the wrong type', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {
        accountID: 1234
      },
      body: {
        ammount: 500,
        action: 'not-supported'
      },
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 400 when ammount is the wrong type', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {
        accountID: 1234
      },
      body: {
        ammount: 'not-a-number',
        action: 'withdraw'
      },
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(400);
  });
  it('returns 200 when request is correct', () => {
    const request = new MockExpressRequest({
      method: 'PUT',
      params: {
        accountID: 1234
      },
      body: {
        ammount: '10',
        action: 'withdraw'
      },
    });
    const response = new MockExpressResponse();
    routes.update(request, response);
    expect(response.statusCode).toBe(200);
  });
})
