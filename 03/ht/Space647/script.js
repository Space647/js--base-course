let GOOGLE_KEY = "AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY";
let DARK_SKY_KEY = "2de010dcb0ebbb2d6031a1d3d61bf0b0";
let arrCity = [];

function weaterFetch(city) {
  Promise.resolve()
    .then(() => {
      return takeCoordinatsCityFetch(city);
    })
    .then(location => {
      return takeWeatherCityFetch(location);
    })
    .then(currentlyWether => {
      renderingWeatherCity(currentlyWether);
    })
    .then(() => renderingaddCityOnList());
}
function weaterXHR(city) {
  Promise.resolve()
    .then(() => {
      return takeCoordinatsCityXHR(city);
    })
    .then(location => {
      return takeWeatherCityXHR(location);
    })
    .then(currentlyWether => {
      renderingWeatherCity(currentlyWether);
    })
    .then(() => renderingaddCityOnList());
}
function handlerUrl() {
  handleUrl(window.location.hash);
  window.addEventListener("hashchange", () => handleUrl(window.location.hash));
}

function handleUrl(url) {
  let city = "";
  city = url.slice(1) || city;
  if (city) {
    choiceMethodRequestWeather(city);
  }
}
function eventForSearchWeather() {
  let CodeEnterButton = 13;
  document.querySelector(".searchLine").addEventListener("keypress", e => {
    let key = e.which || e.keyCode;
    if (key === CodeEnterButton) {
      e.preventDefault();
      choiceMethodRequestWeather();
    }
  });
}
function choiceMethodRequestWeather(
  city = document.querySelector(".searchLine").value
) {
  if (document.querySelector(".fetch").checked) {
    weaterFetch(city);
  } else {
    weaterXHR(city);
  }
}
function takeCoordinatsCityFetch(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        resolve(coordinatsCity(data, city));
      });
  });
}

function takeWeatherCityFetch(location) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${location}?lang=ru&units=si`
    )
      .then(response => response.json())
      .then(data => {
        resolve(createObjCurrentlyWether(data));
      });
  });
}

function takeCoordinatsCityXHR(city) {
  let location, lat, lng;
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_KEY}`,
      true
    );
    xhr.send();
    xhr.onload = xhr.onerror = function() {
      if (xhr.status !== 200) console.log("error:  " + xhr.status);
      var data = xhr.response;
      data = JSON.parse(data);
      resolve(coordinatsCity(data, city));
    };
  });
}

function takeWeatherCityXHR(location) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DARK_SKY_KEY}/${location}?lang=ru&units=si`,
      true
    );
    xhr.send();
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = xhr.response;
        data = JSON.parse(data);
        resolve(createObjCurrentlyWether(data));
      } else {
        var error = new Error(xhr.statusText);
        error.code = xhr.status;
        reject(error);
      }
    };
    xhr.onerror = () => reject(new Error("Network Error"));
  });
}

function renderingWeatherCity(currentlyWether) {
  return new Promise((resolve, reject) => {
    let placeRender = document.querySelector(".workPlace");
    placeRender.innerHTML = `<div class="icon"> <canvas id="WebIcon" width="150" height="150"></canvas> </div>
                               <div>
                               <span>Температура ${currentlyWether.temperature}&deg;</span> <br>
                               <span>Описание ${currentlyWether.summary}</span> <br>
                               <span>Влажность ${currentlyWether.humidity}</span> <br>
                               <span>скорость ветра ${currentlyWether.windSpeed}</span>
                               </div>`;
    webIcons(currentlyWether.icon);
    resolve();
  });
}
function webIcons(icon) {
  icon = String(icon);
  var icons = new Skycons({ color: "black" });
  switch (icon) {
    case "clear-day":
      icons.set("WebIcon", Skycons.CLEAR_DAY);
      break;
    case "clear-night":
      icons.set("WebIcon", Skycons.CLEAR_NIGHT);
      break;
    case "partly-cloudy-day":
      icons.set("WebIcon", Skycons.PARTLY_CLOUDY_DAY);
      break;
    case "partly-cloudy-night":
      icons.set("WebIcon", Skycons.PARTLY_CLOUDY_NIGHT);
      break;
    case "cloudy":
      icons.set("WebIcon", Skycons.CLOUDY);
      break;
    case "rain":
      icons.set("WebIcon", Skycons.RAIN);
      break;
    case "sleet":
      icons.set("WebIcon", Skycons.SLEET);
      break;
    case "snow":
      icons.set("WebIcon", Skycons.SNOW);
      break;
    case "wind":
      icons.set("WebIcon", Skycons.WIND);
      break;
    case "fog":
      icons.set("WebIcon", Skycons.FOG);
      break;
  }
  icons.play();
}

function addCityOnList(city) {
  window.location.hash = city;
  if (arrCity.indexOf(city) === -1) {
    if (arrCity.length === 5) {
      arrCity.splice(-1, 1);
      arrCity.unshift(city);
    } else {
      arrCity.unshift(city);
    }
  }
}

function renderingaddCityOnList() {
  return new Promise((resolve, reject) => {
    let placeRender,
      listCity = [];
    placeRender = document.querySelector(".list");
    listCity = arrCity
      .map(function(cityName) {
        return (listCity = `<li><a href="#${cityName}">${cityName}</a></li>`);
      })
      .join(" ");
    placeRender.innerHTML = listCity;
    resolve();
  });
}

function createObjCurrentlyWether(data) {
  return {
    temperature: data.currently.temperature,
    humidity: data.currently.humidity,
    summary: data.currently.summary,
    windSpeed: data.currently.windSpeed,
    icon: data.currently.icon
  };
}
function coordinatsCity(data, city) {
  let location, lat, lng;
  location = data.results[0].geometry.location;
  lat = location.lat;
  lng = location.lng;
  location = [lat, lng];
  addCityOnList(city);
  return location;
}
handlerUrl();
eventForSearchWeather();
