const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 3000;
const DASHBOARD_DIR = path.join(__dirname);
const HTML_FILE = path.join(DASHBOARD_DIR, 'index.html');

// In-memory or cached scanned devices
let realDevices = [];
let isScanning = false;

// Scan subnet using ping + arp
function scanSubnet() {
  if (isScanning) return;
  isScanning = true;
  console.log('[Scanner] Scanning WiFi network (192.168.18.x)...');

  // Sweep ping 192.168.18.1 to 192.168.18.50 using powershell fast parallel
  const psCmd = `powershell -ExecutionPolicy Bypass -Command "1..50 | ForEach-Object { $null = (New-Object System.Net.NetworkInformation.Ping).Send('192.168.18.' + $_, 80) }; arp -a"`;
  
  exec(psCmd, (err, stdout) => {
    isScanning = false;
    if (err) {
      console.error('[Scanner] Error running ARP scan:', err.message);
      return;
    }

    const lines = stdout.split('\n');
    const detected = [];

    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        const ip = parts[0];
        const mac = parts[1].toUpperCase();
        const type = parts[2];

        // Filter valid local subnet IPs
        if (ip.startsWith('192.168.18.') && !ip.endsWith('.255') && !ip.endsWith('.133')) {
          let devName = 'Perangkat Jaringan';
          let owner = 'Keluarga / Rumah';
          let devType = 'Smartphone';
          let trust = 'trusted';

          if (ip === '192.168.18.1') {
            devName = 'Router / Gateway WiFi (ZTE/IndiHome)';
            owner = 'Infrastruktur Rumah';
            devType = 'CCTV / IoT';
          }

          detected.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            name: devName,
            owner: owner,
            type: devType,
            vendor: 'IEEE ' + mac.slice(0, 8),
            ip: ip,
            mac: mac,
            online: true,
            trust: trust
          });
        }
      }
    });

    if (detected.length > 0) {
      realDevices = detected;
      console.log(`[Scanner] Discovered ${detected.length} active devices on WiFi.`);
    }
  });
}

// Initial scan and periodic scan every 30 seconds
scanSubnet();
setInterval(scanSubnet, 30000);

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API endpoint for real devices
  if (req.url === '/api/devices') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      gateway: '192.168.18.1',
      subnet: '255.255.255.0',
      devices: realDevices
    }));
    return;
  }

  // Trigger manual rescan
  if (req.url === '/api/scan' && req.method === 'POST') {
    scanSubnet();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'scanning_started' }));
    return;
  }

  // Serve Dashboard HTML
  fs.readFile(HTML_FILE, 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading dashboard: ' + err.message);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🏡 HomeOps Studio Server Aktif!`);
  console.log(`Akses Lokal : http://localhost:${PORT}`);
  console.log(`Akses Domain: http://gandreva-home.id:${PORT}`);
  console.log(`Akses WiFi  : http://192.168.18.133:${PORT}`);
  console.log(`=======================================================`);
});
