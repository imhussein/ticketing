import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";

jest.mock("../../nats-wrapper");

it("returns a 404 if ticket is not found", async () => {
  await request(app)
    .get(`/api/tickets/${new Types.ObjectId().toHexString()}`)
    .send({})
    .expect(404);
});

it("returns a ticket if ticket was found", async () => {
  const price = 20;
  const title = "this is title";
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);
  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
