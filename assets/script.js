// display current date on page
var currentDate = moment().format("MMMM Do YYYY");
$("#currentDay").text(currentDate);
// const nextDay = $("<button id='nextDay' class='btn btn-light'><i class='fas fa-angle-double-right'></i></button>");
// const prevDay = $("<button id='prevDay' class='btn btn-light'><i class='fas fa-angle-double-left'></i></button>");
// $("#currentDay").append(nextDay);
// $("#currentDay").prepend(prevDay);

// setup our working hours
const workingHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

// set up array of default list of daily events
const initialEvents = {
    "7": "",
    "8": "",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "",
    "16": "",
    "17": "",
    "18": "",
    "19": ""
};

let dailyEvents = loadFromLocalStorage("activity");

function saveDailyEvents() {
    const hourIndex = $(this).siblings('.hour').prop('id');
    const adgenda = $(this).siblings('.description').val();
    console.log(hourIndex);
    console.log(adgenda);

    dailyEvents[hourIndex] = adgenda;
    console.log(dailyEvents);
    // initialEvents.push(eventToSave);
    saveToLocalStorage();
}

// dealing with localStorage
function saveToLocalStorage() {
    localStorage.setItem("activity", JSON.stringify(dailyEvents));
}

function loadFromLocalStorage(key) {
    // if localStorage is empty load with initialEvents
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, JSON.stringify(initialEvents));
        return JSON.parse(localStorage.getItem(key));
    } else {
        return JSON.parse(localStorage.getItem(key));
    }
}

// display rows for the schedule
function displaySchedule() {

    workingHours.forEach(function(hour) {
        const rowEl = $("<div class='row time-block'>");
        const hourCol = $("<div class='col-1 hour py-4'>");
        const inputCol = $("<textarea class='col-10 description'>");
        const saveBtn = $("<button class='col-1 saveBtn'><i class='fas fa-save'></i></button>");

        hourCol.attr("id", hour);
        rowEl.append(hourCol);
        if (hour < 12) {
            time = hour + " AM";
        } else if (hour == 12) {
            time = hour + " PM";
        } else {
            time = (hour - 12) + " PM";
        }
        hourCol.text(time);

        // check if current hour is before, now or after calendar row
        if (hour < (moment().hour())) {
            inputCol.addClass('past');
        } else if (hour == (moment().hour())) {
            inputCol.addClass('present');
        } else if (hour > (moment().hour())) {
            inputCol.addClass('future');
        } else {
            console.log("ERROR");
        }
        inputCol.text(dailyEvents[hour]);
        rowEl.append(inputCol);
        rowEl.append(saveBtn);
        $(".container").append(rowEl);
    });
}

displaySchedule();


// listen for inputs
$('.saveBtn').on('click', saveDailyEvents);