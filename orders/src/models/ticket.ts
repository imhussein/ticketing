import { Model, Document, model, Schema } from "mongoose";
import { OrderStatus } from "@mhtickets/common";
import { Order } from "./order";

interface TicketAttrs {
  title: string;
  price: number;
}

interface TicketDoc extends Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

ticketSchema.methods.isReserved = async function (): Promise<boolean> {
  return !!(await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.CREATED,
        OrderStatus.AWAITPAYMENT,
        OrderStatus.COMPLETE,
      ],
    },
  }));
};

const Ticket = model<TicketDoc, TicketModel>("Ticket", ticketSchema);
export { Ticket, TicketDoc };
