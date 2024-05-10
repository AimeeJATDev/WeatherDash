const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?";
const geocodingApiUrl = "https://us1.locationiq.com/v1/search?";
const geoApiKey = "pk.94745bb3fc90ed960d50ca389a48961c"

function datetime() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes
    }

    let currentTime = `${hours}:${minutes}`;

    values = [currentDate, currentTime]

    return values
}

function updateTime() {
    let dateTime = datetime()
    document.getElementById("current-date").innerHTML = dateTime[0]
    document.getElementById("current-time").innerHTML = dateTime[1]
    /*console.log(dateTime)*/
    setInterval(updateTime, 60000)
}

updateTime()

async function findLocation(location) {
    
    try {
        const response = await fetch(geocodingApiUrl + new URLSearchParams({
            "key": geoApiKey,
            "country": location,
            "format": "json"
        }));

        if (!response.ok) {
            throw new Error("Issue with network response");
        }

        const data = await response.json();

        let latitude = data[0].lat;
        let longitude = data[0].lon;

        values = [latitude, longitude]

        return values;

    }
    catch(error) {
        console.log(error)
    }
}

async function getCurrentWeatherData(latitude, longitude) {
    try {
        const response = await fetch (weatherApiUrl + new URLSearchParams({
            "latitude": latitude,
            "longitude": longitude,
            "current": ["temperature_2m", "weather_code"]
        }))

        if (!response.ok) {
            throw new Error("Issue with network response")
        }

        const data = await response.json()

        return data;
    }
    catch(error) {
        console.log(error)
    }
}

async function getHourlyWeatherData(latitude, longitude) {
    try {
        const response = await fetch(weatherApiUrl + new URLSearchParams({
            "latitude": latitude,
            "longitude": longitude,
            "hourly": ["temperature_2m", "weather_code"],
            "forecast_days": 1
        }))

        if (!response.ok) {
            throw new Error("Issue with network response")
        }

        const data = await response.json()

        return data;
        
    }
    catch(error) {
        console.log(error)
    }
}

async function getWeeklyWeatherData(latitude, longitude) {
    try {
        const response = await fetch(weatherApiUrl + new URLSearchParams({
            "latitude": latitude,
            "longitude": longitude,
            "daily": ["temperature_2m_max", "weather_code"],
            "forecast_days": 7
        }))

        if (!response.ok) {
            throw new Error("Issue with network response")
        }

        const data = await response.json();

        return data;
        
    }
    catch(error) {
        console.log(error)
    }
}

let locationForm = document.getElementById("location-form");

async function autocomplete(input) {
    try {
        const response = await fetch(geocodingApiUrl + new URLSearchParams({
            "key": geoApiKey,
            "country": input,
            "format": "json"
        }));

        if (!response.ok) {
            throw new Error("Issue with network response")
        }

        const data = await response.json();
        let places = []

        for (let i = 0; i < data.length; i++) {
            places.push(data[i].display_name)
        }

        return places;
    }
    catch(error) {
        console.log(error)
    }
}

function decodeWeather(weatherCode) {
    /* Weather Codes and Descriptions from: https://open-meteo.com/en/docs */
    weatherDict = {
        "0": "Clear Sky",
        "1": "Mainly Clear",
        "2": "Partly Cloudy",
        "3": "Overcast",
        "45": "Fog",
        "48": "Depositing Rime Fog",
        "51": "Light Drizzle",
        "53": "Moderate Drizzle",
        "55": "Dense Drizzle",
        "56": "Light Freezing Drizzle",
        "57": "Dense Freezing Drizzle",
        "61": "Slight Rain",
        "63": "Moderate Rain",
        "65": "Heavy Rain",
        "66": "Light Freezing Rain",
        "67": "Heavy Freezing Rain",
        "71": "Slight Snowfall",
        "73": "Moderate Snowfall",
        "75": "Heavy Snowfall",
        "77": "Snow Grains",
        "80": "Slight Rain Showers",
        "81": "Moderate Rain Showers",
        "82": "Violent Rain Showers",
        "85": "Slight Snow Showers",
        "86": "Heavy Snow Showers",
        "95": "Thunderstorm",
        "96": "Thunderstorm with Slight Hail",
        "99": "Thunderstorm with Heavy Hail"
    }

    for (const [key, value] of Object.entries(weatherDict)) {
        if (weatherCode == key) {
            return value;
        }
    }
}

function chooseImage(weatherCode) {
    let image;
    if (weatherCode == 0) {
        image = "images/large/icons8-sun-96.png"
    }
    else if (weatherCode == 1 || weatherCode == 2) {
        image = "images/large/icons8-partly-cloudy-day-96.png"
    }
    else if (weatherCode == 3) {
        image = "images/large/icons8-cloud-96.png"
    }
    else if (weatherCode == 45 || weatherCode == 48) {
        image = "images/large/icons8-fog-96.png"
    }
    else if (weatherCode == 51 || weatherCode == 53 || weatherCode == 55) {
        image = "images/large/icons8-drizzle-96.png"
    }
    else if (weatherCode == 56 || weatherCode == 57 || weatherCode == 66 || weatherCode == 67) {
        image = "images/large/icons8-sleet-96.png"
    }
    else if (weatherCode == 61 || weatherCode == 63 || weatherCode == 65 || weatherCode == 80 || weatherCode == 81 || weatherCode == 82) {
        image = "images/large/icons8-rain-96.png"
    }
    else if (weatherCode == 71 || weatherCode == 73 || weatherCode == 75 || weatherCode == 77 || weatherCode == 85 || weatherCode == 86) {
        image = "images/large/icons8-snow-96.png"
    }
    else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99) {
        image = "images/large/icons8-storm-96.png"
    }

    return image
}

locationForm.addEventListener("keyup", (e) => {
    e.preventDefault()
    let inputField = document.getElementById("location-field").value;
    autocomplete(inputField).then(data => {
        var list = document.getElementById("location-list")
        data.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item;
            list.appendChild(option);
        })
    });
})

locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputField = document.getElementById("location-field").value;

    findLocation(inputField).then(data => {
        getCurrentWeatherData(data[0], data[1]).then(current => {
            document.getElementById("temperature").innerHTML = current.current.temperature_2m + current.current_units.temperature_2m;
            document.getElementById("forecast").innerHTML = decodeWeather(current.current.weather_code);
            document.getElementById("forecast-img").src = chooseImage(current.current.weather_code);
            console.log(current)
        });
        getHourlyWeatherData(data[0], data[1]).then(hourly => {
            console.log(hourly);
            let currentTime = datetime();
            let date = hourly.hourly.time;
            let headRow = document.getElementById("hourly-heading");
            let temp = hourly.hourly.temperature_2m;
            let forecast = hourly.hourly.weather_code;
            let forecastRow = document.getElementById("hourly-forecast");
            let tempRow = document.getElementById("hourly-temp")
            
            date.forEach(function(item) {
                var td = document.createElement('td');
                var index = item.indexOf("T") + 1
                var hour = item.slice(index)
                if (hour > currentTime[1] ) {
                    td.innerText = hour;
                    headRow.appendChild(td);
                }
            });

            forecast.forEach(function(item) {
                var td = document.createElement('td');
                
            })

            temp.forEach(function(item) {

            })

        });
        getWeeklyWeatherData(data[0], data[1]).then(weekly => {
            console.log(weekly)
        });
    })
});
