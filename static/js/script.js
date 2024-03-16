function validateLoginForm() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    if (email === "" || password === "") {
        alert("Please enter both email and password for login.");
    }
}

function validateSignupForm() {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    if (email === "" || password === "") {
        alert("Please enter both email and password for sign up.");
    }
}

// JavaScript functionality specific to the "avil.html" page

// Function to fetch parking availability data from the backend
function fetchParkingAvailability() {
    // Make an API request to fetch parking availability data
    // Replace this with your actual API endpoint
    fetch('https://example.com/api/parking')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch parking availability data');
        }
        return response.json();
      })
      .then(data => {
        // Process the received data and update the UI
        displayParkingAvailability(data);
      })
      .catch(error => {
        console.error('Error fetching parking availability data:', error.message);
        // Handle errors and display an error message to the user
        displayErrorMessage('Failed to fetch parking availability data. Please try again later.');
      });
  }
  
  // Function to display parking availability data on the page
  function displayParkingAvailability(data) {
    // Assuming the data contains information about each parking space
    // Iterate over the data and update the UI accordingly
    data.forEach(parkingSpace => {
      const parkingSpaceElement = document.getElementById('parking-space-' + parkingSpace.id);
      if (parkingSpaceElement) {
        // Update the color of the parking space indicator based on availability
        parkingSpaceElement.style.backgroundColor = parkingSpace.available ? 'green' : 'red';
      }
    });
  }
  
  // Function to display an error message on the page
  function displayErrorMessage(message) {
    // Assuming there's an element with the ID "error-message" to display the error
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
      errorMessageElement.textContent = message;
      errorMessageElement.style.display = 'block';
    }
  }
  
  // Call the fetchParkingAvailability function to fetch and display parking availability data when the page loads
  window.addEventListener('load', function() {
    fetchParkingAvailability();
  });

  // Initialize the map
function initMap() {
    // Create a map object and specify the DOM element for display
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0}, // Set initial center coordinates
      zoom: 14 // Set initial zoom level
    });
  
    // Define the parking availability data
    var parkingData = [
      {location: {lat: 0, lng: 0}, availability: 'green', label: 'Parking Lot A'},
      {location: {lat: 0, lng: 0}, availability: 'yellow', label: 'Parking Lot B'},
      {location: {lat: 0, lng: 0}, availability: 'red', label: 'Parking Lot C'}
      // Add more parking data as needed
    ];
  
    // Loop through the parking data and add markers to the map
    parkingData.forEach(function(parking) {
      var marker = new google.maps.Marker({
        position: parking.location,
        map: map,
        title: parking.label,
        icon: getMarkerIcon(parking.availability)
      });
  
      // Add info window to display label
      var infoWindow = new google.maps.InfoWindow({
        content: '<strong>' + parking.label + '</strong>'
      });
  
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    });
  }
  
  // Function to get marker icon based on availability
  function getMarkerIcon(availability) {
    switch(availability) {
      case 'green':
        return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'yellow':
        return 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      case 'red':
        return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      default:
        return '';
    }
  }
// Function to fetch parking availability data from the backend system
function fetchParkingAvailability() {
    // Use fetch or AJAX to call APIs or web services to fetch parking availability data
    // Example:
    fetch('https://example.com/api/parking')
      .then(response => response.json())
      .then(data => {
        // Process the fetched data and update the UI
        updateParkingAvailabilityUI(data);
      })
      .catch(error => {
        console.error('Error fetching parking availability:', error);
      });
  }
  
  // Function to update the UI with parking availability data
  function updateParkingAvailabilityUI(data) {
    // Update the UI elements based on the fetched data
    // Example:
    const availabilityElement = document.getElementById('availability');
    availabilityElement.textContent = data.availableSpaces;
  
    // Update the last updated timestamp
    const lastUpdatedElement = document.getElementById('last-updated');
    const timestamp = new Date().toLocaleString();
    lastUpdatedElement.textContent = 'Last updated: ' + timestamp;
  }
  
  // Function to handle errors during data fetching
  function handleFetchError(error) {
    // Handle errors, such as displaying error messages to the user
    console.error('Error fetching parking availability:', error);
  }
  
  // Function to initialize the page and fetch parking availability data
  function initPage() {
    // Call the fetchParkingAvailability function to fetch data when the page loads
    fetchParkingAvailability();
  
    // Set up a timer to periodically fetch updated data
    setInterval(fetchParkingAvailability, 30000); // Fetch data every 30 seconds (adjust as needed)
  }
  
  // Call the initPage function when the page loads
  window.onload = initPage;
  
  document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
    const passwordStrength = document.getElementById("password-strength");
    const passwordField = document.getElementById("password");
    
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        const rememberMe = loginForm.remember-me.checked;

        // Validate username and password
        if (!username || !password) {
            errorMessage.textContent = "Please enter both username and password.";
            return;
        }

        // Simulate login process (replace with actual authentication logic)
        const isLoggedIn = simulateLogin(username, password);

        if (isLoggedIn) {
            // Store user session (replace with actual session management)
            storeSession(username, rememberMe);

            // Redirect to dashboard or desired page
            window.location.href = "/dashboard.html";
        } else {
            errorMessage.textContent = "Invalid username or password. Please try again.";
        }
    });

    passwordField.addEventListener("input", function() {
        const password = passwordField.value;
        const strength = getPasswordStrength(password);

        if (strength === "weak") {
            passwordStrength.textContent = "Password strength: Weak";
            passwordStrength.style.color = "red";
        } else if (strength === "medium") {
            passwordStrength.textContent = "Password strength: Medium";
            passwordStrength.style.color = "orange";
        } else if (strength === "strong") {
            passwordStrength.textContent = "Password strength: Strong";
            passwordStrength.style.color = "green";
        }
    });

    // Function to simulate login (replace with actual authentication logic)
    function simulateLogin(username, password) {
        // Simulate authentication (replace with actual authentication logic)
        // For demonstration purposes, accept any non-empty username/password
        return username && password;
    }

    // Function to store session (replace with actual session management)
    function storeSession(username, rememberMe) {
        // Store session data in localStorage or cookies
        // For demonstration purposes, simply log session status
        console.log("User logged in:", username);
        console.log("Remember Me:", rememberMe);
    }

    // Function to check password strength (replace with more robust implementation)
    function getPasswordStrength(password) {
        if (password.length < 6) {
            return "weak";
        } else if (password.length < 10) {
            return "medium";
        } else {
            return "strong";
        }
    }
});

// JavaScript code for handling form submission
document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve form data
  const reservationData = {
      date: document.getElementById("datePicker").value,
      entryTime: document.getElementById("timePickerEntry").value,
      exitTime: document.getElementById("timePickerExit").value,
      location: document.getElementById("locationSelection").value
  };

  // Here you can perform further validation or processing of the reservation data
  
  // For demonstration, let's log the reservation data to the console
  console.log("Reservation data:", reservationData);

  // Optionally, you can send the reservation data to a server-side script for further processing

  // Clear the form inputs after submission
  document.getElementById("reservationForm").reset();
});

// JavaScript code for handling available slots display
document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve form data
  const reservationData = {
      date: document.getElementById("datePicker").value,
      entryTime: document.getElementById("timePickerEntry").value,
      exitTime: document.getElementById("timePickerExit").value,
      location: document.getElementById("locationSelection").value
  };

  // Here you can perform further validation or processing of the reservation data

  // For demonstration, let's assume available slots are retrieved from an API or database
  const availableSlots = getAvailableSlots(reservationData);

  // Display available slots
  displayAvailableSlots(availableSlots);
});

function getAvailableSlots(reservationData) {
  // Implement logic to retrieve available slots based on reservation data
  // This could involve querying an API or database
  // For demonstration, let's return hardcoded available slots
  return ['Slot A', 'Slot B', 'Slot C']; // Example hardcoded available slots
}

function displayAvailableSlots(slots) {
  const slotsDisplay = document.getElementById("availableSlotsDisplay");
  slotsDisplay.innerHTML = ""; // Clear previous slots display

  if (slots.length === 0) {
      slotsDisplay.innerHTML = "<p>No available slots for the selected date, time, and location.</p>";
  } else {
      const slotsList = document.createElement("ul");
      slots.forEach(slot => {
          const slotItem = document.createElement("li");
          slotItem.textContent = slot;
          slotsList.appendChild(slotItem);
      });
      slotsDisplay.appendChild(slotsList);
  }
}

// JavaScript code for handling Confirmation Modal
const confirmationModal = document.getElementById("confirmationModal");
const confirmReservationBtn = document.getElementById("confirmReservationBtn");
const cancelReservationBtn = document.getElementById("cancelReservationBtn");
const reservationDetails = document.getElementById("reservationDetails");

document.getElementById("reservationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form data
    const reservationData = {
        date: document.getElementById("datePicker").value,
        entryTime: document.getElementById("timePickerEntry").value,
        exitTime: document.getElementById("timePickerExit").value,
        location: document.getElementById("locationSelection").value
    };

    // Display reservation details in the modal
    reservationDetails.textContent = `
        Date: ${reservationData.date}
        Entry Time: ${reservationData.entryTime}
        Exit Time: ${reservationData.exitTime}
        Location: ${reservationData.location}
    `;

    // Display the confirmation modal
    confirmationModal.style.display = "block";
});

// Close the modal when the user clicks on the close button
document.querySelector(".close").addEventListener("click", function() {
    confirmationModal.style.display = "none";
});

// Confirm reservation and close the modal
confirmReservationBtn.addEventListener("click", function() {
    // Here you can add code to submit the reservation data
    console.log("Reservation confirmed!");
    confirmationModal.style.display = "none";
});

// Cancel reservation and close the modal
cancelReservationBtn.addEventListener("click", function() {
    console.log("Reservation canceled!");
    confirmationModal.style.display = "none";
});

// JavaScript code for handling Reservation History section
document.addEventListener("DOMContentLoaded", function() {
  // Dummy reservation data (replace with actual data fetched from backend)
  const reservations = [
      { date: "2024-02-26", time: "10:00 AM", location: "Location 1", status: "Confirmed" },
      { date: "2024-02-25", time: "02:00 PM", location: "Location 2", status: "Canceled" },
      { date: "2024-02-24", time: "08:00 AM", location: "Location 3", status: "Confirmed" }
  ];

  const reservationHistory = document.getElementById("reservationHistory");

  // Loop through reservation data and create HTML elements for each reservation
  reservations.forEach(reservation => {
      const reservationItem = document.createElement("div");
      reservationItem.classList.add("reservation-item");

      const dateParagraph = document.createElement("p");
      dateParagraph.textContent = "Date: " + reservation.date;
      reservationItem.appendChild(dateParagraph);

      const timeParagraph = document.createElement("p");
      timeParagraph.textContent = "Time: " + reservation.time;
      reservationItem.appendChild(timeParagraph);

      const locationParagraph = document.createElement("p");
      locationParagraph.textContent = "Location: " + reservation.location;
      reservationItem.appendChild(locationParagraph);

      const statusParagraph = document.createElement("p");
      statusParagraph.classList.add("status");
      statusParagraph.textContent = "Status: " + reservation.status;
      reservationItem.appendChild(statusParagraph);

      reservationHistory.appendChild(reservationItem);
  });
});
// JavaScript code for handling payment method selection (if needed)
document.querySelectorAll('.payment-method').forEach(function(paymentMethod) {
  paymentMethod.addEventListener('click', function() {
      // Add your payment processing logic here
      console.log('Selected payment method:', paymentMethod.querySelector('p').textContent);
      // Example: Redirect user to payment gateway or display payment form
  });
});
// JavaScript code for handling cancellation form submission
document.getElementById("cancellationForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Retrieve form data
  const reservationID = document.getElementById("reservationID").value;
  const email = document.getElementById("email").value;

  // Here you can perform further validation or processing of the cancellation data

  // For demonstration, let's show a confirmation message and hide the form
  document.getElementById("cancellationForm").reset();
  document.getElementById("cancellationForm").classList.add("hidden");
  document.getElementById("cancellationConfirmation").classList.remove("hidden");
});
// JavaScript code for managing notifications
function showNotifications() {
  var notificationsSection = document.getElementById("notificationsSection");
  if (notificationsSection.style.display === "none") {
      notificationsSection.style.display = "block";
  } else {
      notificationsSection.style.display = "none";
  }
}
// JavaScript code for handling form submission and validation
document.addEventListener("DOMContentLoaded", function() {
  const registrationForm = document.getElementById("vehicleRegistrationForm");

  registrationForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Retrieve form data
      const licensePlateNumber = document.getElementById("licensePlateNumber").value;
      const vehicleType = document.getElementById("vehicleType").value;
      const ownerName = document.getElementById("ownerName").value;

      // Perform form validation
      if (licensePlateNumber.trim() === "" || vehicleType.trim() === "" || ownerName.trim() === "") {
          alert("Please fill out all required fields.");
          return;
      }

      // Construct the registration object
      const registrationData = {
          licensePlateNumber: licensePlateNumber,
          vehicleType: vehicleType,
          ownerName: ownerName
      };

      // Here you can perform further validation or processing of the registration data

      // For demonstration, let's log the registration data to the console
      console.log("Vehicle registration data:", registrationData);

      // Optionally, you can send the registration data to a server-side script for further processing

      // Clear the form inputs after submission
      registrationForm.reset();
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Fetch parking charges from database (replace with actual API endpoint)
  fetch('your-api-endpoint-for-parking-charges')
      .then(response => response.json())
      .then(data => {
          // Display parking charges dynamically
          displayParkingCharges(data);
      })
      .catch(error => console.error('Error fetching parking charges:', error));
});

function displayParkingCharges(data) {
  const parkingChargesContainer = document.getElementById('parkingCharges');
  const additionalInfo = document.getElementById('additionalInfo');

  if (data.length > 0) {
      // Create a table to display parking charges
      const table = document.createElement('table');
      table.classList.add('parking-charges-table');

      // Add table header
      const thead = table.createTHead();
      const headerRow = thead.insertRow();
      const durationHeader = headerRow.insertCell();
      durationHeader.textContent = 'Duration';
      const rateHeader = headerRow.insertCell();
      rateHeader.textContent = 'Rate';

      // Add table body
      const tbody = table.createTBody();
      data.forEach(charge => {
          const row = tbody.insertRow();
          const durationCell = row.insertCell();
          durationCell.textContent = charge.duration;
          const rateCell = row.insertCell();
          rateCell.textContent = charge.rate;
      });

      // Append table to container
      parkingChargesContainer.appendChild(table);

      // Display additional information
      additionalInfo.textContent = 'Additional fees may apply for overnight parking or special events. Discounts and promotions available for frequent users. Contact us for more details.';
  } else {
      // If no data is available
      parkingChargesContainer.textContent = 'No parking charges available.';
  }
}

// Smooth scrolling for side-scrolling section
document.querySelectorAll('.side-scrolling-section').forEach(item => {
  item.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const id = event.target.getAttribute('href').substr(1);
      document.getElementById(id).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// JavaScript for the car animation
document.addEventListener('DOMContentLoaded', function() {
  const carAnimation = document.getElementById('3dcar');
  carAnimation.classList.add('car-animation');
});

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// THE AVAILABILITY PAGE SCRIPT 

// Function to update the map based on the search input
function updateMapWithLocation(location) {
  // Replace this with your actual implementation using a mapping service like Google Maps API
  // For demonstration purposes, you can display a message indicating the selected location
  const mapContainer = document.getElementById('interactive-map');
  // Example: Construct a Google Maps URL to display the location
  const googleMapsURL = `https://www.google.com/maps/place/${encodeURIComponent(location)}`;
  // Update the map container with an embedded Google Maps link
  mapContainer.innerHTML = `<iframe src="${googleMapsURL}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
}

// Function to filter parking spots based on selected criteria
function filterParkingSpots() {
  const searchInput = document.querySelector('.search-bar').value;
  const locationFilter = document.getElementById('location-filter').value;
  const chargingStationFilter = document.getElementById('charging-station-filter').checked;
  const accessibilityFilter = document.getElementById('accessibility-filter').checked;

  // Implement your filtering logic here based on the selected criteria
  // For demonstration purposes, you can console.log() the selected filters
  console.log('Search Input:', searchInput);
  console.log('Location Filter:', locationFilter);
  console.log('Charging Station Filter:', chargingStationFilter);
  console.log('Accessibility Filter:', accessibilityFilter);

  // Perform further actions such as updating the displayed parking spots based on the filters
}

// Event listener for the search button click event
document.querySelector('.search-button').addEventListener('click', filterParkingSpots);

// Event listener for the search input change event
document.getElementById('search-input').addEventListener('input', function() {
  const searchInput = this.value.trim();
  // Check if the search input is related to location (e.g., a city or address)
  if (searchInput.length > 0) {
    updateMapWithLocation(searchInput);
  }
});

// Function to update parking availability status
function updateParkingStatus() {
  // Replace this with your actual implementation to fetch real-time parking availability data
  // For demonstration purposes, simulate data retrieval with a timeout
  setTimeout(() => {
    const parkingData = {
      totalSpots: 100,
      occupiedSpots: 20
    };
    const availableSpots = parkingData.totalSpots - parkingData.occupiedSpots;
    const statusElement = document.getElementById("parking-status");
    statusElement.innerHTML = `<p>${availableSpots} out of ${parkingData.totalSpots} spots available</p>`;
  }, 2000); // Simulating 2 seconds delay
}

// Call updateParkingStatus function initially and then set interval to update it periodically
updateParkingStatus();
setInterval(updateParkingStatus, 60000); // Update every minute (adjust interval as needed)

// RESERVATION REDIRECTION BUTTON 

function redirectToReservation() {
  window.location.href = "resv.html";
}


// SLiding Animation in Register page 

let slideIndex = 0;

function moveSlide(n) {
    const slides = document.getElementsByClassName("slide");
    slideIndex += n;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active-slide"); // Remove the active-slide class from all slides
    }
    slides[slideIndex].classList.add("active-slide"); // Add the active-slide class to the current slide
}




