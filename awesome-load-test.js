import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// Konfigurasi skenario untuk menghasilkan variasi load
export let options = {
  scenarios: {
    realistic_traffic: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 300 },
        { duration: '3m', target: 500 },
        { duration: '5m', target: 700 },
        { duration: '2m', target: 300 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
    steady_load: {
      executor: 'constant-vus',
      vus: 100,
      duration: '1h', // Ubah sesuai kebutuhan durasi historis kamu
      startTime: '15m', // Mulai setelah skenario pertama
    }
  },
};

// Fungsi utama per VU
export default function () {
  const url = 'https://app-web-yzcznwy1y2zhm.azurewebsites.net/'; // Ganti dengan URL kamu

  // Identitas user random
  const userId = randomString(8);
  const sessionId = randomString(12);
  const randomIP = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;

  const headers = {
    'User-Agent': `k6-user-${userId}`,
    'X-User-Session': sessionId,
    'X-Forwarded-For': randomIP,
  };

  // Kirim request GET
  let res = http.get(url, { headers: headers });

  // Cek dan log response
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    user: userId,
    session: sessionId,
    ip: randomIP,
    status: res.status,
    response_time_ms: res.timings.duration
  }));

  // Simulasi user delay
  sleep(Math.random() * 1 + 0.1); // antara 0.1s hingga 1.1s
}
