# 📑 SAPATAMU.KU UPDATE AUDIT LOG (v1.3)
**Environment:** `D:\Google Antigrafity\SapaTamu.Ku`
**Tanggal:** 16 Mei 2026
**Status:** Beta Testing (Ready for Production Sync)

---

## 📝 DESKRIPSI UPDATE
Update kali ini berfokus pada **Finalisasi Modular Page Builder** dan **Premium UX Overhaul**. Sistem undangan telah bertransformasi dari sistem template statis menjadi sistem blok dinamis yang memungkinkan fleksibilitas penuh bagi klien.

### 1. Sistem Universal Guest Link (Public Access)
Kini tamu undangan dapat mengakses undangan tanpa perlu melalui subdomain klien.
- **Format URL**: `sapatamu.id/undangan.html?u=username`
- **Tujuan**: Memudahkan akses tamu yang tidak memiliki hak akses SSID subdomain dan berfungsi sebagai preview publik untuk calon klien baru.

### 2. Tema "Forest" (Cloning mitagildan)
Implementasi tema baru yang dikloning secara presisi dari referensi premium.
- **Palet Warna**: Dark Forest Green (`#1a2e1a`), Gold (`#d4af37`), Cream (`#f9f4e8`).
- **Fitur Baru**: Seksi "Our Love Story" (Timeline) dan seksi "Quote/Ayat Suci" yang sepenuhnya modular.

### 3. Premium Editor UI/UX (Katsudoto Style)
Perombakan total antarmuka editor klien (`undangan-edit.html`).
- **3-Column Workspace**: Navigasi Sidebar | Form Editor | Live Preview Mockup.
- **Switch Toggle**: Mengganti checkbox lama dengan slider ON/OFF yang modern untuk kontrol seksi.
- **Asset Upload Engine**: Integrasi Cloudinary langsung dari editor untuk:
    - Background Utama.
    - Foto Mempelai (Pria/Wanita).
    - Musik Latar (File MP3).

### 4. Kelengkapan Data Mempelai & Acara
- Penambahan field **"Putra/Putri Ke-"** untuk silsilah keluarga.
- Tombol **Google Maps Helper** untuk mempermudah pengambilan koordinat lokasi acara.

### 5. Theme Structural Variants (iPhone Model Analogy)
Sistem tidak lagi hanya sekadar mengganti warna (CSS), melainkan sudah mendukung perbedaan struktur HTML antar tema:
- **Emerald Forest**: Menggunakan bingkai foto **"Arch Frame"**, ornamen floral (leaf icons), dan tata letak kartu yang lebih lebar.
- **Midnight Sapphire**: Menggunakan gaya minimalis modern dengan kontras tinggi.
- **Classic Minimalist**: Mempertahankan gaya lingkaran tradisional yang bersih.

---

## 🚀 DAFTAR PATCH SCRIPT (16 Mei - Final)
*Wajib diterapkan untuk mendukung sistem modular builder v1.3.5.*

**A. Core Rendering Engine (`undangan-preview.html`):**
```javascript
const SectionLibrary = {
    'mempelai': (c, theme) => {
        const isForest = theme === 'forest';
        // Logic render struktur berbeda berdasarkan ID tema
        return `...`;
    }
}
```

Fungsi `renderModularPage` sekarang mendeteksi parameter `?u=` dan menggunakan variabel CSS untuk *theming*.
```javascript
function getClientId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('u') || urlParams.get('c') || window.location.hostname.split('.')[0];
}
```

### **B. Asset Management Logic (`undangan-edit.html`)**
Implementasi `handleFileUpload` untuk Cloudinary.
```javascript
async function handleFileUpload(input, type) {
    const formData = new FormData();
    formData.append('file', input.files[0]);
    formData.append('upload_preset', 'sapatamu_preset');
    const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData });
    // ... update state & sync preview
}
```

---

## 📂 STRUKTUR FOLDER ASET BARU
Pastikan folder ini ada di server untuk mendukung tema Forest:
- `/assets/themes/forest/style.css`
- `/assets/themes/forest/script.js` (jika ada logic khusus)

---
> [!IMPORTANT]
> **Catatan untuk Release Agent:**
> Selalu bandingkan file di direktori `D:\Google Antigrafity\SapaTamu.Ku` dengan patch log ini sebelum melakukan push ke server produksi. Pastikan API Key Supabase dan Cloudinary di `undangan-edit.html` sudah sesuai dengan environment production.
