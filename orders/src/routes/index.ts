import express, { Request, Response } from "express";
import { requireAuth } from "@mhtickets/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");
  res.send(orders);
});

export { router as indexRoute };
