let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");

    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      // call function
      changeBtn();
    });

    function changeBtn() {
      if(sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    }


document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector(".card-boxes-container");
  container.addEventListener("wheel", function(event) {
    event.preventDefault();
    container.scrollLeft += event.deltaY;
  });
});

 // JavaScript for notifications
 document.addEventListener("DOMContentLoaded", function() {
  const notificationsIcon = document.querySelector('.notifications_icon');
  const notificationsContainer = document.querySelector('.notifications_container');

  // Toggle notifications container visibility when clicking on the icon
  
  notificationsIcon.addEventListener('click', function() {
    notificationsContainer.classList.toggle('show');
  });

  // Close notifications container when clicking outside of it
  document.addEventListener('click', function(event) {
    if (!notificationsContainer.contains(event.target) && !notificationsIcon.contains(event.target)) {
      notificationsContainer.classList.remove('show');
    }
  });
});

// Fetch data from an external source
// Example Data

fetch('https://api.wmata.com/Rail.svc/json/jStationParking')
  .then(response => response.json())
  .then(data => {
    // Use the fetched data to populate your Chart.js dataset
    timeSeriesChart.data.datasets[0].data = data;
    // Update the chart
    timeSeriesChart.update();
  })
  .catch(error => console.error('Error fetching data:', error));
