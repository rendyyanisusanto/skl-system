<template>
    <div style="padding-top: 3% ;padding-bottom: 3%;" class="container-fluid min-vh-100 d-flex justify-content-center align-items-center gradient-bg">
      <div class="col-md-6 col-lg-6">
        <!-- Card utama -->
        <div class="card shadow-lg p-4">
          <!-- Logo -->
          <div class="text-center mb-4">
            <img src="/src/assets/logo.png" alt="Logo" class="img-fluid logo" />
            <h4 class="fw-bold mb-3 mt-4 text-uppercase">Sistem Penerbitan Surat Keterangan Lulus</h4>
  
  <!-- Deskripsi -->
            <p style="text-align: justify !important;" class="text-muted small text-justify mb-4">
                Sistem ini disediakan oleh SMK IT Asy-Syadzili untuk memudahkan siswa dalam mengakses Surat Keterangan Lulus (SKL) secara digital. 
                Dengan platform ini, siswa dapat dengan mudah memeriksa dan mengunduh SKL mereka yang sudah diterbitkan setelah kelulusan. 
                Cukup masukkan NISN atau kode akses yang diberikan untuk melihat dokumen resmi kelulusan. 
                Sistem ini bertujuan untuk meningkatkan efisiensi dan transparansi dalam proses distribusi dokumen penting tersebut.
            </p>
          </div>
          
          <!-- Petunjuk -->
          <div class="alert alert-info">
            <strong>Petunjuk:</strong> Masukkan kode akses SKL. Kode Akses dapat diminta dari sekolah. apabila terkendala bisa menghubungi pihak sekolah atau memanfaatkan live chat
          </div>
  
          <!-- Form Input -->
          <div class="form-group mb-3">
            <label for="kode">Masukkan Kode Akses</label>
            <input v-model="kode"
                   type="text"
                   id="kode"
                   class="form-control"
                   placeholder="Contoh: 8732917289 (dapatkan kode akses dari pihak sekolah)"
                   :disabled="loading" />
          </div>
  
          <!-- Tombol -->
          <button @click="cekKode"
                  class="btn w-100"
                  :disabled="loading">
            🔍 Cek SKL
          </button>
  
          <!-- Loading -->
          <div v-if="loading" class="text-center mt-3">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
  
          <!-- Error -->
          <div v-if="error" class="alert alert-danger mt-3">
            ❌ {{ error }}
          </div>
  
          <!-- Data Siswa -->
          <div v-if="dataSiswa" class="card mt-4 border">
            <div class="card-body">
              <h5 class="card-title text-center mb-3">Surat Keterangan Lulus</h5>
              <hr />
  
              <div class="info-row">
                <strong>Nama</strong>
                <span>{{ dataSiswa.siswa.nama }}</span>
              </div>
              <div class="info-row">
                <strong>NISN</strong>
                <span>{{ dataSiswa.siswa.nisn }}</span>
              </div>
              <div class="info-row border-bottom pb-2 mb-2">
                <strong>Kode</strong>
                <span>{{ dataSiswa.kode }}</span>
              </div>
  
              <!-- Alert Status -->
              <div :class="`alert ${dataSiswa.status === '1' ? 'alert-success' : 'alert-danger'}`">
                {{ dataSiswa.keterangan }}
              </div>
  
              <!-- Tombol Download -->
              <div v-if="dataSiswa.status === '1'" class="text-center">
                <a :href="`${dataSiswa.file}`"
                   class="btn btn-success w-100"
                   download>
                  🔽 Unduh SKL
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const kode = ref('')
  const error = ref('')
  const loading = ref(false)
  const dataSiswa = ref(null)
  
  const cekKode = async () => {
    error.value = ''
    dataSiswa.value = null
    loading.value = true
  
    try {
      const tokenRes = await fetch('https://apiedulite.simsmk.sch.id/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'rendy',
          password: 'Tahutelor123'
        })
      })
  
      const tokenData = await tokenRes.json()
  
      if (!tokenData.token) throw new Error('Gagal mendapatkan token')
  
      const token = tokenData.token
  
      const sklRes = await fetch(`https://apiedulite.simsmk.sch.id/skl/${kode.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  
      if (!sklRes.ok) throw new Error('Kode akses tidak ditemukan')
  
      const sklData = await sklRes.json()
      dataSiswa.value = sklData
    } catch (e) {
      error.value = e.message || 'Terjadi kesalahan'
    } finally {
      loading.value = false
    }
  }
  onMounted(() => {
  // Tawk.to script loading
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.src = 'https://embed.tawk.to/5fbb4066a1d54c18d8ec51e2/default'
  script.charset = 'UTF-8'
  document.body.appendChild(script)
})
  </script>
  
  <style scoped>
  .gradient-bg {
    background: linear-gradient(45deg, #6a11cb, #2575fc);
    background-size: 400% 400%;
    animation: gradientAnimation 10s ease infinite;
  }
  
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .card {
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .logo {
    width: 100px;
  }
  
  .btn {
    font-weight: 600;
    padding: 12px;
    border-radius: 10px;
    transition: all 0.3s ease;
    background: linear-gradient(45deg, #007bff, #0056b3);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }
  
  .btn:hover {
    background: linear-gradient(45deg, #0056b3, #003d80);
    transform: translateY(-2px);
  }
  
  .btn-success {
    background: linear-gradient(45deg, #28a745, #1e7e34);
    border: none;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    color: white;
  }
  
  .btn-success:hover {
    background: linear-gradient(45deg, #1e7e34, #155d27);
    transform: translateY(-2px);
  }
  
  .info-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
  }
  </style>
  