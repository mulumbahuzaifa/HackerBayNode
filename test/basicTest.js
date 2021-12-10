let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe("Tasks API", () => {
  /**
   * Test the Signup route
   */
  describe("POST /auth/signup", () => {
    it("Please pass username, password.", done => {
      chai
        .request(server)
        .post("/auth/signup")
        .end((err, response) => {
          response.should.have.status(400);

          done();
        });
    });

    it("Is username & Password is provided, Signed Up user", done => {
      chai
        .request(server)
        .post("/auth/signup")
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
  });

  /**
   * Test the Sign-in route
   */
  describe("POST /auth/signin", () => {
    it("Please pass username, password.", done => {
      chai
        .request(server)
        .post("/auth/signin")
        .end((err, response) => {
          response.should.have.status(400);

          done();
        });
    });

    it("Is username & Password is provided, Authenticate", done => {
      chai
        .request(server)
        .post("/auth/signin")
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
    it("Authentication failed. User not found.", done => {
      chai
        .request(server)
        .post("/auth/signin")
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
  });

  /**
   * Test the JSON patch add route
   */
  describe("GET /jsonpatch/add", () => {
    it("Your not Authorize to perform this function", done => {
      chai
        .request(server)
        .get("/jsonpatch/add")
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });

    it("It should insert new attributes in the json file ", done => {
      chai
        .request(server)
        .get("/jsonpatch/add")
        .end((err, response) => {
          response.should.have.status(200);
          response.should.have.property("word");
          response.should.have.property("score");
          done();
        });
    });
  });
  /**
   * Test the GET image route
   */
  describe("GET /image", () => {
    it("Your not Authorize to perform this function", done => {
      chai
        .request(server)
        .get("/image")
        .end((err, response) => {
          response.should.have.status(401);

          done();
        });
    });

    it("It should download a thumbnail to a local folder", done => {
      chai
        .request(server)
        .get("/image")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
  /**
   * Test the PATCH route
   */

  /**
   * Test the DELETE route
   */
});
