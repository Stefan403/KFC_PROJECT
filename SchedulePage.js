import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainPageNav from "../components/MainPageNav";
import useErrorSuccesReset from "../components/useErrorSuccesReset";
import { Navigate } from "react-router-dom";
import SuccesMessage from "../components/SuccesMessage";
import ErrorMessage from "../components/ErrorMessage";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const SchedulePage = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    const [newEvent, setNewEvent] = useState({});
    const [allEvents, setAllEvents] = useState();
    const [preferences, setPreferences] = useState([]);
    const authMessage = useErrorSuccesReset();

    const ConvertStringToDate = (events) => {
      events.forEach((event) => {
        let start = new Date(event.start);
        let end = new Date(event.end);
        event.start = start;
        event.end = end;
      });
      return events;
    };
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch("http://localhost:4000/api/schedule").then(
          (res) => res.json()
        );
        let covnertedResult = ConvertStringToDate(result);
        setAllEvents(covnertedResult);
      };

      fetchData();
    }, []);
    async function handleSubmit(events) {
      const result = await fetch("http://localhost:4000/api/schedule", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          events,
        }),
      }).then((res) => res.json());
      authMessage.resetStatus();
      result.status === "ok" ? authMessage.setSucces() : authMessage.setError();
      
    }

    function handleAddEvent() {
      console.log(newEvent);
      if(Object.keys(newEvent).length){
      setAllEvents([...allEvents, newEvent]);
      setPreferences([...preferences, newEvent]);
      } else alert("Input must not be empty")
    }

   const onSelectEvent = (pEvent) => {
      const response = window.confirm("Would you like to remove this event?");
      if(response === true){
        const events = [...allEvents]
        const idx = events.indexOf(pEvent)
        events.splice(idx, 1);
        setAllEvents(events);
        setPreferences(events);
        handleSubmit(events )
        };
      }
    

    return (
      <div>
        <MainPageNav />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginTop: "40px" }}>Schedule</h1>

          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "50px",
              }}
            >
              <h3>Add Preference</h3>
              <div style={{ marginRight: "20px" }}>
                <input
                  type="text"
                  placeholder="Add Title"
                  style={{ width: "40%", marginRight: "10px" }}
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <DatePicker
                placeholderText="Start Date"
                showTimeSelect
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
              <DatePicker
                placeholderText="End Date"
                selected={newEvent.end}
                showTimeSelect
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
              <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                Add Preference
              </button>
              <button onClick={()=>handleSubmit(allEvents)} stlye={{ marginTop: "10px" }}>
                Submit Preference
              </button>
              {authMessage.succesText && 
                <SuccesMessage message="Preference has been submited" />
              }
              {authMessage.errorText && <ErrorMessage message="Please enter valid input"/>}
            </div>
            <Calendar
              localizer={localizer}
              events={allEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent = {event => onSelectEvent(event)} 
              style={{ height: 500, margin: "50px" }}
            />
          </div>
        </div>
      </div>
    );
  }
};
