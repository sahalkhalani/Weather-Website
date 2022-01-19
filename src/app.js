const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

const app = express()


// Define Paths for express configurations
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handle-bar engine and views path
app.set('view engine', 'hbs') // To set the view engine setting value in order to create a dynamic templates for the front end.
app.set('views', viewsPath) // To set the views path custom.
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDir)) //use function is used to customize the server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sahal Khalani'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Sahal Khalani'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sahal Khalani',
        Text: 'hey this is the help text you want to print in the browser'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Please provide the Address!' })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        foreCast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecast: foreCastData,
                location,
                address: req.query.address
            })
        })
    })




    // res.send({
    //     address: req.query.address
    // })
})


app.get('/prod', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide the search term'
        })

    }
    console.log(req.query.search)
    res.send({
        prod: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMessage: 'Help artical not found',
        name: 'sahal khalani'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'sahal khalani'
    })
})

//starting the server to listen to client
app.listen(3000, () => { // To start server, it takes port number and function to be run when server start
    console.log('server is up on port number 3000')
})