/* eslint-disable no-undef */
process.env.NODE_ENV = "test";

const chai = require("chai");

const should = chai.should();
const chaiHttp = require("chai-http");
const knex = require("../../src/server/db/connection");

chai.use(chaiHttp);

const server = require("../../src/server/app.js");

describe("routes : index", () => {
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

  describe("GET /api/v1/", () => {
    it("should return json", done => {
      chai
        .request(server)
        .get("/api/v1/")
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql("application/json");
          res.body.status.should.equal("success");
          res.body.message.should.eql("Hello, world!");
          done();
        });
    });
  });
});
