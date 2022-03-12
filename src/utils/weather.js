const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key="+process.env.WEATHERSTACK_API_KEY+"&query="+latitude+","+longitude
    request({url:url,json:true}, function (error, response) {
        if (response.body.error) {
            callback("Something went wrong check your internet connection",undefined)
        }
        else{
            const data=response.body
            callback(undefined,data)
        }   
    });
}
module.exports=weather