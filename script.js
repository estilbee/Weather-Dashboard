var searchButton = document.getElementById("search-button")
var historyArray = JSON.parse(localStorage.getItem("search-history")) || [] //checks for anything in local storage under key of "historyArray" or leaves as empty array
searchButton.addEventListener("click",function(){
    var searchValue = document.querySelector("#input-box").value
getApi(searchValue)
    historyArray.push(searchValue) //once search is made-->whether empty or full it pushes new searchValue into array
    localStorage.setItem("search-history", JSON.stringify(historyArray)) //take historyArray and set it into localStorage
    historyButton(searchValue)
})
function historyButton(textValue) {
    var button = $("<button>").text(textValue)
    button.addClass("waves-effect waves-light btn")
    button.on("click", function(){
        getApi(textValue) //since history button takes in textValue as its perameter,when calling history button on line 8 and plug searchValue -->it plugs that in as the textValue
    })
    $("#history-buttons").append(button)
}
for(var i =0; i<historyArray.length; i++){
    historyButton(historyArray[i])
}

function getApi(inputValue){
var requestUrl= `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=7ff95d427ec7a429b5759073047c96ef`;
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
    var requestUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7ff95d427ec7a429b5759073047c96ef&units=imperial`
    fetch(requestUrl2)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);  
        $("#forecast").empty()
        for( i = 4; i < data.list.length; i=i+8){ //i + 8 is telling it to iterate over every 24 hours for 5 days
            console.log(data.list[i])
            var forecastCard = $("<div>").addClass("card")
            var date = $("<h4>").text(moment.unix(data.list[i].dt).format("LL")).addClass("white-text")
            var temp = $("<h4>").text("temp: " + data.list[i].main.temp + "°").addClass("white-text")
            var humidity = $("<h4>").text("humidity: " + data.list[i].main.humidity + "%").addClass("white-text")
            var wind = $("<h4>").text("wind speed: " + data.list[i].wind.speed + "mph").addClass("white-text")
            var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/"+ data.list[i].weather[0].icon + ".png")
            var row = $("<div>").addClass("row")
            var col = $("<div>").addClass("col s12 m12")
            var panel = $("<div>").addClass("card-panel teal")

            panel.append(icon,date,temp,humidity,wind)
            col.append(panel)
            row.append(col)
            forecastCard.append(row)
        $("#forecast").append(forecastCard)
        }
    });
}


function getApi3(lat,lon){
    var requestUrl3 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7ff95d427ec7a429b5759073047c96ef&units=imperial`
    fetch(requestUrl3)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); 
        $("#current-weather").empty()
        var currentWeather = $("<div>").addClass("card")
            var currentDate = $("<h4>").text(moment.unix(data.dt).format("LL")).addClass("white-text")
            var name = $("<h4>").text("City: " + data.name).addClass("white-text")
            var currentTemp = $("<h4>").text("Today's temp: " + data.main.temp + "°").addClass("white-text")
            var currentHumidity = $("<h4>").text("Today's humidity: " + data.main.humidity + "%").addClass("white-text")
            var currentWind = $("<h4>").text("Today's wind speed: " + data.wind.speed + "mph").addClass("white-text")
            var row = $("<div>").addClass("row")
            var col = $("<div>").addClass("col s12 m12")
            var panel = $("<div>").addClass("card-panel blue")
            var icon = $("<img>").attr("src", "https://openweathermap.org/img/w/"+ data.weather[0].icon + ".png")

            panel.append(icon,name,currentDate,currentTemp,currentHumidity,currentWind)
            col.append(panel)
            row.append(col)
            currentWeather.append(row)
        $("#current-weather").append(currentWeather)

    });
}

