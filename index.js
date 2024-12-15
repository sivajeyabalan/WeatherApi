async function getWeather() {
  const location = document.getElementById('locationInput').value;
  console.log(location);
  const startDate = document.getElementById('startDate').value || "today";
  const endDate = document.getElementById('endDate').value || "today";
  const apiKey = '8JLAXBJ7GH2BL5G29RAY7PSC8'; // Replace with your Visual Crossing API key
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?key=${apiKey}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Error fetching weather data. Please check your input.');
      }
      const data = await response.json();
      console.log(data);

      // Display weather information
      let weatherHTML = `<h3>Weather in ${data.resolvedAddress}</h3>`;
      data.days.forEach(day => {
          weatherHTML += `
              <p><strong>Date:</strong> ${day.datetime}</p>
              <p>Temperature: ${day.temp}°C</p>
              <p>Condition: ${day.conditions}</p>
              <hr>`;
      });
      document.getElementById('weatherResult').innerHTML = weatherHTML;
  } catch (error) {
      document.getElementById('weatherResult').innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
