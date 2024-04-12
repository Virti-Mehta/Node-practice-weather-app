const request = require('postman-request');
const forecast = (Latitude,Longitude, callback) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=6541c4af6b58476c81661208241103&q=${Latitude},${Longitude}`;

request({ url, json: true }, (err, {body}) => {
  const {error, current} = body;
  if (err) {
    callback("Unable to connect to weather service", undefined);
  } else if (error) {
    callback("Unable to find location", undefined);
  } else {
    callback(undefined,`It is currently ${current.temp_c} degrees out. It feels like ${current.feelslike_c} degrees out.`      
    );
  }
});
}
module.exports = forecast;