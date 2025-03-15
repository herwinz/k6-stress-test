import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export let options = {
  scenarios: {
    infinite_test: {
      executor: 'constant-vus',
      vus: 100, // 100 Virtual Users
      duration: '365d', // Tes berjalan terus-menerus
    },
  },
};

// Fungsi utama yang dijalankan oleh setiap Virtual User (VU)
export default function () {
  const url = 'https://app-web-yzcznwy1y2zhm.azurewebsites.net/'; // Ganti dengan App Service URL-mu

  // Simulasikan user unik dengan ID random
  const userId = randomString(10);
  const sessionId = randomString(15);

  // Tambahkan header custom agar user session unik
  const headers = {
    'User-Agent': `k6-test-${userId}`,
    'X-User-Session': sessionId,
    'X-Forwarded-For': `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` // Simulasi IP unik
  };

  // Kirim request dengan header unik
  let res = http.get(url, { headers: headers });

  // Log status dan response time
  console.log(`[User: ${userId}] Status: ${res.status}, Response Time: ${res.timings.duration}ms`);

  // Simulasikan waktu tunggu antar request
  sleep(0.1);
}
