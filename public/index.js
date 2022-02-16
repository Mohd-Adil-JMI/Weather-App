const input=document.querySelector("#location")
const form=document.querySelector("form")
const description=document.querySelector(".description")
const icon=document.querySelector(".icon")
const currently=document.querySelector(".currently")
const feelslike=document.querySelector(".feelslike")
const city=document.querySelector(".location")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location=input.value
    city.textContent = "Loading"
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                city.textContent = data.error
            } else {
                city.textContent = data.location
                description.textContent=data.forecastdata.weather_descriptions[0]
                icon.setAttribute('src',data.forecastdata.weather_icons[0])
                currently.innerHTML = `CURRENTLY <br><span>${data.forecastdata.temperature}<sup>&#8451;</sup></span> `
                feelslike.innerHTML = `FEELSLIKE <br><span>${data.forecastdata.feelslike}<sup>&#8451;</sup></span> `
            }
        })
    })
})