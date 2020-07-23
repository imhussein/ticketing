import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
  queueGroupName = "paymentsService";
  onMessage(data: TicketCreatedEvent["data"], message: Message) {
    console.log("Event Data!", data);
    message.ack();
  }
}
