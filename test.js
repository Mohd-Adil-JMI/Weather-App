const request = require("request");
const url = "http://api.weatherstack.com/current?access_key=da715be8e5c36a3a25b5551996532339&query=51.507321899999994,-0.12764739999999997"
    request({url:url,json:true}, function (error, response) {
        if (response.body.error) {
            console.log(error)
        }
        else{
            const data={
                temperature:response.body.current.temperature,
                feelslike:response.body.current.feelslike
            }
            console.log(data)
        }   
    });