var weatherContainer = document.querySelector("#currWeatherContainer");
var searchEl = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var weatherUpdate = document.querySelector("#weather-update")
var tempId = document.getElementById("tempId");
var humidId = document.getElementById("humidId");
var windId = document.getElementById("windId");
var uvId = document.getElementById("uvId");


var searchFormHandler = function(){
    var cityName = searchEl.value.trim();
    if (cityName) {
        getCurrentWeather(cityName)
        searchEl.value = "";
    } else {
        alert("Please enter a city name");
    }

}
var getCurrentWeather =  function(cityName){
  // format the github api url
  var apiUrl = "http://api.openweathermap.org/data/2.5/forcast?q=" + cityName + "&units=imperial&appid=7d0096a167ea1572df8a347cb4cb0104";

  //make a request to the url
  fetch(apiUrl).then(function(response){
      if(response.ok){
      response.json().then(function(data){
         displayWeather(data, cityName);
      });
    } else {
        alert("Error: " + response.statusText);
    }
  })
  .catch(function(error){
      alert("Unable to connect to Open Weather")
    });
};
var displayWeather =  function(data, cityName){
    
    // weatherContainer.textContent="";
    weatherUpdate.textContent = cityName;

    //grab all of the data for each item
    //TEMP
    var weatherTemp = data.main.temp;
    console.log(weatherTemp);
    //HUMIDITY
    var weatherHumid = data.main.humidity;
    console.log(weatherHumid);
    //WIND
    var weatherWind = data.wind.speed;
    console.log(weatherWind);

    //display the info
    tempId.textContent = weatherTemp + " °F";
    humidId.textContent = weatherHumid + " %";
    windId.textContent = weatherWind + " mph";
    


    //We need the UV Index


}

searchBtn.addEventListener("click", searchFormHandler);