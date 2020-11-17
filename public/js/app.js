console.log('Client side Javascript is loaded')

fetch('http://localhost:3000/weather?search=tokyo').then((response) => {
    response.json().then((data) => {
    if (data.error) {
        console.log(data.error)
    } else {
        console.log(data.address)
        console.log(data.weather_forecast.weather)
    }
    })
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageone = document.querySelector('#message-2')
const messagetwo = document.querySelector('#message-3')

// messageone.textContent = 'From JS'


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const location = searchElement.value

    messageone.textContent = 'loading..'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?search='+ location).then((response) => {
    response.json().then((data) => {
    
    if (data.error) {
        return messageone.textContent = data.error

    } else  {
        messageone.textContent = 'The current location is: ' + data.weather_forecast.location,
        messagetwo.textContent = 'The weather is forecasted to be: ' + data.weather_forecast.weather
    }
    })
})
})