
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