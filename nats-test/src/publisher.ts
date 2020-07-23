import nats from "node-nats-streaming";
import "colors";
import crypto from "crypto";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

const client = nats.connect(
  "ticketing",
  crypto.randomBytes(4).toString("hex"),
  {
    url: "http://localhost:4222",
  }
);

client.on("connect", async () => {
  console.log("Publisher connected on NATS".green);

  try {
    const res = await new TicketCreatedPublisher(client).publish({
      id: "123",
      title: "concert",
      price: 20,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
});
