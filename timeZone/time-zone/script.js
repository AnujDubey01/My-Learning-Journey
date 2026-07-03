
const x = document.getElementById("getLocate");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}

function error() {
  x.innerHTML = "Sorry, no position available.";
}

// Call getLocation() automatically when the page loads
window.onload = getLocation;


const output = document.getElementById("output");
const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", () => {
  const address = input.value.trim();
  if (address === "") {
    output.innerHTML = "Please enter an address.";
    return;
  }

  // Encode the address for URL safety
  const encodedAddress = encodeURIComponent(address);

  // Make API call
  fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&format=json&apiKey=92cbcbeeee31423a839ad343bb88d6e2`)
    .then((response) => response.json())
    .then((result) => {
      if (result && result.results && result.results.length > 0) {
        const timezone = result.results[0].timezone.name;
        const returnedAddress = result.results[0].formatted;

        output.innerHTML = `Address: ${returnedAddress}<br>Timezone: ${timezone}`;
      } else {
        output.innerHTML = "No location found.";
      }
    })
    .catch((error) => {
      console.error(error);
      output.innerHTML = "Error fetching timezone.";
    });
});
