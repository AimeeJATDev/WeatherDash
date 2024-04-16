
async function getWeatherData(values) {
    const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?";
    try {
        const response = await fetch (weatherApiUrl + new URLSearchParams({
            "latitude": values[0],
            "longitude": values[1],
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

async function findLocation(location) {
    const geocodingApiUrl = "https://us1.locationiq.com/v1/search?";
    const apiKey = "pk.94745bb3fc90ed960d50ca389a48961c"
    try {
        const response = await fetch(geocodingApiUrl + new URLSearchParams({
            "key": apiKey,
            "country": location,
            "format": "json"
        }));

        /*if (!response.ok) {
            throw new Error("Issue with network response");
        }*/

        const data = await response.json();

        console.log(data[0].lat);
        console.log(data[0].lon);


        let latitude = data[0].lat;
        let longitude = data[0].lon;

        values = [latitude, longitude]

        return values;

    }
    catch(error) {
        console.log(error)
    }
}

let locationForm = document.getElementById("location-form");

locationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputField = document.getElementById("location-field").value;
    
    findLocation(inputField)
    getWeatherData();

});
