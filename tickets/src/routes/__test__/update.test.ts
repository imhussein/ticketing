import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";

jest.mock("../../nats-wrapper");

it("returns a 404 if the provided id does not exists", async () => {
  await request(app)
    .put(`/api/tickets/${new Types.ObjectId().toHexString()}`)
    .set("Cookie", global.signin())
    .send({
      title: "fkshdfgsd",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .put(`/api/tickets/${new Types.ObjectId().toHexString()}`)
    .send({ title: "fkshdfgsd", price: 20 })
    .expect(401);
});

it("returns a 401 if the user doesn't own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "lfdgnmdfg",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "fljskhgsd",
      price: 29,
    })
    .expect(401);
});
