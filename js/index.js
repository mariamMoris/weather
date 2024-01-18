
let response = [];
let loc ;
let current = [];
async function getWeather(location) {
    let api = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=98bf390ef8244d4f885184857241001&q=${location}&days=3`)
    api = await api.json();
    response = api.forecast.forecastday;
   loc = api.location.name;
   current = api.current
    console.log(current.condition.text)
displayWeather()
}
getWeather("cairo")

function displayWeather() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
    let cols = ""
   for(let i = 0 ; i<1 ; i++){
    const d = new Date(response[i].date).getDay();
    const day = days[d];
    const m = new Date(response[i].date).getMonth();
    const month = months[m]
    const date = new Date(response[i].date).getDate();

    cols += `
    <div class="col-lg-4 p-5 ">
    <div class="card bg-black bg-opacity-50 p-3  text-white">
      <p class="d-flex justify-content-between">${day}<span>${date} ${month}</span></p>
      <h3>${loc}</h3>
      <div class="d-flex justify-content-between">
        <span class="display-3 fw-bold">${current.temp_c}°C </span>
      <img src="https:${current.condition.icon}" alt="" class="w-25">
      </div>
      <p>${current.condition.text}</p>
      <div class="d-flex justify-content-between py-3">
      <i class="fa-solid fa-umbrella fs-6 "> 20 %</i>
      <i class="fa-solid fa-wind fs-6"> ${current.wind_kph} km/h</i>
      <i class="fa-solid fa-location-crosshairs fs-6"> East </i>
     </div>
    </div>
  </div>
      `}


   for(let i = 1 ; i<3 ; i++){
    const d = new Date(response[i].date).getDay();
    const day = days[d];
    const m = new Date(response[i].date).getMonth();
    const month = months[m]
    const date = new Date(response[i].date).getDate();

    cols += `<div class="col-lg-4 p-5 ">
    <div class="card bg-black bg-opacity-50 p-3  text-white text-center">
      <p class="">${day}</p>
      <img src="https:${response[i].day.condition.icon}" alt="" class="w-25 m-auto">
      <h1 class=" fw-bold">${response[i].day.maxtemp_c}°C</h1>
      <h5 class=" fw-bold mb-4">${response[i].day.mintemp_c}°C</h5>

      <p >${response[i].day.condition.text}</p>
    </div>
  </div>
      `
   }
   document.querySelector(".row").innerHTML = cols

}
document.querySelector("#search").addEventListener('keyup', function (e) {
    
        getWeather(e.target.value);
   
})



function getLocation() {
    if (navigator.geolocation) {
        const successCalBack = position => {
            console.log("success")
        }
        const errorCalBack = error => {
            console.log("error")
        }
        navigator.geolocation.getCurrentPosition(successCalBack,errorCalBack)
        
    }
}
