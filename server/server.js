const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = 3000;
const app = express();
const calendarRouter = require('./routes/ calendarRouter.js');

app.use(cors());
app.use(express.json());
app.use(express.static('./src/client/'))

app.use('/api', calendarRouter);

app.listen(PORT, ()=> {
  console.log(`Server is listening on port ${PORT}`);
})