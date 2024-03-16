function updateClock() {
    var now = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[now.getDay()];
    var date = now.getDate();
    var month = now.getMonth() + 1; // Months are zero based
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeFormat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 12 hour format
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var currentTime = day + ', ' + date + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + timeFormat;
    document.querySelector('.clock').textContent = currentTime;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize the clock when the page loads
updateClock();


// LOCATION SEARCHING IN MAPS 
    // Initialize Leaflet map
    var map = L.map('map').setView([51.505, -0.09], 13); // Set initial coordinates and zoom level

    // Add base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Leaflet Search plugin
    var searchControl = new L.Control.Search({
        position: 'topright',
        layer: L.marker([0, 0]), // Empty layer as we'll add search results dynamically
        propertyName: 'name', // Property to search in
        initial: false,
        zoom: 16,
        marker: false
    });
    searchControl.on('search:locationfound', function(e) {
        map.setView(e.latlng, 16); // Set map view to the found location
    });
    map.addControl(searchControl);

    // Add Leaflet Control Geocoder for current location control
    L.Control.geocoder().addTo(map);

    // Function to add locations to dropdown and map
    function addLocationsToDropdown(locations) {
        var dropdown = document.getElementById('location-dropdown');
        dropdown.innerHTML = ''; // Clear existing options

        locations.forEach(location => {
            var option = document.createElement('option');
            option.value = JSON.stringify(location.coordinates); // Store coordinates as option value
            option.textContent = location.name;
            dropdown.appendChild(option);

            L.marker(location.coordinates).addTo(map).bindPopup(location.name);
        });
    }

    // Sample parking locations data
    var parkingLocations = [
        { name: "Parking Location 1", coordinates: [51.5, -0.09] },
        { name: "Parking Location 2", coordinates: [51.51, -0.1] },
        { name: "Parking Location 3", coordinates: [51.49, -0.08] }
        // Add more parking locations with their coordinates
    ];

    // Add locations to dropdown and map
    addLocationsToDropdown(parkingLocations);

    // Handle location selection from dropdown
    var locationDropdown = document.getElementById('location-dropdown');
    locationDropdown.addEventListener('change', function() {
        var selectedLocation = JSON.parse(this.value);
        map.setView(selectedLocation, 16); // Set map view to the selected location
    });

// THE  LAYOUT VIEW OF PARKING SPACES

// Example JavaScript code for dynamically generating parking spaces
const parkingLayout = document.getElementById('parkingLayout');

// Simulated parking data (replace with actual data)
const parkingData = [
    { id: 1, status: 'available' },
    { id: 2, status: 'reserved' },
    { id: 3, status: 'occupied' },
    // Add more parking spaces as needed
];

// Generate parking spaces dynamically
parkingData.forEach(space => {
    const parkingSpace = document.createElement('div');
    parkingSpace.classList.add('parking-space');
    parkingSpace.dataset.id = space.id;

    switch (space.status) {
        case 'available':
            parkingSpace.classList.add('available');
            break;
        case 'reserved':
            parkingSpace.classList.add('reserved');
            break;
        case 'occupied':
            parkingSpace.classList.add('occupied');
            break;
    }

    parkingLayout.appendChild(parkingSpace);
});


// Get all parking spots
const parkingSpots = document.querySelectorAll('.parking-spot');

// Iterate through each parking spot
parkingSpots.forEach(spot => {
    // Add mouseenter event listener
    spot.addEventListener('mouseenter', () => {
        // Get the tooltip message from data-tooltip attribute
        const tooltipMessage = spot.dataset.tooltip;
        
        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = tooltipMessage;
        
        // Position the tooltip relative to the parking spot
        const rect = spot.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight}px`;
        tooltip.style.left = `${rect.left}px`;
        
        // Append tooltip to the document body
        document.body.appendChild(tooltip);
    });
    
    // Add mouseleave event listener
    spot.addEventListener('mouseleave', () => {
        // Remove the tooltip when mouse leaves the parking spot
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});



// Availability Display
function showAvailability(date, time, location) {
    // Example logic to fetch available parking slots based on date, time, and location
    const availableSlots = []; // Assume this array contains available slots
    const availabilityInfo = document.getElementById('availability-info');
    availabilityInfo.innerHTML = `<p>Available Parking Slots:</p><ul>`;
    availableSlots.forEach(slot => {
        availabilityInfo.innerHTML += `<li>${slot}</li>`;
    });
    availabilityInfo.innerHTML += `</ul>`;
}

// Pricing Information
function calculatePricing(duration, location) {
    // Example logic to calculate pricing based on duration and location
    const pricingInfo = document.getElementById('pricing-info');
    // Assume price calculation logic here
    pricingInfo.innerHTML = `<p>Pricing Information:</p><p>Total Cost: $X.XX</p>`;
}

// User Details Form Submission
const reservationForm = document.getElementById('reservation-form');
reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const vehicle = document.getElementById('vehicle').value;
    // Example: Sending reservation details to server for confirmation
    // Assume AJAX request or other submission logic here
    console.log('Reservation Details:', { name, contact, vehicle });
    // Example: Show confirmation message to user
    alert('Reservation confirmed! Thank you for booking with us.');
});
    

