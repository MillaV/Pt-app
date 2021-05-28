import React, {Component} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);


 class MyCalendar extends Component {
    state = {
     events: [
        {
          start: moment().toDate(),//Tapahtuman aloitus pvm
          end: moment()            //Tapahtuman lopetus pvm
            .add(1, "days")
            .toDate(),
          title: "Tapahtuma 1" 
        },
        {
          start: moment().toDate(),//Tapahtuman aloitus pvm
          end: moment()            //Tapahtuman lopetus pvm
            .add(3, "days")
            .toDate(),
          title: "Tapahtuma 2" 
        }
     ]
    };

  render() {
    return (
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}//Kalenterin oletuspvm
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default MyCalendar;

//1. haetaan treenit apista
//2. muotoillaan kalenterin haluamiksi tapahtuma-olioksi

