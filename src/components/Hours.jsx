import { useState } from "react";

function Hours() {
  const [city, setCity] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/prayer-times/${city}`
      );
      const data = await response.json();

      if (response.ok) {
        setPrayerTimes(data);
      } else {
        setError(data.error || "Une erreur inconnue s'est produite.");
      }
    } catch (error) {
      setError(
        "Une erreur s'est produite lors de la récupération des horaires de prière."
      );
    }
  };

  return (
    <div>
      <h2>Horaires de Prière Hebdomadaires par Ville</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Ville:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button type="submit">Obtenir les Horaires de Prière</button>
      </form>
      {error && <p>Erreur: {error}</p>}
      {prayerTimes && (
        <div>
          <h3>Horaires de Prière pour la Semaine</h3>
          <ul>
            {prayerTimes.items.map((item, index) => (
              <li key={index}>
                <strong>{item.date_for}</strong>:
                <ul>
                  <li>Fajr: {item.fajr}</li>
                  <li>Dhuhr: {item.dhuhr}</li>
                  <li>Asr: {item.asr}</li>
                  <li>Maghrib: {item.maghrib}</li>
                  <li>Isha: {item.isha}</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Hours;
