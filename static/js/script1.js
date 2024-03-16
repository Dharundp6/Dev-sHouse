// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle profile picture selection
    function handleProfilePictureSelection(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const profilePicture = document.getElementById('profile-picture');
                profilePicture.src = e.target.result;
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    // Event listener for profile picture input change
    const profilePictureInput = document.getElementById('profile-picture-input');
    profilePictureInput.addEventListener('change', handleProfilePictureSelection);

    // Dark/Light Mode Toggle Functionality
    const modeToggleBtn = document.getElementById('mode-toggle-button');

    modeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Change mode toggle button text based on current mode
        const currentMode = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
        modeToggleBtn.textContent = currentMode;
    });

    // Get all parking boxes
    const parkingBoxes = document.querySelectorAll('.parking-box');

    // Initialize index for current active box
    let currentIndex = 0;

    // Function to show next box
    function showNextBox() {
        // Hide current active box
        parkingBoxes[currentIndex].classList.remove('active');

        // Move to the next box
        currentIndex = (currentIndex + 1) % parkingBoxes.length;

        // Show the next box
        parkingBoxes[currentIndex].classList.add('active');
    }

    // Set interval to automatically show next box every 3 seconds
    setInterval(showNextBox, 3000);

    // Easy Responsive Tabs Plugin Initialization
    $('#user-profile-tabs').easyResponsiveTabs({
        type: 'default', //default, vertical, accordion;
        width: 'auto',
        fit: true
    });

    // Form Submission for Parking Preferences
    const parkingPreferencesForm = document.getElementById('parkingPreferencesForm');
    parkingPreferencesForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const preferredLocations = document.getElementById('preferredLocations').value;
        const notificationPreferences = document.getElementById('notificationPreferences').value;
        const vehicleDetails = document.getElementById('vehicleDetails').value;

        // Perform form validation
        if (!preferredLocations || !notificationPreferences || !vehicleDetails) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // If form is valid, proceed with submission
        console.log('Form submitted successfully!');
        console.log('Preferred Locations:', preferredLocations);
        console.log('Notification Preferences:', notificationPreferences);
        console.log('Vehicle Details:', vehicleDetails);

        // Here you can send the form data to a server using AJAX
        // Example:
        // const formData = {
        //     preferredLocations: preferredLocations,
        //     notificationPreferences: notificationPreferences,
        //     vehicleDetails: vehicleDetails
        // };
        // fetch('submit_preferences.php', {
        //     method: 'POST',
        //     body: JSON.stringify(formData),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    });

    // Submit feedback form
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Fetch the feedback data from the form
        const feedback = document.getElementById("feedback").value;

        // Perform validation if needed

        // Here you can send the feedback data to the server using AJAX or any other method

        // For demonstration, let's log the feedback to the console
        console.log("Feedback submitted:", feedback);

        // Optionally, display a confirmation message or reset the form
        feedbackForm.reset();
    });
});
