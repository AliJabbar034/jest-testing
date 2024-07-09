const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../models/user.model");
const app = require("..");

const url = "url";

beforeAll(async () => {
  mongoose
    .connect(url)
    .then(() => {})
    .catch((e) => {
      process.exit(0);
    });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Crud Api Test", () => {
  test("POST /user", async () => {
    const newUser = {
      name: "Eve",
      email: "eve@gmail.com",
      password: "457vyuy646",
    };
    const response = await request(app).post("/user").send(newUser);

    expect(response.statusCode).toBe(201);
  });

  test("GET user", async () => {
    const userId = "668cf04f8a1687ff452ed8d4";

    const response = await request(app).get(`/user/${userId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(userId);
  });
});
