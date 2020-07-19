import request from "supertest";
import { app } from "../../app";

it("it returns a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed@gmail.com",
      password: "1",
    })
    .expect(400);
});

it("returns a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed@gmail.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      password: "1",
    })
    .expect(400);
});

it("disallows dupliacate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed@gmail.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed@gmail.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successfull sign up", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "mohamed@gmail.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
