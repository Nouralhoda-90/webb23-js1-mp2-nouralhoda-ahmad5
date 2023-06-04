
window.onload = function() {

const form = document.querySelector('form'); 
const cityInput = document.querySelector('#city'); 
const hoursInput = document.querySelector('#hours'); 
const apiKey = '5830ec8e95f8e61327f3a434e8fef4f8'; 
const forecastList = document.querySelector('#forecast-list');
const errorH3 = document.querySelector('#error');
const images = ['https://th.bing.com/th/id/OIP.tLZA-Yn2elDaC8BVnAVCsQHaEo?w=285&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', 'https://pixabay.com/get/gf0a4c3b8a5c7f7e9a6b0f2d4b7c8e1f6c3a0d9e1e9a1d2f8b3a4c6b0c3d5f8d_640.jpg', 'https://images.unsplash.com/photo-1501691223387-dd0500403074', 'https://image.freepik.com/free-photo/abstract-background-with-low-poly-design_1048-8479.jpg'];

function changeBackground() {
  const randomIndex = Math.floor(Math.random() * images.length); // Generate a random image from the array
  document.body.style.backgroundImage = `url(${images[randomIndex]})`; // Change the background image using the URL at that index
}


  //adds an event listener to the form element, which triggers when the user submits the form.
  form.addEventListener('submit', (event) => {
    event.preventDefault();//to prevents the default behavior of the form, which is to reload the page.
    changeBackground(); // Call the function to change the background image on each submit
 

    //gets the values of the city and hours input elements from the form.
  const city = cityInput.value;   
  const hours = hoursInput.value;   



  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=${hours}&appid=${apiKey}`;   //constructs the API URL with the city, hours, and API key parameters. 
  



// Construct the API URL with the city and API key parameters
const apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
// Send a request to the API and get a response
fetch(apiUrl1)
  .then((response) => {
    // Check if the response is ok
    if (response.ok) {
      // Parse the response as JSON
      return response.json();
    } else {
      // Throw an error message
      throw "No weather found.";
    }
  })
  .then((data) => {
    // Process the current weather data and display it on the website
    // Get the icon code from the data
    const iconCode = data.weather[0].icon;
    // Construct the icon URL from the icon code
    const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    // Get the temperature value from the data and convert it to Celsius
    const tempCelsius = data.main.temp;
    // Get the wind speed value from the data and convert it to meters per second
    const windSpeedMps = data.wind.speed;
    // Set the innerHTML of the weather icon element with the icon image
    document.getElementById("weather-icon").innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
    // Set the innerHTML of the location element with the city and country names
    document.getElementById("location").innerHTML = `${data.name}, ${data.sys.country}`;
    // Set the innerHTML of the desc element with the weather description
    document.getElementById("desc").innerHTML = `${data.weather[0].description}`;
    // Set the innerHTML of the c element with the temperature in Celsius
    document.getElementById("c").innerHTML = `${tempCelsius}°C`;
    document.getElementById("windspeed").innerHTML = ` ${windSpeedMps} km/h`;

  })
  .catch(handleError); // Catch any errors that occur during the fetch process and display them on the website using a h3 element.






 //I uses the fetch method to send a request to the API and get a response.  checks if the response is ok, and if so, parses it as JSON. If not, it throws an error message.
  fetch(apiUrl)     
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw "No weather found.";
    }
  })
    
    .then(data => {       
      // Process forecast data and display it on the website       
      forecastList.innerHTML = '';

      //it loops through the list of forecast data in the response and creates a list item element for each one.
      data.list.forEach(forecast => {
        const forecastItem = document.createElement('li');
        const iconCode = forecast.weather[0].icon; // Extract icon code from API response (extracts the icon code from the forecast data and constructs the icon URL from it.)
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`; // Construct icon URL
        const windSpeedMps = forecast.wind.speed;
        //sets the innerHTML of the list item element with the date, temperature, weather description, and icon image of the forecast data.
        forecastItem.innerHTML = `
          <h3>${forecast.dt_txt}</h3>
          <p>Temperature: ${forecast.main.temp}°C</p>
          <p>Weather: ${forecast.weather[0].description}</p>

          <img src="${iconUrl}" alt="${forecast.weather[0].description}"> 
          <p>Wind speed: ${windSpeedMps} km/h</p>
        `;
        forecastList.appendChild(forecastItem);  //appends the list item element to the forecast list element on the website.
      });
    })    
    
    .catch(handleError);   // catches any errors that occur during the fetch process and displays them on the website using a h3 element.
  
});


//dds an event listener to the hours input element, which triggers when the user changes its value.
hoursInput.addEventListener('change', (event) => {     
  const hours = event.target.value;     
  console.log(`Forecast for ${hours} hours selected`);   
});



function handleError(error) {
  
    errorH3.innerText = error;
  }
};