const request = require('request')

const weather = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key="+process.env.WEATHERSTACK_API_KEY+"&query="+latitude+","+longitude
    request({url:url,json:true}, function (error, response) {
        if (response.body.error) {
            callback("Something went wrong check your internet connection",undefined)
        }
        else{
            // const data={
            //     temperature:response.body.current.temperature,
            //     feelslike:response.body.current.feelslike,
            //     description:response.body.current.weather_descriptions[0],
            //     icon:response.body.current.weather_icons[0]
            // }
            const data=response.body.current
            callback(undefined,data)
        }   
    });
}
module.exports=weather