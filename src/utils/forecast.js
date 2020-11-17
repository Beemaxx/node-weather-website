const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const forecasturl = 'http://api.weatherstack.com/current?access_key=79cebaa1958df5d91308241d2a3e9f04&query=' + latitude + ',' + longtitude + '&units=m'
    console.log(forecasturl)
    request({url:forecasturl, json: true }, (error, response ) => {
        if (error) {
            callback('Unable to locate location', undefined)
        } else if (response.body.error){
            callback('Wrong Cordinate', undefined)
        } else {
            callback(undefined,{
                location: response.body.location.region +' of ' + response.body.location.country,
                latitude: response.body.location.lat,
                longtitude: response.body.location.lon,
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feel: response.body.current.feelslike
            })
        }
    })
}


module.exports = forecast