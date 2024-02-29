const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=49.4585&longitude=-2.5787&hourly=temperature_2m";

async function fetchUrl () {
    try {
        const response = await fetch(weatherApiUrl);

        if (!response.ok) {
            throw new Error("Issue with network response")
        }
        return response.json;

    }
    catch(error) {
        console.log("Error:", error);
    }
}