/* eslint-disable no-undef */

const request = require("supertest");
const { expect } = require("chai");
const app = require("../src/app");

describe("Index Route", () => {
  it("#1. Index Response", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const response = res.body;
        expect(response).to.eql("ok");

        done();
      });
  });

  it("#2. 404 Response", (done) => {
    request(app)
      .get("/invalid-route")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
