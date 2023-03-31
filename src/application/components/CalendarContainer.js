import React from 'react';
import ReactDOM from 'react-dom';
import Grid2 from '@mui/material/Unstable_Grid2';
import EventCreator from './event/EventCreator.js';
import { EventContext, EventContextDispatch, EventDate } from '../context/EventContext.js';
import { useState, useEffect, useReducer, useContext, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
const EventActionCreator = require('../actions/EventActionCreator.js')
import { Button, Pagination, Stack, Box } from '@mui/material';
import { DatePicker, DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

function CalendarContainer({ currDate }) {

  const eventsArray = useContext(EventContext);
  const dispatch = useContext(EventContextDispatch);
  const { setDate } = useContext(EventDate);
  const { date } = useContext(EventDate);
  const boardBounds = useRef(null);

  // console.log('This is the date:', date);

  async function handleApiFetch(currDate) {
    await EventActionCreator.fetchEvents(currDate, dispatch);
  }

  useEffect(() => {
    const fetchInitialEvents = async () => {
      await handleApiFetch(date);
    }
    fetchInitialEvents()
  }, [date])


  return (
    <div>
      <DateCalendar value={dayjs(decodeURIComponent(date, "MM/DD/YYYY"))} onChange={(newValue) => setDate(encodeURIComponent(newValue.format('MM/DD/YYYY'))
      )} />
      <EventCreator></EventCreator>
    </div>)
}

export default CalendarContainer;