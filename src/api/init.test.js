const { expect } = require('chai');
const { stub } = require('sinon');

const axios = require('axios');

const {
  getAxiosInstance,
} = require('./init');

describe('init', () => {
  describe('getAxiosInstance', () => {
    it('given token === undefined. Should throw exception', () => {
      expect(() => {
        getAxiosInstance(undefined);
      }).to.throw();
    });

    it('given token === null. Should throw exception', () => {
      expect(() => {
        getAxiosInstance(null);
      }).to.throw();
    });

    it('given token - empty string. Should throw exception', () => {
      expect(() => {
        getAxiosInstance('');
      }).to.throw();
    });

    it('given token - string with spaces. Should throw exception', () => {
      expect(() => {
        getAxiosInstance('  ');
      }).to.throw();
    });

    it('given token. Should call axios.create with expected parameters', () => {
      const createStub = stub(axios, 'create');
      const token = 'test_token';
      const expected = {
        baseURL: 'https://api.pagespeed.green',
        timeout: 60000,
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      };

      getAxiosInstance(token);
      expect(createStub.calledWith(expected)).to.equal(true);
      createStub.restore();
    });
  });
});
