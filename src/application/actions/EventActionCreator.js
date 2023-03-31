const EventActionCreator = {};

EventActionCreator.fetchEvents = async (date, dispatch) => {
  // console.log("Fetching events...");
  const response = await fetch(`/api/fetch_Events/${date}`);
  const fetchedEvents = await response.json();
  // console.log("These are the fetchedEvents:", fetchedEvents);
  dispatch({ type: "setEvents", payload: fetchedEvents });
}

EventActionCreator.addEvent = async (eventObj, dispatch) => {
  // console.log('in add event')
  // console.log('eventObj:', eventObj)
  const response = await fetch('/api/addEvent', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventObj)
  });
  const newEventArr = await response.json();
  dispatch({type:'eventAdded', payload: newEventArr});
}

EventActionCreator.deleteEvent = async (deleteObj, dispatch) => {
  // console.log('This is the deleteObj:', deleteObj);
  const response = await fetch('/api/deleteEvent', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deleteObj)
  });
  const newEventArr = await response.json();
  dispatch({type:'eventDeleted', payload: newEventArr});
}

EventActionCreator.updateEvent = async (eventObj, dispatch) => {
  // console.log('This is the update object:', eventObj);
  const response = await fetch('/api/updateEvent', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventObj)
  });
  const newEventArr = await response.json();
  // console.log('This is the new event array:', newEventArr)
  dispatch({type: 'eventUpdated', payload: newEventArr});
}


module.exports = EventActionCreator;