import express, { Express} from "express";
import compression from "compression"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "morgan"

import "./loadEnvironment.js";
import "express-async-errors";
import router from "./routes/routes.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app: Express = express();
app.use(cors());
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(helmet())
app.use(cookieParser())
app.use(morgan("dev"))

app.use('/api', router);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});