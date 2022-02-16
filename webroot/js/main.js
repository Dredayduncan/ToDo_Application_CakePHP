(function($) {

	"use strict";

	// Setup the calendar with the current date
$(document).ready(function(){
    var date = new Date();
    var today = date.getDate();
    // Set click handlers for DOM elements
    $(".right-button").click({date: date}, next_year);
    $(".left-button").click({date: date}, prev_year);
    $(".month").click({date: date}, month_click);
    // $("#add-button").click({date: date}, new_event);
    // Set current month as active
    $(".months-row").children().eq(date.getMonth()).addClass("active-month");
    init_calendar(date);
    var events = check_events(today, date.getMonth()+1, date.getFullYear());
    show_events(events, months[date.getMonth()], today);
});

// Initialize the calendar by appending the HTML dates
async function init_calendar(date) {
    $(".tbody").empty();
    $(".events-container").empty();
    var calendar_days = $(".tbody");
    var month = date.getMonth();
    var year = date.getFullYear();
    var day_count = days_in_month(month, year);
    var row = $("<tr class='table-row'></tr>");
    var today = date.getDate();
    // Set date to 1 to find the first day of the month
    date.setDate(1);
    var first_day = date.getDay();
    // 35+firstDay is the number of date elements to be added to the dates table
    // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
    for(var i=0; i<35+first_day; i++) {
        // Since some of the elements will be blank, 
        // need to calculate actual date from index
        var day = i-first_day+1;
        // If it is a sunday, make a new row
        if(i%7===0) {
            calendar_days.append(row);
            row = $("<tr class='table-row'></tr>");
        }
        // if current index isn't a day in this month, make it blank
        if(i < first_day || day > day_count) {
            var curr_date = $("<td class='table-date nil'>"+"</td>");
            row.append(curr_date);
        }   
        else {
            var curr_date = $("<td class='table-date'>"+day+"</td>");
            var events = await check_events(day, month+1, year);
            
            if(today===day && $(".active-date").length===0) {
                curr_date.addClass("active-date");
                show_events(events, months[month], day);
            }

            // If this date has any events, style it with .event-date
            if (events[0] != ""){
                curr_date.addClass("event-date");
            }

            // Set onClick handler for clicking a date
            curr_date.click({events: events, month: months[month], day:day}, date_click);
            row.append(curr_date);
        }
    }
    // Append the last row and set the current year
    calendar_days.append(row);
    $(".year").text(year);
}

// Get the number of days in a given month/year
function days_in_month(month, year) {
    var monthStart = new Date(year, month, 1);
    var monthEnd = new Date(year, month + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);    
}

// Event handler for when a date is clicked
function date_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    $(".active-date").removeClass("active-date");
    $(this).addClass("active-date");
    show_events(event.data.events, event.data.month, event.data.day);
};

// Event handler for when a month is clicked
function month_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    var date = event.data.date;
    $(".active-month").removeClass("active-month");
    $(this).addClass("active-month");
    var new_month = $(".month").index(this);
    date.setMonth(new_month);
    init_calendar(date);
}

// Event handler for when the year right-button is clicked
function next_year(event) {
    $("#dialog").hide(250);
    var date = event.data.date;
    var new_year = date.getFullYear()+1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
}

// Event handler for when the year left-button is clicked
function prev_year(event) {
    $("#dialog").hide(250);
    var date = event.data.date;
    var new_year = date.getFullYear()-1;
    $("year").html(new_year);
    date.setFullYear(new_year);
    init_calendar(date);
}

// Display all events of the selected date in card views
function show_events(events, month, day) {
    // Clear the dates container
    $(".events-container").empty();
    $(".events-container").show(250);
    
    // If there are no events for this date, notify the user
    if(events.length===0 || events[0] === "") {
        var event_card = $("<div class='event-card'></div>");
        var event_name = $("<div id='note' class='event-name'>There are no events planned for "+month+" "+day+".</div>");
        $(event_card).css({ "border-left": "10px solid #FF1744" });
        $(event_card).append(event_name);
        $(".events-container").append(event_card);
    }
    else {
        
        // Go through and add each event as a card to the events container
        for(var i=0; i<events.length; i++) {
            
            var data = JSON.parse(events[i]);
            for (var j = 0; j < data.length; j++ ){
                var event_card = $("<div class='event-card'></div>");
                var event_name = $("<div class='event-name'><span class='h4'>"+data[j].title+":</span></div>");
                var event_date = $("<div class='event-count'>"+data[j].status+"</div>");
                var event_view = $("<a href='/todo/tasks/view/"+data[0].taskID+"' style='margin-right: 2%;'>View</a>");
                var event_edit = $("<a href='/todo/tasks/edit/"+data[0].taskID+"' style='margin-right: 2%;'>Edit</a>");
                var event_delete = $(`<form id="task`+data[j].taskID+`" style="display:none;" method="post" 
                action="/todo/tasks/delete/`+data[j].taskID+`">
                <input type="hidden" name="_method" value="POST"><input type="hidden" name="_csrfToken" autocomplete="off"
                 value="i2cm5b9L7fcD2goEzaJb381BiJtHnQm17FfbS0IQaCXxuAUr8xEnZgNAxGzFONE6U8Hr2/r8yhj4468PADSGz0sAt47o7frCryTroyOqPIeKYO4ocHNfHcmIM0qXchZQMHmmX/YL5A5m+N+/m576fQ==">
                 </form><a href="#" data-confirm-message="Are you sure you want to delete # `+data[j].taskID+`?" 
                 onclick="if(confirm(this.dataset.confirmMessage)){ document.getElementById('task`+data[j].taskID+`').submit();}
                 event.returnValue = false;return false;">Delete</a>`);

                $(event_card).append(event_name).append(event_date).append(event_view).append(event_edit).append(event_delete);
                $(".events-container").append(event_card);
            }

        }
    }
}

// Checks if a specific date has any events
async function check_events(day, month, year) {
    // Get the date 
    var date = new Date(year, month-1, day);

    // Convert date to mysql format 
    var theDate = date.toISOString().split("T")[0];

    // Set the URL of the file with the processing
    var targeturl = "tasks/functions";

    var events = [];

    // Get events on the specified day and append to events array
    await $.get(targeturl, {events: true, date: theDate}, function(data){
        events.push(data);
    })

    // Return the array
    return events;
       
}


const months = [ 
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December" 
];

})(jQuery);
