const request = require('request');

const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org/?format=json';
  request(url, (error, response, body) => {
  if (error) {
    return callback(error, null);
  }
  if(response.statusCode != 200) {
    const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  const ip = JSON.parse(body).ip;
    callback(null, ip);
});
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
  if (error) {
    return callback(error, null);
  }
  if (response.statusCode !== 200) {
    callback(Error(`Status Code ${response.statusCode} when fetching Coodinates for IP: ${body}`), null);
    return;
  }
  const {latitude, longitude} = JSON.parse(body).data;
  callback(null, {latitude, longitude});
 
  });
};

  const fetchISSFlyOverTimes = function(coords, callback) {
    request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching Coodinates for IP: ${body}`), null);
        return;
      }
      const passes = JSON.parse(body).response;
      callback(null, passes);


    });

  };

  const nextISSTimesForMyLocation = function(callback) {
    fetchMyIP((error, ip) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchCoordsByIP(ip, (error, loc) => {
        if (error) {
          return callback(error, null);
        }
  
        fetchISSFlyOverTimes(loc, (error, nextPasses) => {
          if (error) {
            return callback(error, null);
          }
  
          callback(null, nextPasses);
        });
      });
    });
  };



// module.exports = {fetchISSFlyOverTimes};
module.exports = {nextISSTimesForMyLocation};
// module.exports = {fetchMyIP};
// module.exports = {fetchCoordsByIP};

