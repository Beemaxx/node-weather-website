const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express ()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebar and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//set tatic directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather app',
        message: 'Use this site to get weather forecast',
        name : 'Bryant',
        copyright :'Copyright by ' 

    })
})

app.get('/about', (req,res) => { 
    res.render('about' , {
        title: 'About me',
        name: 'Bryant',
        copyright :'Copyright by' 
    })
})
app.get('/help', (req,res) => { 
    res.render('help' , {
        helpText : 'Helpful information', 
        title: 'Hello',
        name: 'Bryant',
        copyright :'Copyright by' 
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.search) {
        return res.send ({
            error: 'Please input the address'
        })
    } else {
        geocode(req.query.search, (error, {latitude,longtitude, location} = {})  => {
            if (error) {
                return res.send({error})
            }
        
               else forecast(latitude ,longtitude, (error, weather_forecast) => {
                    if (error) {
                        return res.send({error})
                    } 
                    console.log(weather_forecast)
                    res.send({
                    address : req.query.search,
                    weather_forecast,
                    })
                  })
        })
    }
})
    
//     res.send({
//         Page: 'Weather page', 
//         Forecast: 'Fine Weather',
//         Location: 'Hanoi',
//         Temperature: '23',
//         Longtitude: '',
//         Lattitude: '',
//         Address : req.query.search
//         })
// })



app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must proide a search term'
        })
     }

    console.log(req.query.search)
    res.send({
        products : []
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404page', {
        message: 'No help page data'
    })


})
app.get('*',(req,res)=>{
    res.render('404page', {
        error: 404,
        message: 'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port.' + port)
})