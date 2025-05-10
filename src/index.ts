import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/games";
import comboRoutes from "./routes/combos";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/games", gameRoutes);
app.use("/combos", comboRoutes);

app.get("/", (_, res) => {
  res.send("FGC Translator API is running 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}`));
