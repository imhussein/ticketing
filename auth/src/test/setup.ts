import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
let mongo: MongoMemoryServer;

declare global {
  namespace NodeJS {
    interface Global {
      signin: () => Promise<string[]>;
    }
  }
}

beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = new MongoMemoryServer();
  const mongoURI = await mongo.getUri();
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
