import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contact.routes.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/contacts", contactRoutes);


app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectDB().then(() => app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}))
