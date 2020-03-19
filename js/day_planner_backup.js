if (localStorage.getItem('day_planner')){
    var  day_planner =  JSON.parse(localStorage.getItem('day_planner'));
 }
 else{
    var day_planner = {
        "0900" : '','1000' : '','1100' : '','1200' : '','1300' : '','1400' : '','1500' : '','1600' : '','1700' : ''
    }
 }

function renderTimeSlot(time,events)
{
    var time_slot = "";
    (time.length > 4) ? time ='0'+ time : time;
    var time = moment(time, "H").format("h:mm A");
    time_slot = `<div class="row timeslot" id="${time}_time_slot">
    <div class="col-2 hour" id="${time}">${time}</div>
    <div class="col-8 hourly_events" contentEditable="true" id="${time}_events">${events}</div>
    <div class="col-2 btn_save">Save</div>
    </div>`;
    return time_slot;
}


function populateTimePlanner()
{
    container_html = "";
    $.each(day_planner, function(key, value){
        container_html += renderTimeSlot(key,value);
    });
    $('#hourly_plan').html(container_html);
}

populateTimePlanner();

$('.btn_save').on( "click", function() {
    var hourly_events =$( ".hourly_events" ).toArray();
    var hour =$( ".hour" ).toArray();
    day_planner = {}
    for (let i = 0; i < hourly_events.length; i++) {
        day_planner[hour[i].id] = hourly_events[i].innerHTML;
    }
    localStorage.setItem('day_planner', JSON.stringify(day_planner));
});


