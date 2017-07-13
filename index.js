/*jshint esversion: 6 */
const rp = require('request-promise');
const bb = require('bluebird');

// corners of Greater Melbourne
const MAX_LAT = -37.639582;
const MIN_LAT = -37.867261;
const MAX_LON = 145.300708;
const MIN_LON = 144.732955;

const TEST_REQ_COUNT = 500;

const start = Date.now();

const generateCoord = () => {

  const latDiff = MAX_LAT - MIN_LAT;
  const lonDiff = MAX_LON - MIN_LON;

  const lat = MIN_LAT + (Math.random() * latDiff);
  const lon = MIN_LON + (Math.random() * lonDiff);

  return [lat, lon];
};

const reverseGeocode = ([lat, lon]) => {

  const apiKey = '2008d409-b6e3-481e-a4d8-3f21fd5ef657';
  const url = `https://mappify.io/api/rest/coordinates/reversegeocode?apiKey=${apiKey}&lat=${lat}&lon=${lon}`;

  return rp(url);
};


const reqs = new Array(500);
for(let i = 0; i<TEST_REQ_COUNT; i++){
  reqs[i] = generateCoord();
}

bb.map(reqs, reverseGeocode, { concurrency: 200 })
.then(() => {

  const time = Date.now() - start;
  console.log(`Finished in ${time}ms`);
});
