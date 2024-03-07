const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=49.4585&longitude=-2.5787&hourly=temperature_2m";

async function fetchUrl() {
    try {
        const response = await fetch(weatherApiUrl);

        if (!response.ok) {
            throw new Error("Issue with network response")
        }
        
        return response.json;

    }

    catch(error) {
        console.log(error);
    }
}

async function loadHTML() {
    try {
        const response = await fetch('../dashboard/dashboard.html');

        if (!response.ok) {
            throw new Error("Couldn't load HTML page");
        }

        document.body.innerHTML = response.text();
    }

    catch(error) {
        console.log(error);
    }
}

loadHTML();

function datetime() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate);

    let hours = date.getHours();
    let minutes = date.getMinutes();

    let currentTime = `${hours}:${minutes}`;
    console.log(currentTime);
}