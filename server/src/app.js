import express from "express";
import cors from "cors";
import router from "./routes/index.routes.js";
const app = express();
import pdfRouter from "./routes/pdfRoutes.routes.js";
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use("/api/v1", router);
app.use("/api/v1", pdfRouter);

export default app;
