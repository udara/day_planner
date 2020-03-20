if (localStorage.getItem('day_planner')){
    var  day_planner =  JSON.parse(localStorage.getItem('day_planner'));
 }
 else {
    var day_planner = [
        { time: "0900", events: "" },{ time: "1000", events: "" },{ time: "1100", events: "" },
        { time: "1200", events: "" },{ time: "1300", events: "" },{ time: "1400", events: "" },
        { time: "1500", events: "" },{ time: "1600", events: "" },{ time: "1700", events: "" }
      ];
 }

function renderTimeSlot(time,events) {
    var time_slot = "";
    var time_ampm = moment(time, "H").format("h:mm A");
    var bg_color = "";
    if(moment().format("H00") > time){ bg_color = 'past';}
    else if(moment().format("H00") == time){ bg_color = 'present'; }
    else{ bg_color = 'future';}

    time_slot = `<div class="row timeslot" id="${time}_time_slot">
    <div class="col-3 col-md-2 col-xl-1 hour" id="${time}">${time_ampm}</div>
    <div class="col-7 col-md-9 col-xl-10 hourly_events ${bg_color}" contentEditable="true" id="${time}_events">${events}</div>
    <div class="col-2 col-md-1 col-xl-1 btn_save"><i class="fa fa-floppy-o"></i></div>
    </div>`;
    return time_slot;
}

function populateTimePlanner()
{
  var container_html = "";
  for (let i = 0; i < day_planner.length; i++) {
    container_html += renderTimeSlot(day_planner[i].time,day_planner[i].events);
  }
    $('#hourly_plan').html(container_html);
}

populateTimePlanner();

$('.btn_save').on( "click", function() {
    var hourly_events =$( ".hourly_events" ).toArray();
    var hour =$( ".hour" ).toArray();
    day_planner = [];
    for (let i = 0; i < hourly_events.length; i++) {
        day_planner[i] = {};
        day_planner[i]['time'] = hour[i].id;
        day_planner[i]['events'] = hourly_events[i].innerHTML;
    }
    localStorage.setItem('day_planner', JSON.stringify(day_planner));
});

$( document ).ready(function() {
$('#currentDay').html(moment().format("MMM Do YY"));
});

