var searchButton = document.getElementById("search-button")

searchButton.addEventListener("click",function(){
    var searchValue = document.querySelector("#input-box").value
getApi(searchValue)
})

function getApi(inputValue){
var requestUrl= `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=7ff95d427ec7a429b5759073047c96ef`;
fetch(requestUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
        console.log(data[i].lat);
        console.log(data[i].lon);
      }
      getApi2(data[0].lat,data[0].lon);
      getApi3(data[0].lat,data[0].lon);
  });
}

function getApi2(lat,lon){
    var requestUrl2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7ff95d427ec7a429b5759073047c96ef&units=imperial`
    fetch(requestUrl2)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);  
        
        for( i = 4; i < data.list.length; i=i+8){ //i + 8 is telling it to iterate over every 24 hours for 5 days
            console.log(data.list[i])
            var forecastCard = $("<div>").addClass("card")
            var date = $("<h2>").text(moment.unix(data.list[i].dt).format("LL"))
            var temp = $("<h2>").text("temp: " + data.list[i].main.temp)
            var humidity = $("<h2>").text("humidity:" + data.list[i].main.humidity)
            




            forecastCard.append(temp, humidity, date)
        $("#forecast").append(forecastCard)
        }
    });
}


function getApi3(lat,lon){
    var requestUrl3 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ff95d427ec7a429b5759073047c96ef&units=imperial`
    fetch(requestUrl3)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); 
        
        var currentWeather = $("<div>").addClass("card")
            var currentDate = $("<h2>").text(moment.unix(data.dt).format("LL"))
            var currentTemp = $("<h2>").text("Today's temp: " + data.main.temp)
            var currentHumidity = $("<h2>").text("Today's humidity:" + data.main.humidity)
            




            currentWeather.append(currentTemp, currentHumidity, currentDate)
        $("#current-weather").append(currentWeather)

    });
}

