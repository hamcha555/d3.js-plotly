// Get the Roadster endpoint
const sampdata = "data/samples.json";

// Fetch the JSON data and console log it
d3.json(sampdata).then(function(data) {
  console.log(data);
  console.log(url);
});
