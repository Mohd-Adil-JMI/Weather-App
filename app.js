const geoCode = require('./geoCode.js')
const weather = require('./weather.js')
const express = require("express")
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static("public"));

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        weather(data.Latitude, data.Longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecastdata,
                location:data.Location
            })
        })
    })

})
app.get('*', (req, res) => {
    res.send('Error|Page Not Found')
})
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})