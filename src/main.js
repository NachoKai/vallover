$(document).ready(() => {
    let weatherURL = "https://api.forecast.io/forecast/2a7394813a0403820775ff64cbec063f/";

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
        visib = (data.currently.visibility) * 1.609;

        setTemp();

        $(".humidity").html((data.currently.humidity * 100).toFixed(0));
        $(".summary").html(data.currently.summary);
        $(".rainChance").html(data.currently.precipProbability * 100);
        $(".pressure").html(data.currently.pressure);
        $(".visibility").html(visib);
        $(".windSpeed").html(data.currently.windSpeed);
        $(".timezone").html(data.timezone.replace(/_/g, " "));
    };

    getLocation();
});

function displayImg() {
    let imagesArray = ["fragata.png", "hipocampo.png", "virgencita.png", "lobo_marino.png", "delfines.png"];
    let random = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    document.getElementById("img-div").innerHTML = `<img id="virgencita" src="img/${random}" onload="virgencita()" onclick="displayImg()">`;
};

function virgencita() {
    let prob = document.getElementById("humidity").innerText;
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

function showInfo() {
    Swal.fire(
        "Info",
        `
<img src="img/meme.jpg" height="250" width="250"><br><br>
<b style="color: #1c7ed6;">Azul</b> : Buen tiempo <br>
<b style="color: #5f3dc4;">Violeta</b> : Inestable<br>
<b style="color: #cc5de8;">Rosa</b> : Lluvioso
`,
        ""
    );
}

// https://darksky.net/dev/docs
