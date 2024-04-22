const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?";


async function findLocation(location) {
    const geocodingApiUrl = "https://us1.locationiq.com/v1/search?";
    const apiKey = "pk.94745bb3fc90ed960d50ca389a48961c"
    try {
        const response = await fetch(geocodingApiUrl + new URLSearchParams({
            "key": apiKey,
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

        console.log(data)
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

        console.log(data)
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

        console.log(data);
        return data;
        
    }
    catch(error) {
        console.log(error)
    }
}

let locationForm = document.getElementById("location-form");

async function autocomplete(input) {
    const geocodingApiUrl = "https://us1.locationiq.com/v1/search?key=pk.94745bb3fc90ed960d50ca389a48961c&country=" + input + "&format=json"
    const apiKey = "pk.94745bb3fc90ed960d50ca389a48961c"

    try {
        const response = await fetch(geocodingApiUrl)
            /*, new URLSearchParams({
            "key": apiKey,
            "country": input,
            "format": "json"
        }));*/

        const data = await response.json();
        let places = []

        for (let i = 0; i < data.length; i++) {
            places.push(data[i].display_name)
        }

        console.log(places)
        return places;
    }
    catch(error) {
        console.log(error)
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
        getCurrentWeatherData(data[0], data[1]);
        getHourlyWeatherData(data[0], data[1]);
        getWeeklyWeatherData(data[0], data[1]);
    })
});
