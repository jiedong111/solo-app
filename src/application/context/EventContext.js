import { createContext, useReducer, useState } from 'react';
import React from 'react';
const { DateTime } = require('luxon');
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

const db = require('../../../server/models/calendarModel.js')

export const EventContext = createContext([]);

export const EventContextDispatch = createContext(null);

export const EventDate = createContext(null);

export const EventForceUpdate = createContext(null);

export function EventsProvider({children, explicitChildren}){
  // console.log(encodeURIComponent(dayjs().format('MM/DD/YYYY')));
  const [eventsArray, dispatch] = useReducer(eventsArrayReducer, []);
  const [date, setDate] = useState(encodeURIComponent(dayjs().format('MM/DD/YYYY')));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <EventContext.Provider value = {eventsArray}>
      <EventContextDispatch.Provider value = {dispatch}>
        <EventDate.Provider value = {{date, setDate}}>
            {children}
        </EventDate.Provider>
      </EventContextDispatch.Provider>
    </EventContext.Provider>
    </LocalizationProvider>
  );
}

function eventsArrayReducer(eventsArray, action) {
  switch (action.type) {
    case 'setEvents' : {
      return [...action.payload];
    }

    case 'eventAdded': {
      return [...action.payload];
    }

    case 'eventDeleted' : {
      return [...action.payload];
    }

    case 'eventUpdated' : {
      return [...action.payload];
    }

    default:
      return eventsArray;
  }
}