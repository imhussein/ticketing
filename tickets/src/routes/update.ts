import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";
import { requireAuth } from "@mhtickets/common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-update-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send("Ticket Not Found");
    }

    if (req.params.id !== ticket.userId) {
      return res.status(401).send("Not authorized");
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });

    await ticket.save();

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.send(ticket);
  }
);

export { router as updateRouter };
