import * as chai from "chai";
import * as sinon from "sinon";
import { app } from "../app";
import Team from "../database/models/team";
// @ts-ignore
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const teamsMock = [
  {
    id: 1,
    teamName: "Avaí/Kindermann",
  },
  {
    id: 2,
    teamName: "Bahia",
  },
  {
    id: 3,
    teamName: "Flamengo",
  },
];

const teamMock = {
  id: 1,
  teamName: "Avaí/Kindermann",
};

describe("/teams", () => {
  beforeEach(() => {
    sinon.restore();
  }),
  describe("getAll", () => {
    it("should return status 200 and teams", async () => {
      sinon.stub(Team, "findAll").resolves(teamsMock as Team[]);
      const response = await chai
      .request(app)
      .get("/teams");

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(teamsMock);
    });
  });

  describe("getById", () => {
    it("should return status 200 and teams", async () => {
      sinon.stub(Team, "findOne").resolves(teamMock as Team);
      const response = await chai
      .request(app)
      .get("/teams/1");

      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(teamMock);
    });
  });

  describe("getById failed", () => {
    it("should return status 404 when not finding a team by id", async () => {
      sinon.stub(Team, "findOne").resolves(null);
      const response = await chai
      .request(app)
      .get("/teams/1");

      chai.expect(response.status).to.equal(404);
    });
  });
});
