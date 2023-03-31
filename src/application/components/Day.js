import React from 'react';
import ReactDOM from 'react-dom';
import Grid2 from '@mui/material/Unstable_Grid2';
import CalendarContainer from './CalendarContainer.js';
import { useState, useEffect, useRef } from 'react';
import { EventsProvider } from '../context/EventContext.js';
import { Button } from '@mui/material';

function Day() {
  return (
    <EventsProvider>
      <CalendarContainer>
      </CalendarContainer>
    </EventsProvider>
  )
}

export default Day;