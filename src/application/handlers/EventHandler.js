import dayjs from 'dayjs';
import EventActionCreator from '../actions/EventActionCreator.js';
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);


export const EventHandler = {}

EventHandler.handleClickOpen = (setOpen) => {
  setOpen(true);
}

EventHandler.handleClose = (setOpen) => {
  setOpen(false);
}

EventHandler.handleDeleteEvent = async (uniqueId, dispatch) => {
  await EventActionCreator.deleteEvent(uniqueId, dispatch);
}

EventHandler.handleUpdateEvent = async (id, name, priority, day, start = dayjs(), end = dayjs(), dispatch, setOpen) => {
  console.log(start);
  const updateDuration = end.diff(start, 'hour', true);
  console.log('This is the duration:', updateDuration);
  start = start.format('LT');
  end = end.format('LT');
  console.log('This is updateStart:', start);
  console.log('This is updateEnd:', end);
  await EventActionCreator.updateEvent({ updateId: id, name: name, startTime: start, endTime: end, priority: priority, day: day, duration: updateDuration }, dispatch);
  EventHandler.handleClose(setOpen);
}


EventHandler.handleAddEvent = async (name, start = dayjs(), end = dayjs(), priority, day, dispatch, setOpen) => {
  const duration = end.diff(start, 'hour', true);
  console.log('This is the duration:', duration);
  start = start.format('LT');
  end = end.format('LT');
  console.log('This is newStart:', start);
  console.log('This is newEnd:', end);
  await EventActionCreator.addEvent({ name: name, startTime: start, endTime: end, priority: priority, day: decodeURIComponent(day.date), duration: duration}, dispatch);
  EventHandler.handleClose(setOpen);
}

EventHandler.startPosCalc = (day, startTime, endTime) => {
  const refDay = dayjs(day, "MM/DD/YYYY");
  // console.log('This is the ref day:', refDay);
  const refTime = dayjs('12:00 AM', "h:mm A");
  refTime.year(refDay.get('year')).month(refDay.get('month')).date(refDay.get('date'));
  // console.log("This is ref time:", refTime);
  const refStart = dayjs(startTime, "h:mm A");
  const refEnd = dayjs(endTime, "h:mm A");
  const startOffset = refStart.diff(refTime, 'hour', true);
  const endOffset = refEnd.diff(refTime, 'hour', true);
  const startPos = startOffset / 24
  return startPos;
}