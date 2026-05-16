# 📋 Audit Log Perbaikan Jalur Sistem SapaTamu.Ku


> [!IMPORTANT]
> **INSTRUKSI PENINJAUAN (WAJIB):** Sebelum menerapkan patch ini ke folder rilis produksi, silakan tinjau dan bandingkan kode dalam log ini dengan file final yang ada di environment **BETA** kita pada direktori: `D:\Google Antigrafity\SapaTamu.Ku`. Log ini adalah representasi dari fitur final yang sudah stabil. Gunakan file pada direktori tersebut sebagai referensi utama untuk memastikan tidak ada kesalahan persepsi saat proses update di website rilis.

---

## 📅 Tanggal: 15 Mei 2026 (Core Infrastructure & Subdomain)
*Berikut adalah detail teknis perubahan kode untuk membuka jalur sinkronisasi antara Editor, Database, dan Live Preview.*

### 1. Perbaikan Konektivitas Supabase (Global)
**Masalah:** Typo pada URL Ref ID (`rzdfvy` vs `rdfvxy`) menyebabkan error "Failed to fetch" secara sistemik.
**Perubahan:**
- Menstandardisasi URL ke: `https://cikptujrdfvxyfihwamh.supabase.co`
- File terdampak: `undangan.html`, `undangan-edit.html`, `undangan-preview.html`.

### 2. Penyelarasan Skema Kolom (Config)
**Masalah:** Ketidakkonsistenan antara kolom `config` dan `theme_config` di database.
**Perubahan:**
- **Editor:** Sekarang menyimpan data ke kedua kolom (`config` dan `theme_config`) untuk keamanan transisi data.
- **Preview:** Menambahkan logika fallback. Jika `theme_config` kosong, sistem otomatis mengambil data dari kolom `config`.
- **Constraint:** Memasukkan `theme_id` dalam proses upsert untuk menghindari error *Not-Null Constraint*.

### 3. Optimasi Subdomain & Case-Insensitivity
**Masalah:** Subdomain (huruf kecil) tidak cocok dengan Username di database (campuran huruf besar/kecil).
**Perubahan:**
- **Frontend:** Menggunakan `.ilike()` pada query Supabase agar pencarian `clientId` tidak sensitif terhadap huruf besar/kecil.
- **Backend (GAS):** Mengalihkan pencarian data ke **Kolom J** dan menggunakan `.toLowerCase().trim()` pada setiap perbandingan string.

---

## 🚀 DAFTAR PATCH SCRIPT (15 Mei)
*Wajib diupdate pada folder rilis agar fitur Subdomain & Preview berjalan lancar.*

```javascript
// A. Update backend/CentralBackend.gs (handleSaveInvitation)
function handleSaveInvitation(data) {
  try {
    let ssId = data.ssId;
    const masterSs = SpreadsheetApp.openById(MASTER_SS_ID);
    const masterSheet = masterSs.getSheetByName(MASTER_SHEET_NAME);
    const masterData = masterSheet.getDataRange().getValues();
    
    let rowIndex = -1;
    for (let i = 1; i < masterData.length; i++) {
      if (masterData[i][9] && masterData[i][9].toString().toLowerCase() === data.clientId.toLowerCase()) {
        rowIndex = i + 1;
        break;
      }
    }
    if (rowIndex === -1) return ContentService.createTextOutput("Client Not Found").setMimeType(ContentService.MimeType.TEXT);
    masterSheet.getRange(rowIndex, 11).setValue(JSON.stringify(data.config)); // Update Kolom K
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (e) {
    return ContentService.createTextOutput("Error: " + e.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
```

---

## 📅 Tanggal: 16 Mei 2026 (Modular Builder & Page Engine)
*Transformasi sistem dari template statis menjadi fleksibilitas modular ala Canva.*

### 1. Transisi ke Modular Page Builder (Section-Based)
**Masalah:** Struktur HTML statis di `undangan-preview.html` sangat kaku, menyulitkan user untuk menambah, menghapus, atau mengatur ulang urutan seksi undangan.
**Perubahan:**
- **Frontend:** Menggunakan `SectionLibrary` di JavaScript untuk merender HTML secara dinamis ke dalam penampung `#main-canvas`.
- **Logic:** Implementasi array `sections_order` yang memungkinkan urutan seksi disimpan secara unik untuk setiap klien.

### 2. Sistem Dynamic Theme Loader (Theme-Specific Assets)
**Masalah:** Gaya visual (CSS) antar tema sering bertabrakan karena dimuat secara manual dalam satu file.
**Perubahan:**
- Menambahkan **Dynamic Asset Loader** di bagian `<head>` yang mendeteksi parameter `?theme=`.
- Sistem secara otomatis memanggil file dari path: `/assets/themes/[theme-id]/style.css`.

### 3. Control Panel Tata Letak di Editor
**Masalah:** User tidak memiliki antarmuka untuk mengatur struktur undangan mereka sendiri.
**Perubahan:**
- Menambahkan tab **"Tata Letak (Layout)"** di sidebar editor.
- Implementasi fitur **Drag & Reorder** menggunakan tombol panah dan **Toggle Visibility** menggunakan checkbox.

---

## 🚀 DAFTAR PATCH SCRIPT (16 Mei)
*Wajib diterapkan untuk mendukung sistem modular builder v1.2.5.*

**A. Struktur Body Baru (`undangan-preview.html`):**
```html
<body class="bg-pattern">
    <div id="main-canvas" class="opacity-0 transition-opacity duration-1000">
        <!-- Render Otomatis oleh Section Engine -->
    </div>
</body>
```

**B. Persyaratan Struktur Folder Aset:**
Pastikan direktori berikut tersedia di root server:
- `/assets/themes/classic-minimalist/`
- `/assets/themes/midnight/`
- `/assets/themes/java/`
- `/assets/themes/rose-gold/`

---
> [!NOTE]
> Update ini membuat sistem SapaTamu.Ku jauh lebih skalabel. Penambahan desain tema baru di masa depan hanya perlu menambahkan folder aset tanpa mengubah logika kode inti.
