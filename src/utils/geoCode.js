const request = require('postman-request')

const geoCode = (address, callback) => {
    const  url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FoYWxraGFsYW5pIiwiYSI6ImNreTVrbjB0YjBtdzMyb3B2Y2FsYzltMWkifQ.6LzJ13EK49ZWI0ZiocKMDA&limit=1'

    request({ url, json: true }, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to Locations Service, Please check you interet connection!',undefined)
        }
        else if(!body.features || body.features.length === 0){
            callback('Unable to fetch the location, please check your inputs!',undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode