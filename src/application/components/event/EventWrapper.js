import React from 'react';
import { Box } from '@mui/material';
import Event from './Event.js';

const EventWrapper = React.forwardRef((props, ref) => {
  return (
    <Box ref = {ref} {...props}>
      {props.children}
    </Box>
  )
});

export default EventWrapper;