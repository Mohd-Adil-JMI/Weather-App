const currentLocation = document.querySelector('#currentLocation')
currentLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        location.href = `./weather/?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
    })
})
