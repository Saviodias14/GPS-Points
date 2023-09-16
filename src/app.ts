import  express  from "express";
import "express-async-errors";
import cors from "cors";
import locationRouter from "./routes/location";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"))
  .use('/api/v1', locationRouter)
  

export default app;