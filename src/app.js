const geoCode = require('./utils/geoCode')
const weather = require('./utils/weather')
const express = require("express")
const path = require('path')
const res = require('express/lib/response')
const app = express()
const port = process.env.PORT
app.use(express.static(path.join(__dirname,'./public')));

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
    console.log(`App listening at ${port}`)
})