const request = require("request")

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWFkaWw4ODk5IiwiYSI6ImNreWE0azZsbjAxdzkybnJpZmwxNWVqeDcifQ.LR-XgecCNDyeuCU6QeLvrg&limit=1"
    request({ url: url, json: true }, function (error, response) {
        if (response.body.message) {
            callback("Something went wrong check your internet connection", undefined)
        }
        else {
            const data = {
                Latitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                Location: response.body.features[0].place_name
            }
            callback(undefined, data)
        }

    });
}
module.exports = geoCode