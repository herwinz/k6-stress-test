import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  // Define ramp-up stages for the test
  stages: [
    { duration: '30s', target: 50 },   // 50 users for 30 seconds
    { duration: '1m', target: 200 },  // Ramp-up to 200 users over 1 minute
    { duration: '2m', target: 500 },  // Maintain 500 users for 2 minutes
    { duration: '1m', target: 1000 }, // Ramp-up to 1000 users over 1 minute
    { duration: '30s', target: 0 },   // Ramp-down to 0 users over 30 seconds
  ],
};

// Main test function
export default function () {
  const url = 'https://app-web-yzcznwy1y2zhm.azurewebsites.net/'; // App Service URL

  // Perform a GET request
  let res = http.get(url);

  // Log the status and response time for monitoring
  console.log(`Status: ${res.status}, Response Time: ${res.timings.duration}ms`);

  // Short sleep to mimic real-world usage
  sleep(0.1);
}
