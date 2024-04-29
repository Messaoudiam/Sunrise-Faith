// react
import { useState } from "react";

function convertTo24(AMhours) {
  let composants = AMhours.split(":");
  let hours = parseInt(composants[0]);
  let minutes = parseInt(composants[1]);

  let isAM = AMhours.toLowerCase().indexOf("am") !== -1;

  if (hours === 12) {
    if (isAM) {
      hours = 0;
    }
  } else {
    if (!isAM) {
      hours += 12;
    }
  }

  return hours + ":" + minutes.toString().padStart(2, "0");
}

function dateFormat(date) {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Selectionnez votre ville"
          className="w-auto border border-gray-300 rounded-md py-2 px-4 mr-2 focus:outline-none focus:border-green-500 m-5"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Obtenir les Horaires de Prière
        </button>
      </form>

      {error && <p>Erreur: {error}</p>}

      {prayerTimes && (
        <ul className="flex gap-5 justify-center">
          {prayerTimes.items.map((item, index) => (
            <li
              key={index}
              className="flex justify-center items-center flex-col bg-white rounded-lg shadow-md p-3 mx-auto"
            >
              <strong className=" text-xl m-2">
                {dateFormat(new Date(item.date_for))}
              </strong>
              <ul>
                <li>Fajr: {convertTo24(item.fajr)}</li>
                <li>Dhuhr: {convertTo24(item.dhuhr)}</li>
                <li>Asr: {convertTo24(item.asr)}</li>
                <li>Maghrib: {convertTo24(item.maghrib)}</li>
                <li>Isha: {convertTo24(item.isha)}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Hours;
