let map = L.map("map").setView([26.8570872, 81.007659], 13);
let osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const startRide = document.getElementById("start-btn");
const stopRide = document.querySelector(".stop-btn");

let lat;
let long;
let marker;
let circle;

let userid = localStorage.getItem("userid");
let usertype = localStorage.getItem("usertype") !== "false";
const driver = !usertype;

startRide.addEventListener("click", userLocation);

function userLocation() {
  if (navigator.geolocation) {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        const coords = [lat, long];

        sendUserLocation({
          userid,
          x: lat,
          y: long,
          driver,
        });

        if (driver === true) {
          let driverIcon = L.icon({
            iconUrl: "./assets/rickshaw.png",
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
          });

          marker = L.marker(coords, { icon: driverIcon });

          circle = L.circle(coords, {
            color: "red",
            fillColor: "transparent",
            fillOpacity: 0.5,
            radius: 1000,
          });
        } else {
          let userIcon = L.icon({
            iconUrl: "./assets/user.png",
            iconSize: [16, 32],
            iconAnchor: [10, 20],
            popupAnchor: [0, 0],
          });

          marker = L.marker(coords, { icon: userIcon });

          circle = L.circle(coords, {
            color: "green",
            fillColor: "transparent",
            fillOpacity: 0.5,
            radius: 1000,
          });
        }

        let featureGroup = L.featureGroup([marker, circle]).addTo(map);
        map.fitBounds(featureGroup.getBounds());
        usertype === true ? getDriverData : getUserData;
      });
    }, 5000);
  } else {
    alert("Update your existing browser or install a new one !");
  }
}

const sendUserLocation = async (data) => {
  let url = "http://localhost:8000/location/addlocation";
  await axios
    .post(url, data)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

stopRide.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.assign("http://localhost:3000");
});

// to get all the active passenger location
const getUserData = async () => {
  let url = "http://localhost:8000/location/passenger";

  await axios.get(url).then((response) => {
    console.log(response);
  });
};

// to get all the active driver location

const getDriverData = async () => {
  let url = "http://localhost:8000/location/driver";

  await axios.get(url).then((response) => {
    console.log(response);
  });
};
getDriverData();

// To get drivers and passengers withing 5 kms radius of the current user.
const getData = async () => {
  let url =
    "http://localhost:8000/location/getinrange?x={latitude}&y={longitude}";

  await axios.get(url).then((response) => {
    console.log(response);
  });
};
