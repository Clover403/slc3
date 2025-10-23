const request = require("supertest");
const app = require("../app");
const { User, Game, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");

let validToken, validToken2, invalidToken, idGame;
const userTest1 = {
  email: "user.test1@mail.com",
  name: "User Test 1",
  password: "usertest1",
};

const userTest2 = {
  email: "user.test2@mail.com",
  name: "User Test 2",
  password: "usertest2",
};

beforeAll((done) => {
  User.create(userTest1)
    .then((registeredUser) => {
      validToken = signToken({
        id: registeredUser.id,
        email: registeredUser.email,
      });
      invalidToken =
        '12345678eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9';
      return User.create(userTest2);
    })
    .then((registeredUser2) => {
      validToken2 = signToken({
        id: registeredUser2.id,
        email: registeredUser2.email,
      });
      return queryInterface.bulkInsert('Games',
        [
          {
            name: "League of Legends",
            gameImg: "https://www.dexerto.com/cdn-cgi/image/width=1200,quality=60,format=auto/https://editors.dexerto.com/wp-content/uploads/2020/08/kda-return-new-song-the-baddest-announce-ep.png",
            releaseDate: "2009-10-27",
            developer: "Riot Games",
            genre: "MOBA",
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "DOTA 2",
            gameImg: "https://c4.wallpaperflare.com/wallpaper/825/375/685/dota-2-wallpaper-preview.jpg",
            releaseDate: "2013-07-09",
            developer: "Valve Corporation",
            genre: "MOBA",
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: "VALORANT",
            gameImg: "https://cdn1-production-images-kly.akamaized.net/2cz3nNAb61C_WtZDIByp9jys2Ww=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3142622/original/000361800_1591163362-valorant-2.jpg",
            releaseDate: "2020-06-02",
            developer: "Riot Games",
            genre: "FPS",
            UserId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        {}
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(_ => {
      return Game.destroy({ truncate: true, cascade: true, restartIdentity: true })
    })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("GET /games", () => {
  test("200 success get games", (done) => {
    request(app)
      .get("/games")
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get games with invalid token", (done) => {
    request(app)
      .get("/games")
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 get games without token", (done) => {
    request(app)
      .get("/games")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /games", () => {
  test("201 success POST games", (done) => {
    request(app)
      .post(`/games`)
      .set("Authorization", `Bearer ${validToken}`)
      .send({
        name: "test game",
        gameImg: "test image",
        releaseDate: "2016-07-14",
        developer: "test dev",
        genre: "MOBA"
      })
      .then((response) => {
        const { body, status } = response;
        idGame = body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", expect.any(String));
        expect(body).toHaveProperty("gameImg", expect.any(String));
        expect(body).toHaveProperty("releaseDate", expect.any(String));
        expect(body).toHaveProperty("developer", expect.any(String));
        expect(body).toHaveProperty("genre", expect.any(String));
        expect(body).toHaveProperty("UserId", expect.any(Number));

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 POST games with invalid token", (done) => {
    request(app)
      .post(`/games`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .send({
        name: "test game",
        gameImg: "test image",
        releaseDate: "2016-07-14",
        developer: "test dev",
        genre: "MOBA"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 POST games without token", (done) => {
    request(app)
      .post(`/games`)
      .send({
        name: "test game",
        gameImg: "test image",
        releaseDate: "2016-07-14",
        developer: "test dev",
        genre: "MOBA"
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe("DELETE /games/:id", () => {
  test("200 delete selected game", (done) => {
    request(app)
      .delete(`/games/${idGame}`)
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Game has been deleted");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  test("403 delete selected game with unauthorized user", (done) => {
    request(app)
      .delete(`/games/1`)
      .set("Authorization", `Bearer ${validToken2}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "You are not authorized");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 delete selected game with invalid token", (done) => {
    request(app)
      .delete(`/games/${idGame}`)
      .set("Authorization", `Bearer ${invalidToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 delete selected game without token", (done) => {
    request(app)
      .delete(`/games/${idGame}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 delete selected game not found", (done) => {
    request(app)
      .delete(`/games/99`)
      .set("Authorization", `Bearer ${validToken}`)
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Data not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});