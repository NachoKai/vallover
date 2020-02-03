$(document).ready(() => {

    let weatherURL = "https://api.forecast.io/forecast/2a7394813a0403820775ff64cbec063f/";
    let tempInF = true;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocationWeather);
        } else {
            alert('Disculpa, tu navegador no soporta geolocalización.');
        }
    }

    function getLocationWeather(position) {
        let timeNow = Math.round(Date.now() / 1000);

        weatherURL += position.coords.latitude;
        weatherURL += ("," + position.coords.longitude);
        weatherURL += "," + timeNow + "?lang=es";

        $.ajax({
            url: weatherURL,
            jsonpCallback: "jsonpCallback",
            contentType: "application/json",
            dataType: "jsonp",
            exclude: "hourly",
            success: data => {
                setData(data);
            }
        });
    };

    let tempF;
    let tempC;

    function setTemp() {
        $(".temp-value").html(tempC);
    }

    function setData(data) {

        tempF = Math.round(data.currently.temperature);
        tempC = Math.round((5 / 9) * (tempF - 32));

        setTemp();

        $(".humidity").html(data.currently.humidity);
        $(".summary").html(data.currently.summary);
        $(".rainChance").html(data.currently.precipProbability * 100);
    };

    getLocation();
});

function displayImg() {
    let imagesArray = ["fragata.png", "hipocampo.png", "virgencita.png", "lobo_marino.png"];
    let random = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    document.getElementById("img-div").innerHTML = `<img id="virgencita" src="img/${random}" onload="virgencita()" onclick="displayImg()">`;
};

function virgencita() {
    let prob = document.getElementById("rainProb").innerText;
    for (i = 0; i <= prob; i++) {
        (i => {
            setTimeout(() => {
                value = i + 20 + "deg";
                document.getElementById("virgencita").style.filter = `hue-rotate(${value})`;
            }, 30 * i);
        })(i);
    };
};

document.getElementById("current-year").innerHTML = new Date().getFullYear();

// https://darksky.net/dev/docs
// https://api.darksky.net/forecast/2a7394813a0403820775ff64cbec063f/-34.6800128,-58.4998912?lang=es
