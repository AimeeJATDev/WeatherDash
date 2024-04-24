const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?";
const geocodingApiUrl = "https://us1.locationiq.com/v1/search?";
const geoApiKey = "pk.94745bb3fc90ed960d50ca389a48961c"

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
    weatherDict = {
        "0": "Clear Sky",
        "1": "Mainly Clear",
        "2": "Partly Cloudy",
        "3": "Overcast",
        "45": "Fog",
        "48": "Depositing Rime Fog",
        "51": "Light Drizzle"
    }

    for (const [key, value] of Object.entries(weatherDict)) {
        if (weatherCode == key) {
            return value;
        }
    }

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
            console.log(current)
            let forecast = decodeWeather(current.current.weather_code);
            document.getElementById("temperature").innerHTML = current.current.temperature_2m;
            document.getElementById("forecast").innerHTML = forecast;
            
        });
        getHourlyWeatherData(data[0], data[1]).then(hourly => {
            console.log(hourly)
        });
        getWeeklyWeatherData(data[0], data[1]).then(weekly => {
            console.log(weekly)
        });
    })
});
