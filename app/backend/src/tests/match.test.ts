import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
// @ts-ignore
import chaiHttp = require("chai-http");
import Match from "../database/models/match";
import {
  bodySaveMatch,
  bodyUnauSaveMatch,
  matchesMock,
  returnSaveMatch,
  updateScore,
} from "./mocks/matchMocks";
import JwtService from "../services/jwtService";
import MatchService from "../services/matchService";
import ThrowError from "../error/throwError";

chai.use(chaiHttp);

describe("/matches", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe("getAll", () => {
    it("should return status 200 and all matches", async () => {
      sinon.stub(Match, "findAll").resolves(matchesMock as unknown as Match[]);
      const response = await chai.request(app).get("/matches");

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(matchesMock);
    });
  });

  describe("saveMatch", () => {
    it("should return status 201 with the data of the created item", async () => {
      sinon.stub(JwtService, "verify").resolves("admin");
      sinon.stub(MatchService, "validateMatch").resolves();
      sinon.stub(Match, "create").resolves(returnSaveMatch as Match);
      const response = await chai
        .request(app)
        .post("/matches")
        .send(bodySaveMatch);

      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.deep.equal(returnSaveMatch);
    });

    it("should return status 401 if homeTeam equals awayTeam", async () => {
      sinon.stub(JwtService, "verify").resolves("admin");
      const response = await chai
        .request(app)
        .post("/matches")
        .send(bodyUnauSaveMatch);

      chai.expect(response.status).to.equal(401);
      chai.expect(response.body).to.deep.equal({
        message: "It is not possible to create a match with two equal teams",
      });
    });

    it("should return status 404 if there is no team with the id", async () => {
      sinon.stub(JwtService, "verify").resolves("admin");
      sinon.stub(Match, "findByPk").resolves(null);
      sinon
        .stub(MatchService, "validateMatch")
        .rejects(new ThrowError("NotFound", "There is no team with such id!"));
      const response = await chai
        .request(app)
        .post("/matches")
        .send(bodySaveMatch);

      chai.expect(response.status).to.equal(404);
      chai.expect(response.body).to.deep.equal({
        message: "There is no team with such id!",
      });
    });
  });

  describe("updateInProgress", () => {
    it("should return status 200 when updating a match progress", async () => {
      sinon.stub(Match, "update").resolves();
      const response = await chai.request(app).patch("/matches/1/finish");

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal({ message: "Finished" });
    });

    it("should return status 200 when updating a match score", async () => {
      sinon.stub(Match, "update").resolves();
      const response = await chai
        .request(app)
        .patch("/matches/1")
        .send(updateScore);

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal({ message: "Updated" });
    });
  });
});
