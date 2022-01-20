const request = require('postman-request')

// const foreCast = ({ latitude, longitude, location }, callback) => {
const foreCast = (latitude, longitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=2405c4e97b294513250ec1469428d0a8&query=' + latitude + ',' + longitude + '&units=m'


    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        }
        else if (body.error) {
            callback("Unable to find location, Please check your inputs and try again!", undefined)
        }
        else {
            callback(undefined,"<img src=\"" + body.current.weather_icons[0] + "\" class=\"weather-icon\">   "+ body.current.weather_descriptions[0] + ". Currently temperature is " + body.current.temperature + " degrees and it feels like " + body.current.feelslike + " degrees!")
        }
    })
}

module.exports = foreCast