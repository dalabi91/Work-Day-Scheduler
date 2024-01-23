//Display the current day at the top of the calender when a user opens the planner.

// Get the current date and display it in header
var currentDate = dayjs();
$("#currentDay").text(currentDate.format("dddd, MMMM Do"));

$(document).ready(function () {
  // Function to update timeblock styling based on the current time
  function updateTimeblockStyles() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").replace("hour", ""));
      $(this).removeClass("past present future");

      // Add past, present, or future class based on the current time
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  // Function to save events to local storage on button click

  // Attach a click event handler to all elements with the class "saveBtn"
  $(".saveBtn").on("click", function () {
    // Retrieve the value of the input field with the class "description"
    var eventText = $(this).siblings(".description").val();
    // Extract the hour value from the parent element's ID attribute
    var eventHour = parseInt($(this).parent().attr("id").replace("hour", ""));
    // Store the event text in the browser's local storage based on the hour
    localStorage.setItem("event_" + eventHour, eventText);
  });

  // get saved events from local storage
  function loadSavedEvents() {
    // Iterate over each element with the class "time-block"
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").replace("hour", ""));
      // Retrieve the saved event text from local storage based on the hour
      var savedEvent = localStorage.getItem("event_" + blockHour);
      // Set the value of the ".description" input field in the current time block to the saved event
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  //call function
  updateTimeblockStyles();
  loadSavedEvents();
});
