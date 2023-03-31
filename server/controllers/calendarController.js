const db = require('../models/calendarModel.js');

const calendarController = {};

calendarController.fetchEvents = async (req, res, next) => {
  console.log('called');
    try {
      console.log('start fetching events');
      console.log('this is the date param:', req.params.date);
      let date;
      if(req.params.date){
        date = decodeURIComponent(req.params.date);
      } else {
        date = req.eventDay;
      }
      console.log('this is the date:', date);
      const fetchedEvents = await db.query('SELECT * FROM "public"."events" WHERE day = $1 LIMIT 100', [date]);
      // console.log('These are fetchedEvents:', fetchedEvents.rows)
      res.locals.fetchedEvents = fetchedEvents.rows;
      return next();
    } catch (err) {
      return next({
        message: 'Error in fetch_Events'
      })
    }
}

calendarController.addEvents = async (req, res, next) => {
  console.log('called within addEvents');
    try {
      console.log('This is req.body:', req.body)
      const name = req.body.name;
      const startTime = req.body.startTime;
      const endTime = req.body.endTime;
      const priority = req.body.priority;
      const day = req.body.day;
      const duration = req.body.duration;
      req.eventDay = day;
      // console.log('start db req');
      await db.query('INSERT INTO "public"."events" (name, startTime, endTime, priority, day, duration) VALUES ($1, $2, $3, $4, $5, $6)', [name, startTime, endTime, priority, day, duration])
      // console.log('end db req');
      // const newData = await db.query('SELECT * FROM "public"."events" LIMIT 100')
      // res.locals.updatedEvents = newData.rows;
      return next()
    } catch (err) {
      return next({
        message: 'Error in addEvents'
      })
    }
}

calendarController.deleteEvent = async (req, res, next) => {
  // console.log('within delete events');
    try {
      // console.log('This is the delete request:', req.body);
      const id = req.body.deleteId;
      req.eventDay = req.body.day;
      // console.log('start db delete request');
      await db.query(`DELETE FROM "public"."events" WHERE _id = $1 RETURNING *`, [id])
      // console.log('end db req');
      // const newData = await db.query('SELECT * FROM "public"."events" LIMIT 100')
      // res.locals.updatedEvents = newData.rows;
      return next();
    } catch (err) {
      return next({
        message: 'Error in deleteEvents'
      })
    }
}

calendarController.updateEvent = async (req, res, next) => {
  // console.log('within update events');
    try {
      // console.log('This is the update request:', req.body);
      const id = req.body.updateId;
      // const { updateId, name, startTime } = req.body
      const name = req.body.name;
      const startTime = req.body.startTime;
      const endTime = req.body.endTime;
      const priority = req.body.priority;
      const day = req.body.day;
      const duration = req.body.duration;
      req.eventDay = req.body.day;
      // console.log('start db update request');
      await db.query(`UPDATE "public"."events" SET name = $1, startTime = $2, endTime = $3, priority = $4, duration = $5 WHERE _id = $6`, [name, startTime, endTime, priority, duration, id])
      // console.log('end db update req');
      // const newData = await db.query('SELECT * FROM "public"."events" LIMIT 100')
      // res.locals.updatedEvents = newData.rows;
      return next();
    } catch (err) {
      return next({
        message: 'Error in updateEvent'
      })
    }
}

module.exports = calendarController;