import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
import User from "../database/models/user";
import JwtService from "../services/jwtService";
import PasswordService from "../services/passwordService";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const userMock = {
  id: 1,
  username: "test",
  role: "admin",
  email: "admin@admin.com",
  password: "abcdefghijk",
};

const loginMock = {
  email: "admin@admin.com",
  password: "abcdefghijk",
};

const responseMock = {
  token: "any-token",
};

describe("/login", () => {
  describe("login", () => {
    beforeEach(() => {
      sinon.stub(User, "findOne").resolves(userMock as User);
      sinon.stub(PasswordService, "comparePassword").returns(true);
      sinon.stub(JwtService, "sign").returns(responseMock.token);
    });
    afterEach(() => {
      sinon.restore();
    }),
      it("should return status 200 on successful login", async () => {
        const response = await chai
        .request(app)
        .post("/login")
        .send(loginMock);
        chai.expect(response.status).to.equal(200);
      });

    it("should return a token", async () => {
      const response = await chai.request(app)
      .post("/login")
      .send(loginMock);
      chai.expect(response.body).to.deep.equal(responseMock);
    });
  });

  describe("login falied", () => {
    beforeEach(() => {
      sinon.restore();
    }),
      it("should return status 401 when email is not found", async () => {
        sinon.stub(User, "findOne").resolves(null);
        const response = await chai
        .request(app)
        .post("/login")
        .send(loginMock);

        chai.expect(response.status).to.equal(401);
      });
      
    it("should return 401 status when password is not correct", async () => {
      sinon.stub(PasswordService, "comparePassword").returns(false);
      const response = await chai.request(app)
      .post("/login")
      .send(loginMock);

      chai.expect(response.status).to.equal(401);
    });
  });

  describe("validate ", () => {
    beforeEach(() => {
      sinon.restore();
    }),
      it("should return status 200 when validating jwt token successfully", async () => {
        sinon.stub(JwtService, "verify").returns("admin");
        const response = await chai
          .request(app)
          .get("/login/validate")
          .set("authorization", "any-token");

        chai.expect(response.status).to.equal(200);
      });
  });
});
