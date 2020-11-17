const request = require('request')

const geocode = (address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmVlbWF4eCIsImEiOiJja2hidWwzY2kwMmh6MnBtejU3bWcwZTYyIn0.BeDhOBwtuJzRFErO9PJdCQ'
    console.log(geourl)
    request({url : geourl, json: true }, ( error,response) => { 
        if (error) {
            callback('Unable to connect to location', undefined)
        } else if (response.body.features.length === 0){
            callback('Wrong destination',undefined)
        } else {
                callback(undefined, { 
                    location : response.body.features[0].place_name,
                    latitude : response.body.features[0].center[1],
                    longtitude : response.body.features[0].center[0]
            })
    }
},2000)
}

module.exports = geocode