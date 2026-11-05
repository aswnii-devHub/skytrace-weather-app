import "dotenv/config";
import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weather.js";
import alertRoutes from "./routes/alerts.js";
import stormRoutes from "./routes/storms.js";

const app = express();

app.disable("x-powered-by");

app.use(cors());

app.use(express.json({ limit: "100kb" }));

app.use("/api/weather", weatherRoutes);

app.use("/api/alerts", alertRoutes);

app.use("/api/storms", stormRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: "Unexpected server error",
    message: "Please retry in a moment.",
  });
});

const port = Number(process.env.PORT) || 5050;

app.listen(port, () =>
  console.log(`SKYTRACE API listening at http://localhost:${port}`),
);
