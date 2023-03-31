const express = require('express');
const calendarController = require('../controllers/calendarController.js');

const calendarRouter = express.Router();

calendarRouter.get('/', (req, res) => {
  res.json({ message: 'I despise webpack'})
});

calendarRouter.get('/fetch_Events/:date', calendarController.fetchEvents, (req, res) => {
  res.send(res.locals.fetchedEvents);
})

calendarRouter.post('/addEvent', calendarController.addEvents, calendarController.fetchEvents, (req, res) => {
  res.send(res.locals.fetchedEvents);
})

calendarRouter.delete('/deleteEvent', calendarController.deleteEvent, calendarController.fetchEvents, (req, res) =>{
  res.send(res.locals.fetchedEvents);
})

calendarRouter.put('/updateEvent', calendarController.updateEvent, calendarController.fetchEvents, (req, res) => {
  res.send(res.locals.fetchedEvents);
})

module.exports = calendarRouter;