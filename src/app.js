const geoCode = require('./utils/geoCode')
const weather = require('./utils/weather')
const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const ejs = require('ejs')
const port = process.env.PORT
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './public')));

let address = "New Delhi"
let position = { latitude: 28.6139, longitude: 77.2090 }
app.get('/', (req, res) => {
    weather(position.latitude, position.longitude, (error, forecastdata) => {
        if (error) {
            return res.send({ error })
        }
        // console.log(forecastdata)
        res.render('index', {
            location: forecastdata.location.name,
            description: forecastdata.current.weather_descriptions[0],
            icon: forecastdata.current.weather_icons[0],
            temperature: forecastdata.current.temperature,
            feelslike: forecastdata.current.feelslike,
            windSpeed:forecastdata.current.wind_speed,
            pressure:forecastdata.current.pressure,
            cloud:forecastdata.current.cloudcover,
            uv:forecastdata.current.uv_index
        })
    })
})
app.get('/weather', (req, res) => {
    position.latitude = req.query.latitude
    position.longitude = req.query.longitude
    res.redirect('/')
})
app.post('/weather', (req, res) => {
    address = req.body.address
    geoCode(address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        position.latitude = data.Latitude
        position.longitude = data.Longitude
        res.redirect('/')
    })
    
})

app.listen(port, () => {
    console.log(`App listening at ${port}`)
})