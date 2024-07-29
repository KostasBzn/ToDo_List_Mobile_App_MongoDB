import express from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import connectDB from "./config/db.js";

const port = process.env.PORT;

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

connectDB();

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
