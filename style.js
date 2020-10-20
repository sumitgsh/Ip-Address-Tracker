
//location
apiKey="at_XV2sHvI8l2gTYJAeiuUgKxJty7SoY"

//Leaflet.js
accessToken="pk.eyJ1IjoiaGFjbXNhbSIsImEiOiJja2dmbGo2dTAweXVwMnZxenp2dGZhcDZjIn0.fEco-2DAHh6uC2XaEQSxLg"



//Search value DOM
srcInput=document.getElementById("search_val");
srcBtn=document.getElementById("searchBtn");
//Search Details DOM
ipAddress=document.getElementById("ip")
loc=document.getElementById("loc")
timeZone=document.getElementById("timezone")
isp=document.getElementById("isp")

//fetch details based on ipAddress Or Domain name
async function fetchDetails(url) {
  const response = await fetch(url);
  const json =await  response.json()

  // waits until the request completes...
  ipAddress.innerHTML=json.ip
  loc.innerHTML=json.location.country+","+json.location.city
  timeZone.innerHTML=json.location.timezone
  isp.innerHTML=json.isp

  buildMap(json.location.lat, json.location.lng)

  }

//When Search is Clicked i.e event Listener
srcBtn.addEventListener('click',()=>{

//Ipaddress or domain
ipOrDomain=srcInput.value;

url=`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipOrDomain}&domain=${ipOrDomain}`
fetchDetails(url)  

})


//Build Map based on latitude and longitude
var map
function buildMap(lat,lng)
{

  if(map)
  {
    map.remove()
  }
  map = L.map('mapid').setView([lat,lng], 13);


  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: `${accessToken}`
  }).addTo(map);
  
  var marker = L.marker([lat,lng],{icon: iconLocation}).addTo(map);

}

//icon Location for marker
var iconLocation = L.icon({
  iconUrl: './images/icon-location.svg',
  iconSize:     [30, 80], // size of the icon
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});