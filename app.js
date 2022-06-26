const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));

// App.get happen when i try to access the server when i access the Url it is going to fetch the index.html and display the content on my Screen 
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

//app.post is going to submit the data to the specified resource ("/") This will happen when we call the post request on the Form when we submit the city name 
app.post("/", function(req, res){

    const query = req.body.Cityname
    const apiKey = "00523192c158f2cfb5355ae402007193"
    const unit = "metric"
 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit 

    //https.get is going to fetch the data from URL 
    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp; 
            const WeatherDescription = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+ iconCode + "@2x.png"
            res.write("<h1>A " + query +" il fait " + temp + " degree  celcius.</h1>");
            res.write("<img src=" + imageURL +">");
            res.send()
        })
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});