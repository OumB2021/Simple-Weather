const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {

  const query = req.body.city;
  const appid = "97f8660738048247d6990a3a34d25886";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + appid + "&units=" + units + "#";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", (data) => {

      const weather = JSON.parse(data);
      const weatherValue = weather.main.temp;
      const weatherDescription = weather.weather[0].description;
      const city = weather.name;

      res.write("<h1>The temperature in " + city + " is " + weatherValue + " degrees celsius.</h1>");
      res.write("<h2>The weather description is " + weatherDescription + "</h2>");
      res.send()
    });

  });
})

  

app.listen(3000, function(){
  console.log('listening on port 3000');
})