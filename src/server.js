import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/prayer-times/:city", async (req, res) => {
  const { city } = req.params;
  try {
    const response = await fetch(`https://muslimsalat.com/${city}/weekly.json`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des horaires de prière.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
