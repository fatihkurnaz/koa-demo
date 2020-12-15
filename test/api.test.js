import app from '../server/';
import supertest from 'supertest';
import { expect, should } from 'chai';

const request = supertest.agent(app.listen());
should();

describe('POST /records', () => {
  it('should get records', done => {
    request
      .post('/api/records')
      .set('Accept', 'application/json')
      .send({
        minCount : 2000,
        maxCount : 20000,
        startDate: "2020-11-26",
        endDate: "2021-02-02"
      })
      .expect(200, (err, res) => {
        expect(res.body.records.length).to.be.at.least(1);
        done();
      });
  }).timeout(5000);

  it('should get error', done => {
    request
      .post('/api/records')
      .set('Accept', 'application/json')
      .send({
        maxCount : 20000,
        startDate: "2020-11-26",
        endDate: "2021-02-02"
      })
      .expect(422, () => {
        done();
      });
  }).timeout(5000);

});


describe('POST /records/:id', () => {
  it('should get a record', done => {
    request
      .post(`/api/records/5fd6a0e8188bf83e6bdc0667`)
      .set('Accept', 'application/json')
      .expect(200, (err, res) => {
        res.body.createdAt.should.equal('2014-06-20T22:48:17.000Z');
        res.body.totalCount.should.equal(4436);
        res.body.key.should.equal('5fd6a0c40111e36a36e63b8a');
        done();
      });
  }).timeout(5000);
});
