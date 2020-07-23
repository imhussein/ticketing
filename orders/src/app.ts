import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@mhtickets/common";
import { deleteRoute } from "./routes/delete";
import { indexRoute } from "./routes/index";
import { newRoute } from "./routes/new";
import { showRoute } from "./routes/show";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);
app.use(deleteRoute);
app.use(showRoute);
app.use(indexRoute);
app.use(newRoute);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
