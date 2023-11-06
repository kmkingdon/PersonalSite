import express, { Express, Request, Response } from "express";
import compression from "compression"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan"

import "./loadEnvironment.js";
import "express-async-errors";
// import informations from "./routes/information.js";

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(helmet())
app.use(cookieParser())
app.use(morgan("dev"))

app.get('/', (_req:Request, res:Response) => {
  res.send('hello world')
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});