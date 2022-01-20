const weatherForm = document.querySelector('form')
const locationInput = document.getElementById('location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    document.getElementById('forecast').innerHTML = "Loading..."
    document.getElementById('locationResult').innerHTML = ""

    const url = '/weather?address=' + locationInput.value

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.getElementById('forecast').innerHTML = data.error
            }
            else {
                console.log(data.location)
                console.log(data.forecast)
                document.getElementById('forecast').innerHTML = data.forecast
                document.getElementById('locationResult').innerHTML = data.location
            }
        })
    })
})

