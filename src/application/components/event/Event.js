import ReactDom from 'react-dom';
import React, { useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useState, useReducer, setState, useRef } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { EventContext, EventContextDispatch, EventForceUpdate } from '../../context/EventContext.js';
import { useContext } from 'react';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import { EventHandler } from '../../handlers/EventHandler.js'
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
const EventActionCreator = require('../../actions/EventActionCreator.js');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

function Event({ name, startTime, endTime, priority, id, day, duration, boardRef }) {
  const startPos = EventHandler.startPosCalc(day, startTime, endTime);
  // console.log('This is the startPos:', startPos);
  // console.log('These are the start/end offsets in hours:', startOffset, endOffset);
  const eventArray = useContext(EventContext);
  const dispatch = useContext(EventContextDispatch);
  const [open, setOpen] = useState(false);
  const [eventState, setState] = useState({
    width: '100vw',
    height: duration * 8.5,
    x: 0,
    y: startPos * boardRef.current.offsetHeight
  });
  const [lastResize, setLastMove] = useState({
    direction: '',
    delta: { width: 0, height: 0 },
    position: { x: 0, y: 0 }
  })
  const previousHeightRef = useRef(eventState.y);

  useEffect(() => {
    if (previousHeightRef.current !== eventState.y) {
      const previousHeight = previousHeightRef.current;
      console.log('This is the previous height:', previousHeight);
      const refDay = dayjs(day, "MM/DD/YYYY");
      let moveTimeStart = eventState.y / 48.5
      let moveTimeMinutes = moveTimeStart * 60
      moveTimeStart = dayjs().startOf('day').add(moveTimeMinutes, 'minute');
      moveTimeStart.year(refDay.get('year')).month(refDay.get('month')).date(refDay.get('date'));
      //do nonsense to calc endTime
      let moveTimeEndDelta = (eventState.y - previousHeight) / 48.5
      let moveTimeEndMinutes = moveTimeEndDelta * 60
      moveTimeEndDelta = dayjs(endTime, "hh:mm A").add(moveTimeEndMinutes, 'minute');
      // console.log('this is moveTimeEnd:', moveTimeEndDelta)
      moveTimeEndDelta.year(refDay.get('year')).month(refDay.get('month')).date(refDay.get('date'));
      EventHandler.handleUpdateEvent(id, name, priority, day, moveTimeStart, moveTimeEndDelta, dispatch, setOpen)
      previousHeightRef.current = eventState.y;
    }
  }, [eventState.y])

  let updateName = name
  let updateStart;
  let updateEnd;
  let updatePrio = priority
  let updateDuration;
  let durationProcessed = duration * (8.5)

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };

  return (
    <div>
      <Rnd
        style={style}
        size={{ width: '100vw', height: `${eventState.height}vh` }}
        position={{ x: 0, y: eventState.y }}
        enableResizing={{
          bottom: true,
          top: true,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: false,
          topLeft: false,
          topRight: false,
        }}

        dragAxis='y'

        bounds={boardRef.current}

        onDragStop={(e, d) => {
          setState((prevState) => {
            const newState = {
              width: '100vw',
              height: duration * 8.5,
              x: d.x,
              y: d.y
            }
            return newState;
          })
        }}

        onResizeStop={(e, direction, ref, delta, position) => {
          setState({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          })
          setLastMove((prevMove) => {
            const newMove = {
              direction: direction,
              delta: { width: delta.width, height: delta.height },
              position: { x: position.x, y: position.y }
            }
            const refDay = dayjs(day, "MM/DD/YYYY");

            //do nonsense to calc startTime
            let moveTimeStart = newMove.position.y / 48.5
            if (newMove.direction === 'top') {
              let moveTimeMinutes = moveTimeStart * 60
              moveTimeStart = dayjs().startOf('day').add(moveTimeMinutes, 'minute');
              moveTimeStart.year(refDay.get('year')).month(refDay.get('month')).date(refDay.get('date'));
            }
            // console.log('New move time:', newMoveTime);

            //do nonsense to calc endTime
            let moveTimeEnd = dayjs(endTime, "hh:mm A");
            if (newMove.direction === 'bottom') {
              moveTimeStart = dayjs(startTime, "hh:mm A")
              moveTimeStart.year(refDay.get('year')).month(refDay.get('month')).date(refDay.get('date'));
              let moveEndMinutes = delta.height / 48.5 * 60
              moveTimeEnd = moveTimeEnd.add(moveEndMinutes, 'minute');
              moveTimeEnd.year(refDay.get('year')).month(refDay.get('month')).date(refDay.get('date'));
            }
            // console.log('Move time end:', moveTimeEnd);
            // console.log('New state:', newMove);
            EventHandler.handleUpdateEvent(id, name, priority, day, moveTimeStart, moveTimeEnd, dispatch, setOpen)
            return newMove;
          }
          )
        }}
      >

        <Button
          variant='contained'
          onClick={async () => {
            await EventHandler.handleDeleteEvent({ deleteId: id, day: day }, dispatch)
          }}>
          Delete Event
        </Button>

        <Button
          variant='contained'
          onClick={() => EventHandler.handleClickOpen(setOpen)}>
          Update Event
        </Button>

        <Dialog open={open} onClose={() => EventHandler.handleClose(setOpen)}>
          <DialogTitle>Update Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To update event please enter the desired name, time, and priority
            </DialogContentText>
            <TextField
              autoFocus
              variant='outlined'
              margin='dense'
              required
              id='name-required'
              label='Name'
              defaultValue={updateName}
              onChange={(event) => updateName = event.target.value}
            />
            <TimeField
              label='Start'
              value={dayjs()}
              disablePast={true}
              onChange={(newValue) => updateStart = newValue}
            />
            <TimeField
              label='End'
              value={dayjs()}
              disablePast={true}
              onChange={(newValue) => updateEnd = newValue}
            />
            <TextField
              autoFocus
              variant='outlined'
              margin='dense'
              required
              id='Prio-required'
              label='Priority'
              defaultValue={updatePrio}
              onChange={(event) => updatePrio = event.target.value}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => EventHandler.handleClose(setOpen)}>Cancel</Button>
            <Button onClick={() => EventHandler.handleUpdateEvent(id, updateName, updatePrio, day, updateStart, updateEnd, dispatch, setOpen)}>Update</Button>
          </DialogActions>
        </Dialog>
        {name}
        {startTime}
        {endTime}
        {priority}
      </Rnd>
    </div>
  );
}

export default Event;