# API - Timestamp
The API endpoint is GET [project_url]/api/timestamp/:date_string?
1. A date string is valid if can be successfully parsed by new Date(date_string) (JS) . Note that the unix timestamp needs to be an integer (not a string) specifying milliseconds. In our test we will use date strings compliant with ISO-8601 (e.g. "2016-11-20") because this will ensure an UTC timestamp.
2. If the date string is empty it should be equivalent to trigger new Date(), i.e. the service uses the current timestamp.
3. If the date string is valid the api returns a JSON having the structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}.
4. If the date string is invalid the api returns a JSON having the structure {"error" : "Invalid Date" }.

{
  "result": {
  "utc_string": "2015-12-24T18:30:00Z",
  "unix_tring": 1450981800,
  "local_time": "2015-12-24T18:30:00.000Z",
  "json_object": "2015-12-24T18:30:00.000Z",
  "iso_string": "2015-12-24T18:30:00.000Z",
  "calendar_date": "12/25/2015",
  "date_object": {
  "years": 2015,
  "months": 11,
  "date": 25,
  "hours": 0,
  "minutes": 0,
  "seconds": 0,
  "milliseconds": 0
  },
  "date_array": [
  2015,
  11,
  25,
  0,
  0,
  0,
  0
  ]
}
}
