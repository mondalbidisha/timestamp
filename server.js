const express = require('express');
const moment = require('moment');
const app = express();
let finalDateObject = null;
let portNumber = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
})

app.get('/hello', function(request, response) {
  response.json({ greeting: "HELLO!"});
})

app.get('/api/timestamp', function(request, response) {
  if(!request.query) {
    return response.json({
      error: "datestring/unixtime value is required."
    }); 
  } else if(request.query.datestring == '') {
    return response.json({
      error: "datestring[YYYY-MM-DD] value is required."
    });
  } else if(request.query.unixtime == '') {
    return response.json({
      error: "unixtime[number] value is required."
    });
  }

  if(request.query) {
    if(request.query.datestring && request.query.datestring !== '') {
      convertDateString(request.query.datestring, (result, error) => {
        if(result) {
          response.json({
            result: result
          });
        } else {
          response.json({
            error: error
          });
        }
      })
    } else if(request.query.unixtime && request.query.unixtime !== '') {
      convertUnixTimestamp(request.query.unixtime, (result, error) => {
        if(result) {
          response.json({
            result: result
          });
        } else {
          response.json({
            error: error
          });
        }
      })
    }
  }
})

const convertDateString = (datestring, callback) => {
  let dateObj = moment(datestring).format();
  let error;
  if(typeof datestring === "string" && !datestring.includes('-')) {
    error = {
      error: "Invalid date string. Format expected [YYYY-MM-DD]"
    }
    return callback(finalDateObject, error);
  } else if(dateObj && dateObj !== "Invalid date") {
    finalDateObject = {
      utc_string    : new Date(dateObj).toUTCString(),
      unix_tring    : moment(datestring).unix(),
      local_time    : moment(datestring).local(),
      json_object   : moment(datestring).toJSON(), 
      iso_string    : moment(datestring).toISOString(),
      calendar_date : moment(datestring).calendar(),
      date_object   : moment(datestring).toObject(),
      date_array    : moment(datestring).toArray()
    }
    return callback(finalDateObject, error);
  } else {
    error = {
      error: "Invalid date"
    } 
    return callback(finalDateObject, error);
  }
}

const convertUnixTimestamp = (unixtime, callback) => {
  let dateObj = new Date(parseInt(unixtime));
  let error;
  if(typeof unixtime === "string" && unixtime.includes('-')) {
    error = {
      error: "Invalid unix timestamp. Format expected [number]"
    }
    return callback(finalDateObject, error);
  } else if(dateObj && dateObj !== "Invalid date") {
    finalDateObject = {
      utc_string    : new Date(parseInt(unixtime)).toUTCString(),
      local_time    : moment(dateObj).local(),
      json_object   : moment(dateObj).toJSON(), 
      calendar_date : moment(dateObj).calendar(),
      iso_string    : moment(dateObj).toISOString(),
      date_object   : moment(dateObj).toObject(),
      date_array    : moment(dateObj).toArray()
    }
    return callback(finalDateObject, error);
  } else {
    error = {
      error: "Invalid date"
    }
    return callback(finalDateObject, error);
  }
}

app.listen(portNumber, function() {
  console.log(`SERVER LISTENING ON PORT ${portNumber}!`);
})