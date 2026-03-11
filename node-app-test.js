import http from 'k6/http';

export const options = {
  vus: 500,              // 🔥 500 virtual users (tinggi)
  duration: '5m',        // 🔥 Jalankan selama 5 menit
  insecureSkipTLSVerify: true,
  noConnectionReuse: true,
};

export default function () {
  http.get('https://cloud-sizing-system.azurewebsites.net/login');
}
