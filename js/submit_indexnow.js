import https from 'https';

const API_KEY = "76c3265a126e41b6bfdd959248164ab6";
const HOST = "avogatro.github.io";
const KEY_LOCATION = `https://${HOST}/simultaneous-equation-cannons-calculator/${API_KEY}.txt`;
const BASE_URL = `https://${HOST}/simultaneous-equation-cannons-calculator`;

const urlsToSubmit = [
  `${BASE_URL}/`,
  `${BASE_URL}/extra`,
  `${BASE_URL}/banished`,
  `${BASE_URL}/help`,
  `${BASE_URL}/about`
];

const payload = JSON.stringify({
  host: HOST,
  key: API_KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlsToSubmit
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
};

console.log("Pinging IndexNow API...");

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log(`Success! URLs submitted to IndexNow (HTTP ${res.statusCode}).`);
      if (res.statusCode === 202) {
        console.log("Note: 202 means 'Accepted'. The request is queued and Bing will verify the key file shortly.");
      }
    } else {
      console.log(`Failed with HTTP ${res.statusCode}: ${data}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error with request: ${e.message}`);
});

req.write(payload);
req.end();
