// Function to initialize the scheduler
// function initScheduler() {

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
  $(".saveBtn").on("click", function () {
    var eventText = $(this).siblings(".description").val();

    var eventHour = parseInt($(this).parent().attr("id").replace("hour", ""));
    localStorage.setItem("event_" + eventHour, eventText);
  });

  // get saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").replace("hour", ""));
      var savedEvent = localStorage.getItem("event_" + blockHour);

      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }

  // Append the columns to the timeblock and the timeblock to the container

  //call function
  updateTimeblockStyles();
  loadSavedEvents();
});
