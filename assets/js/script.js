var weatherContainer = document.querySelector("#currWeatherContainer");
var searchEl = document.querySelector("#searchInput");
var searchBtn = document.querySelector("#searchBtn");
var weatherUpdate = document.querySelector("#weather-update")
var tempId = document.getElementById("tempId");
var humidId = document.getElementById("humidId");
var windId = document.getElementById("windId");
var uvId = document.getElementById("uvID");
var descriptionId = document.getElementById("description");
var fiveContainer = document.getElementById("fiveContainer");
var pastCities = [];
var pastCityContainer = document.getElementById("pastCities");
var pastCitiesUL = document.getElementById("pastCitiesList");


var searchFormHandler = function(){
    var cityName = searchEl.value.trim();
    pastCities.push(cityName);
    localStorage.setItem("pastCities",JSON.stringify(pastCities));
  
    if (cityName) {
        getCurrentWeather(cityName)
        displayPastCities(cityName);
        
       
        
        searchEl.value = "";
    } else {
        alert("Please enter a city name");
    }

}
var displayPastCities =  function(cityName){
        
        var savedCities = localStorage.getItem("pastCities")
        savedCities = JSON.parse(savedCities);
        
        var pastBtn = document.createElement("p");
        pastBtn.textContent = cityName;
        pastBtn.setAttribute('onclick',"getCurrentWeather(pastCities[0])");
        pastCityContainer.appendChild(pastBtn);
        

      
    }


var getCurrentWeather =  function(cityName){
  // format the github api url
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=7d0096a167ea1572df8a347cb4cb0104";

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

    var unixDate = data.dt;
    var date = new Date(unixDate * 1000);
    var currDate = date.toLocaleDateString();
    
    weatherUpdate.textContent="";
    weatherUpdate.textContent = cityName + " | " + currDate;

    //grab all of the data for each item
    //ICON
    var weatherIcon = data.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
    $(".icon").html("<img src='" + iconUrl  + "'>");
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
    
    // //We need the UV Index & fiveDay
    var finalApi = "https://api.openweathermap.org/data/2.5/onecall?&exclude=minutely,hourly&appid=7d0096a167ea1572df8a347cb4cb0104&lat="+ uvIndexLat + "&lon=" + uvIndexlon+"&units=imperial";

    fetch(finalApi)
        .then(function(response){
            if(response.ok){
                response.json().then(function(data){
                    //uv index populate
                    console.log(data);
                    
                    
                    var uvValue = data.current.uvi;
                    uvId.textContent = uvValue;
                    //control on what color to show
                    if(uvValue < 3){
                        uvId.style.backgroundColor = "green";
                    } else if (uvValue > 3 && uvValue < 6){
                        uvId.style.backgroundColor = "yellow";
                    } else {
                        uvId.style.backgroundColor = "red";
                    }
                    fiveContainer.innerHTML=""
                    //initialize the for loop
                        for(var i = 1; i < 6; i++ ){
                        //get and format date
                        var unixDate = data.daily[i].dt;
                        var newDate = new Date(unixDate * 1000);
                        var futureDate = newDate.toLocaleDateString();
                        //get weather
                        var futureWeather =  data.daily[i].temp.day;
                        //get humidity
                        var futureHumid = data.daily[i].humidity
                        // get icon
                        console.log(data.daily[i].weather[0].icon);
                        var weatherIcon = data.daily[i].weather[0].icon;
                        var iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
                        // $(".icon").html("<img src='" + iconUrl  + "'>");

                        //create the main element
                        var divContainer = document.createElement("div")
                        divContainer.className = ("card")
                        //create each element
                        var date = document.createElement("h6")
                        date.textContent = futureDate;
                        divContainer.appendChild(date);
                        var weather = document.createElement("p");
                        weather.textContent = "Temp " + futureWeather.toFixed(1) + "°F";
                        divContainer.appendChild(weather);
                        var humid = document.createElement("p");
                        humid.textContent = "Humidity: " + futureHumid + "%"
                        divContainer.appendChild(humid);

                        var iconI = document.createElement("i")
                        iconI.innerHTML = "<img src='" + iconUrl  + "'></img>"
                        divContainer.appendChild(iconI);

                        //append all
                        fiveContainer.appendChild(divContainer);
                    }
                })
            }
        })
}


displayPastCities()
searchBtn.addEventListener("click", searchFormHandler);
