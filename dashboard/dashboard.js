const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?";

async function getWeatherData() {
    try {
        const response = await fetch (weatherApiUrl + new URLSearchParams({
            "latitude": 52.52,
            "longitude": 13.48,
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

getWeatherData();
