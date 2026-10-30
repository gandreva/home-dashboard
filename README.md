# HomeOps Studio - Smart Home Dashboard 🏡⚡

Dashboard modern, interaktif, dan responsif untuk memonitor **Aktivitas, Kebutuhan Inventaris, Tagihan Bulanan, serta Perangkat WiFi Rumah**.

Dibangun dengan estetika **Automation Hub Dark Mode** (Tailwind CSS, Lucide Icons, Glassmorphism, dan LocalStorage offline-first).

---

## ✨ Fitur Utama

### 1. 📶 Monitoring Perangkat WiFi Rumah (Network Hub)
* **Status Router & Jaringan**: Gateway IP, Subnet, Bandwidth monitor, dan status proteksi WPA3.
* **Deteksi Klien Terkoneksi**: Menampilkan nama perangkat, pemilik, vendor, IP Address, dan MAC Address.
* **Keamanan & Perangkat Asing (Rogue Device)**: Deteksi otomatis status kepercayaan (*Trusted*, *Guest*, atau *Unknown/Asing* yang dicurigai menyusup).
* **Kontrol Cepat**: Toggle online/offline status, ubah kepercayaan perangkat, dan scan ulang jaringan.

### 2. 🛒 Inventaris & Kebutuhan Rumah (Pantry & Household)
* Kategori lengkap: Dapur & Sembako, Toiletries & Mandi, Pembersih/Cuci, dan Kebutuhan Rutin lainnya.
* Status ketersediaan interaktif: 🟢 **Tersedia**, 🟡 **Menipis (Perlu Restock)**, 🔴 **Habis (Prioritas Belanja)**.
* Estimasi biaya belanja otomatis per item.

### 3. 🧹 Aktivitas & Rutinitas Kebersihan Rumah (Task Scheduler)
* Penjadwalan harian, mingguan, dan berkala.
* Pembagian tugas (*Assignee*) antar anggota keluarga (Ayah, Ibu, Anak, dll.).
* Checklist tuntas instan (*one-click complete*).

### 4. 💳 Tagihan & Maintenance Rutin
* Monitoring jatuh tempo tagihan utilitas (PLN Listrik, Internet WiFi, Air PDAM, IPL/RT).
* Kalkulasi otomatis total nominal tagihan belum lunas.
* Pengingat perawatan berkala (Servis AC tiap 3 bulan, kuras tandon air, gas LPG).
* Widget kontak cepat darurat (Satpam, RT/RW, Teknisi, Puskesmas).

---

## 🚀 Cara Menjalankan

Aplikasi ini bersifat **serverless & zero-dependency**, cukup buka langsung file HTML di browser favorit Anda:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/gandreva/home-dashboard.git
   cd home-dashboard
   ```
2. Buka file `index.html` langsung di Google Chrome / Microsoft Edge / browser lainnya:
   * Double click file `index.html`, atau
   * Buka via terminal:
     ```powershell
     Start-Process index.html
     ```

---

## 🛠️ Tech Stack
* **HTML5 & Vanilla JavaScript** (ES6+)
* **Tailwind CSS CDN**
* **Lucide Icons**
* **HTML5 LocalStorage** (Data tersimpan aman di browser tanpa perlu server/database tambahan)
