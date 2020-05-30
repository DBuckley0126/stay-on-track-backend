/* eslint-disable no-undef */
process.env.NODE_ENV = "test";

const chai = require("chai");

const should = chai.should();
const chaiHttp = require("chai-http");
const chaiAsPromised = require("chai-as-promised");
const knex = require("../../src/server/db/connection");
const testQueries = require("../../src/server/db/queries/testQueries");

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const server = require("../../src/server/app.js");

describe("routes : test", () => {
  beforeEach(done => {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        return knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  afterEach(done => {
    knex.migrate.rollback().then(() => {
      done();
    });
  });

  describe("GET /api/v1/test-values", () => {
    it("should return test values", done => {
      chai
        .request(server)
        .get("/api/v1/test-values")
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.status.should.equal("success");
          res.body.message.should.eql(
            "Successfully got test values from database"
          );
          res.body.data.should.be.a("array");
          res.body.data[0].should.include({
            id: 1,
            integer: 10
          });
          done();
        });
    });
  });

  describe("POST /api/v1/test-values", () => {
    it("should post a test value and return the posted test value", done => {
      chai
        .request(server)
        .post("/api/v1/test-values?value=25")
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.status.should.equal("success");
          res.body.message.should.eql(
            "Successfully added test value to database"
          );
          res.body.data.should.be.a("array");
          res.body.data[0].should.include({
            id: 4,
            integer: 25
          });
          testQueries.getSingleTestValue(4).then(res => res[0].integer)
            .should.eventually.equal(25);
          done();
        });
    });
  });
});
