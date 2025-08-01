import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 20,           // Virtual users
  duration: '1m',    // Durasi test: 1 menit
};

export default function () {
  http.get('https://cloud-sizing-app.azurewebsites.net/load');
  sleep(1); // Jeda antar request (biar tidak terlalu cepat)
}
