var weatherContainer = document.querySelector("#currWeatherContainer");
var searchEl = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var weatherUpdate = document.querySelector("#weather-update")
var tempId = document.getElementById("tempId");
var humidId = document.getElementById("humidId");
var windId = document.getElementById("windId");
var uvId = document.getElementById("uvID");
var descriptionId = document.getElementById("description");


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
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=7d0096a167ea1572df8a347cb4cb0104";

  //make a request to the url
  fetch(apiUrl).then(function(response){
      if(response.ok){
      response.json().then(function(data){
         displayWeather(data, cityName);
         console.log(data);
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

    var unixDate = data.dt;
    var date = new Date(unixDate * 1000);
    var currDate = date.toLocaleDateString();

    // var hours = date.getHours();
    // var minutes
    
    // weatherContainer.textContent="";
    weatherUpdate.textContent = cityName + " | " + currDate;

    //grab all of the data for each item

    //TEMP
    var weatherTemp = data.main.temp;
    //HUMIDITY
    var weatherHumid = data.main.humidity;
    //WIND
    var weatherWind = data.wind.speed;
    //UV INDEX LONGITUDE
    var uvIndexlon = data.coord.lon;
    //UV INDEX LATITUDE
    var uvIndexLat = data.coord.lat;
    

    //display the info
    // descriptionId.textContent = weatherDes + "|" + weatherIcon;
    tempId.textContent = weatherTemp + " °F";
    humidId.textContent = weatherHumid + " %";
    windId.textContent = weatherWind + " mph";
    
    // //We need the UV Index
    var uvApi = "https://api.openweathermap.org/data/2.5/uvi?appid=7d0096a167ea1572df8a347cb4cb0104&lat="+ uvIndexLat + "&lon=" + uvIndexlon;
    fetch(uvApi)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    var uvValue = data.value;
                    uvId.textContent = uvValue;
                })
            }
        })


}


searchBtn.addEventListener("click", searchFormHandler);