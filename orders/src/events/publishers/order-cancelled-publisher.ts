import { Publisher, Subjects, OrderCanclledEvent } from "@mhtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCanclledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED;
}
