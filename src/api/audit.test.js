const { expect } = require('chai');
const { stub } = require('sinon');

const init = require('./init');
const {
  runByPage,
  runAllByRegion,
} = require('./audit');

describe('audit', () => {
  describe('runByPage', () => {
    it('given axiosInstance.post() rejects. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().rejects(),
      });

      try {
        await runByPage({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response === null. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves(null),
      });

      try {
        await runByPage({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data === null. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves({ data: null }),
      });

      try {
        await runByPage({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data.is_success === false. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves({ data: { is_success: false } }),
      });

      try {
        await runByPage({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data.is_success === true. Should return expected payload', async () => {
      const expected = 'payload test';

      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves({ data: { is_success: true, payload: expected } }),
      });

      const res = await runByPage({});
      expect(res).to.equal(expected);
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data.is_success === true. Should call axiosInstance.post with expected parameters', async () => {
      const postStub = stub().resolves({ data: { is_success: true, payload: 'test' } });
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: postStub,
      });

      const url = 'https://test.com';
      const region = 'AU-SYD';
      await runByPage({ url, region });
      expect(postStub.calledWith(
        '/cli/run', {
          payload: {
            url,
            region,
          },
        },
      )).to.equal(true);
      getAxiosInstanceStub.restore();
    });
  });

  describe('runAllByRegion', () => {
    it('given axiosInstance.post() rejects. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().rejects(),
      });

      try {
        await runAllByRegion({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response === null. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves(null),
      });

      try {
        await runAllByRegion({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data === null. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves({ data: null }),
      });

      try {
        await runAllByRegion({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data.is_success === false. Should throw exception', async () => {
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves({ data: { is_success: false } }),
      });

      try {
        await runAllByRegion({});
        expect(true).to.equal(false);
      } catch {
        expect(true).to.equal(true);
      }
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data.is_success === true. Should return expected payload', async () => {
      const expected = 'payload test';

      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: stub().resolves({ data: { is_success: true, payload: expected } }),
      });

      const res = await runAllByRegion({});
      expect(res).to.equal(expected);
      getAxiosInstanceStub.restore();
    });

    it('given axiosInstance.post() returns response.data.is_success === true. Should call axiosInstance.post with expected parameters', async () => {
      const postStub = stub().resolves({ data: { is_success: true, payload: 'test' } });
      const getAxiosInstanceStub = stub(init, 'getAxiosInstance').returns({
        post: postStub,
      });

      const region = 'AU-SYD';
      await runAllByRegion({ region });
      expect(postStub.calledWith(
        '/cli/run-all', {
          payload: {
            region,
          },
        },
      )).to.equal(true);
      getAxiosInstanceStub.restore();
    });
  });
});
