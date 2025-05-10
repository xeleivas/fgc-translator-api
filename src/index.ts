import express from "express";
import cors from "cors";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("FGC Translator API is running 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
