import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    infinite_test: {
      executor: 'constant-vus',
      vus: 100, // Number of virtual users
      duration: '365d', // Arbitrarily long duration (effectively infinite)
    },
  },
};

// Main test function
export default function () {
  const url = 'https://app-web-yzcznwy1y2zhm.azurewebsites.net/'; // Replace with your App Service URL

  // Perform a GET request
  let res = http.get(url);

  // Log the status and response time for monitoring
  console.log(`Status: ${res.status}, Response Time: ${res.timings.duration}ms`);

  // Short sleep to mimic real-world usage
  sleep(0.1);
}
