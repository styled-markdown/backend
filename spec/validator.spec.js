/* eslint-disable no-undef */

const { expect } = require("chai");
const httpMocks = require("node-mocks-http");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const validator = require("../src/api/middlewares/validator");

describe("Validators", () => {
  describe("#1. verifyEmail", () => {
    it("#1-1. 유저 이메일이 없는 경우", (done) => {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/users",
      });
      const res = httpMocks.createResponse();

      validator.verifyEmail(req, res, () => {});

      expect(res._getStatusCode()).to.eql(400);
      expect(res._getJSONData())
        .to.have.property("error")
        .to.eql("이메일 형식이 틀렸습니다.");
      done();
    });

    it("#1-2. 유저 이메일 형식이 옳지 않은 경우", (done) => {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/users",
        body: {
          email: "invalid-email",
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyEmail(req, res, () => {});

      expect(res._getStatusCode()).to.eql(400);
      expect(res._getJSONData())
        .to.have.property("error")
        .to.eql("이메일 형식이 틀렸습니다.");
      done();
    });

    it("#1-3. 유저 이메일 정보가 정상적으로 전달된 경우", (done) => {
      const req = httpMocks.createRequest({
        method: "POST",
        url: "/api/users",
        body: {
          email: "valid@mail.com",
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyEmail(req, res, done);
    });
  });

  describe("#2. verifyAccessToken", () => {
    it("#2-1. 토큰이 없는 경우", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/docs",
      });
      const res = httpMocks.createResponse();

      validator.verifyAccessToken(req, res, (err) => {
        if (err) return done();
      });
    });

    it("#2-2. 토큰이 유효하지 않은 경우 (1)", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/docs",
        headers: {
          authorization: "invalid Token",
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyAccessToken(req, res, (err) => {
        if (err) return done();
      });
    });

    it("#2-3. 토큰이 유효하지 않은 경우 (2)", (done) => {
      const token = jwt.sign(
        { email: "email@test.com" },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "0" }
      );
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/docs",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyAccessToken(req, res, (err) => {
        if (err) return done();
      });
    });

    it("#2-4. 토큰이 유효한 경우", (done) => {
      const token = jwt.sign(
        { email: "email@test.com" },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1m" }
      );
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/users/docs",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyAccessToken(req, res, (err) => {
        if (!err) return done();
      });
    });
  });

  describe("#3. verifyParams", () => {
    it("#3-1. 유효하지 않은 id가 넘어올 경우", (done) => {
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/api/docs/invalidParams",
        params: {
          id: "invalidParams",
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyParams(req, res, () => {});

      expect(res._getStatusCode()).to.eql(400);
      expect(res._getJSONData())
        .to.have.property("message")
        .to.eql("Invalid Id");
      done();
    });

    it("#3-2. 유효한 id가 넘어올 경우", (done) => {
      const id = new mongoose.Types.ObjectId().toString();
      const req = httpMocks.createRequest({
        method: "GET",
        url: `/api/docs/${id}`,
        params: {
          id: id,
        },
      });
      const res = httpMocks.createResponse();

      validator.verifyParams(req, res, done);
    });
  });
});
