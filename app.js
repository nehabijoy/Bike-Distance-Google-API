// set map options 

var myLatLng ={ lat: 37.229572, lng: -80.413940 }
var mapOptions = {
    center: myLatLng, 
    zoom: 12, 
    mapTypeId: google.maps.MapTypeId.ROADMAP
};


//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create an object to use the route method and get a result
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

// will calculate distance, time, start location, end location
function calcRoute() {
    // create ask 
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.BICYCLING, // can use any method of transportation
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }
    
    // pass to the route method 
    directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
            // get distance and time 

            var output = document.querySelector('#output');
            
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Biking distance<i class='fa-solid fa-person-biking'></i> : " + result.routes[0].legs[0].distance.text + ".<br />ETA <i class='fa-solid fa-clock'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";
            // display route 
            directionsDisplay.setDirections(result); 

        } else {
            // erase route from map 
            directionsDisplay.setDirections({ routes: []}); 

            // map centered in Blacksburg
            map.setCenter(myLatLng);

            // show error input 
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }

    });


}



// autocomplete --> feature that fills in the blank when user is typing locations 
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from"); 
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to"); 
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
