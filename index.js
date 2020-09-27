// const {fetchISSFlyOverTimes} = require('./iss');
// const exampleCoords = {latitude: 49.27670, longitude: '-123.13000'};
const {nextISSTimesForMyLocation} = require('./iss');
// const {fetchMyIP} = require('./iss');
// const {fetchCoordsByIP} = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});







// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`It didn\'t work!`, error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('174.7.155.58', (error, coords) => {
//   if (error) {
//     console.log('theres been an error');
//   } else {
//     console.log('everything worked, returned coors: ', coords);
//   }

// });

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if(error) {
//     return console.log('it didnt work', error);
//   }
//   console.log('it worked. returned flyover times', passTimes);
// });