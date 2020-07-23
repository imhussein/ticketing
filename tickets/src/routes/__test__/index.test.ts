import request from "supertest";
import { app } from "../../app";

jest.mock("../../nats-wrapper");

const createTicket = () =>
  request(app).post("/api/tickets").set("Cookie", global.signin()).send({
    title: "this is title",
    price: 20,
  });

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  await createTicket();
  const response = await request(app).get("/api/tickets").send();
  expect(response.body.length).toEqual(4);
});
