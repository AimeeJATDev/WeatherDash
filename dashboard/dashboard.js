const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=49.4585&longitude=-2.5787&hourly=temperature_2m";

async function fetchUrl() {
    try {
        const response = await fetch(weatherApiUrl);

        if (!response.ok) {
            throw new Error("Issue with network response")
        }
        
        const data =  await response.json();
        console.log(data.timezone);

    }

    catch(error) {
        console.log(error);
    }
}

fetchUrl()
