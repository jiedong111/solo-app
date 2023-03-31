import { useEffect, useState, useRef } from 'react';
import Event from './Event.js';
import React from 'react';
import EventWrapper from './EventWrapper.js';
import { ReactDOM } from 'react';
import { EventContext, EventContextDispatch, EventDate } from '../../context/EventContext.js';
import { useContext } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Time, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { EventHandler } from '../../handlers/EventHandler.js';
import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');
const EventActionCreator = require('../../actions/EventActionCreator.js');

const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

function EventCreator() {

  const eventArray = useContext(EventContext);
  const dispatch = useContext(EventContextDispatch);
  const currDate = useContext(EventDate);
  const boundsRef = useRef(null);

  const [open, setOpen] = useState(false);

  let newName = '';
  let newStart;
  let newEnd;
  let newPrio = '';
  let duration;

  const sortedEvents = eventArray.sort((a,b) => a.id - b.id);
  const events = sortedEvents.map((ele) => {
    console.log(ele);
    return <Event boardRef = {boundsRef} id={ele._id} name={ele.name} startTime={ele.starttime} endTime={ele.endtime} priority={ele.priority} day={ele.day} duration= {ele.duration}></Event>
  })

  return (
    <div>
      <Button
        variant='contained'
        onClick={() => EventHandler.handleClickOpen(setOpen)}>
        Add Event
      </Button>

      <Dialog open={open} onClose={() => EventHandler.handleClose(setOpen)}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add an event please enter the desired name, time, and priority
          </DialogContentText>
          <TextField
            autoFocus
            variant='outlined'
            margin='dense'
            required
            id='name-required'
            label='Name'
            onChange={(event) => newName = event.target.value}
          />
          <TimeField
            label='Start'
            value = {dayjs()}
            disablePast={true}
            onChange={(newValue) => newStart = newValue}
          />
          <TimeField
            label='End'
            value = {dayjs()}
            disableFuture={true}
            onChange={(newValue) => newEnd = newValue}
          />
          <TextField
            autoFocus
            variant='outlined'
            margin='dense'
            required
            id='Prio-required'
            label='Priority'
            onChange={(event) => newPrio = event.target.value}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => EventHandler.handleClose(setOpen)}>Cancel</Button>
          <Button onClick={() => EventHandler.handleAddEvent(newName, newStart, newEnd, newPrio, currDate, dispatch, setOpen)}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <EventWrapper
        sx={{
          width: '100vw',
          height: '200vh',
          backgroundColor: 'primary.dark'
        }}
        ref = {boundsRef}
        className = 'boardBounds'
      >
        {events}
      </EventWrapper>
    </div>
  )
}

export default EventCreator;