import express from "express";
import cors from "cors";
import analyzeRoutes from "./routes/analyze.routes.js";


const app = express();

app.use(cors({
  origin: "*", 
}));
app.use(express.json());
app.use("/api", analyzeRoutes);
app.use((req, res, next) => {
  console.log("🌐 Incoming:", req.method, req.url);
  next();
});


app.get("/", (req, res) => {
  res.send("ATS Resume Analyzer API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

