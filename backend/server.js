const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const pdfRoutes = require("./routes/pdf");
const stripeRoutes = require("./routes/stripe");

app.use("/api/pdf", pdfRoutes);
app.use("/api/stripe", stripeRoutes);

app.get("/", (req, res) => res.json({ message: "CareerForge Backend Running ✅" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
