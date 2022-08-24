import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
import Match from "../database/models/match";
import { classificationAway, classificationHome, getAllMatches } from "./mocks/leaderboard";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("/leaderboard", () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('homeTeamsRanking', () => {
    it('should return status 200 and ranking of home teams', async () => {
      sinon.stub(Match, "findAll").resolves(getAllMatches as unknown as Match[]);
      const response = await chai.request(app).get("/leaderboard/home");

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(classificationHome);
    })
  })

  describe('awayTeamsRanking', () => {
    it('should return status 200 and ranking of away teams', async () => {
      sinon.stub(Match, "findAll").resolves(getAllMatches as unknown as Match[]);
      const response = await chai.request(app).get("/leaderboard/away");

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(classificationAway);
    })
  })
});