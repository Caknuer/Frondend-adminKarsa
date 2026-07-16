<template>

<div class="page">

  <!-- ========================= -->
  <!-- HEADER -->
  <!-- ========================= -->

  <div class="page-header">

    <div>

      <h2>
        Dashboard Tagihan Simpanan Wajib
      </h2>

      <p class="subtitle">

        Monitoring pembayaran simpanan wajib seluruh anggota koperasi.

      </p>

    </div>

    <div style="display:flex;gap:10px;">

      <el-button

        @click="loadData"

      >

        Refresh

      </el-button>

      <el-button

        @click="
          $router.push('/setting-tagihan')
        "

      >

        Pengaturan

      </el-button>

      <el-button

        type="primary"

        @click="generateTagihan"

      >

        Generate Bulan Ini

      </el-button>

    </div>

  </div>

  <!-- ========================= -->
  <!-- STATUS BULAN -->
  <!-- ========================= -->

  <el-card class="periode-card">

    <el-row :gutter="20">

      <el-col :span="4">

        <div class="info-title">

          Periode

        </div>

        <div class="info-value">

          {{ status.periode }}

        </div>

      </el-col>

      <el-col :span="4">

        <div class="info-title">

          Nominal

        </div>

        <div class="info-value">

          Rp {{ rupiah(status.nominal) }}

        </div>

      </el-col>

      <el-col :span="4">

        <div class="info-title">

          Generate

        </div>

        <el-tag

          :type="
            status.sudah_generate
              ? 'success'
              : 'warning'
          "

        >

          {{

            status.sudah_generate

            ? 'Sudah'

            : 'Belum'

          }}

        </el-tag>

      </el-col>

      <el-col :span="4">

        <div class="info-title">

          Otomatis

        </div>

        <el-tag

          :type="
            status.generate_otomatis
              ? 'success'
              : 'danger'
          "

        >

          {{

            status.generate_otomatis

            ? 'ON'

            : 'OFF'

          }}

        </el-tag>

      </el-col>

      <el-col :span="4">

        <div class="info-title">

          Generate

        </div>

        <div class="info-value">

          Tgl

          {{ status.tanggal_generate }}

        </div>

      </el-col>

      <el-col :span="4">

        <div class="info-title">

          Jatuh Tempo

        </div>

        <div class="info-value">

          Tgl

          {{ status.jatuh_tempo }}

        </div>

      </el-col>

    </el-row>

  </el-card>

  <!-- ========================= -->
  <!-- STATISTIK -->
  <!-- ========================= -->

  <el-row
    :gutter="20"
    class="summary-row"
  >

    <el-col
      :xs="24"
      :sm="12"
      :md="6"
    >

      <el-card class="summary-card">

        <div class="summary-title">

          Total Anggota

        </div>

        <div class="summary-value">

          {{ totalAnggota }}

        </div>

      </el-card>

    </el-col>

    <el-col
      :xs="24"
      :sm="12"
      :md="6"
    >

      <el-card class="summary-card">

        <div class="summary-title">

          Sudah Lunas

        </div>

        <div
          class="summary-value success"
        >

          {{ anggotaLunas }}

        </div>

      </el-card>

    </el-col>

    <el-col
      :xs="24"
      :sm="12"
      :md="6"
    >

      <el-card class="summary-card">

        <div class="summary-title">

          Menunggak

        </div>

        <div
          class="summary-value danger"
        >

          {{ anggotaMenunggak }}

        </div>

      </el-card>

    </el-col>

    <el-col
      :xs="24"
      :sm="12"
      :md="6"
    >

      <el-card class="summary-card">

        <div class="summary-title">

          Total Tunggakan

        </div>

        <div
          class="summary-value warning"
        >

          Rp

          {{ rupiah(totalTunggakan) }}

        </div>

      </el-card>

    </el-col>

  </el-row>

    <!-- ========================= -->
  <!-- FILTER -->
  <!-- ========================= -->

  <el-card class="table-card">

    <div class="toolbar">

      <div
        style="
          display:flex;
          gap:12px;
          flex-wrap:wrap;
        "
      >

        <el-input
          v-model="search"
          placeholder="Cari nama anggota..."
          clearable
          style="width:280px"
        />

        <el-select
          v-model="filterStatus"
          placeholder="Status"
          style="width:170px"
        >

          <el-option
            label="Semua"
            value=""
          />

          <el-option
            label="Lunas"
            value="lunas"
          />

          <el-option
            label="Menunggak"
            value="menunggak"
          />

        </el-select>

        <el-select
          v-model="filterTahun"
          placeholder="Tahun"
          style="width:140px"
        >

          <el-option
            label="Semua"
            value=""
          />

          <el-option
            v-for="tahun in daftarTahun"
            :key="tahun"
            :label="tahun"
            :value="tahun"
          />

        </el-select>

      </div>

      <el-button
        @click="loadData"
      >
        Refresh
      </el-button>

    </div>

    <!-- ========================= -->
    <!-- TABEL -->
    <!-- ========================= -->

    <el-table
      :data="filteredData"
      border
      stripe
      v-loading="loading"
    >

      <!-- FOTO -->

      <el-table-column
        width="80"
        label=""
      >

        <template #default="scope">

          <el-avatar
            :src="scope.row.foto_profile_url"
            :size="45"
          >

            {{
              scope.row.nama
                ?.charAt(0)
                ?.toUpperCase()
            }}

          </el-avatar>

        </template>

      </el-table-column>

      <!-- NAMA -->

      <el-table-column
        prop="nama"
        label="Nama Anggota"
        min-width="220"
      />

      <!-- SALDO -->

      <el-table-column
        label="Saldo"
        width="170"
      >

        <template #default="scope">

          Rp

          {{

            rupiah(
              scope.row.saldo
            )

          }}

        </template>

      </el-table-column>

      <!-- PROGRESS -->

      <el-table-column
        label="Progress"
        width="220"
      >

        <template #default="scope">

          <el-progress

            :percentage="
              hitungProgress(scope.row)
            "

            :status="
              scope.row.jumlah_tunggakan === 0
                ? 'success'
                : ''
            "

          />

        </template>

      </el-table-column>

      <!-- TUNGGAKAN -->

      <el-table-column
        label="Tunggakan"
        width="130"
      >

        <template #default="scope">

          <el-tag
            v-if="
              scope.row.jumlah_tunggakan === 0
            "
            type="success"
          >

            Lunas

          </el-tag>

          <el-tag
            v-else
            type="danger"
          >

            {{

              scope.row.jumlah_tunggakan

            }}

            Bulan

          </el-tag>

        </template>

      </el-table-column>

      <!-- TOTAL -->

      <el-table-column
        label="Total"
        width="170"
      >

        <template #default="scope">

          Rp

          {{

            rupiah(
              scope.row.total_tunggakan
            )

          }}

        </template>

      </el-table-column>

      <!-- TERAKHIR -->

      <el-table-column
        prop="terakhir_bayar"
        label="Terakhir Bayar"
        width="150"
      />

      <!-- AKSI -->

      <el-table-column
        label="Aksi"
        width="90"
        align="center"
      >

        <template #default="scope">

          <el-tooltip
            content="Lihat Detail"
          >

            <el-button

              circle

              type="primary"

              @click="
                lihatDetail(scope.row)
              "

            >

              👁

            </el-button>

          </el-tooltip>

        </template>

      </el-table-column>

    </el-table>

  </el-card>

</div>

</template>

<script setup>

import {
  ref,
  computed,
  onMounted
} from "vue";

import {
  useRouter
} from "vue-router";

import {
  ElMessage
} from "element-plus";

import api from "../api/axios";

const router = useRouter();

// ==========================
// STATE
// ==========================

const loading = ref(false);

const dashboard = ref([]);

const status = ref({});

const search = ref("");

const filterStatus = ref("");

const filterTahun = ref("");

// ==========================
// DAFTAR TAHUN
// ==========================

const daftarTahun = computed(() => {

  const tahun = [];

  const sekarang =
    new Date().getFullYear();

  for (
    let i = sekarang;
    i >= 2025;
    i--
  ) {

    tahun.push(i);

  }

  return tahun;

});

// ==========================
// LOAD DASHBOARD
// ==========================

const loadData = async () => {

  try {

    loading.value = true;

    const response =
      await api.get(
        "/tagihan/dashboard"
      );

    dashboard.value =
      response.data.data;

  } catch (error) {

    console.error(error);

    ElMessage.error(
      "Gagal memuat dashboard."
    );

  } finally {

    loading.value = false;

  }

};

// ==========================
// LOAD STATUS
// ==========================

const loadStatus = async () => {

  try {

    const response =
      await api.get(
        "/tagihan/status"
      );

    status.value =
      response.data.data;

  } catch (error) {

    console.error(error);

  }

};

// ==========================
// GENERATE TAGIHAN
// ==========================

const generateTagihan = async () => {

  try {

    await api.post(
      "/tagihan/generate"
    );

    ElMessage.success(
      "Generate tagihan berhasil."
    );

    loadStatus();

    loadData();

  } catch (error) {

    console.error(error);

    ElMessage.error(

      error.response?.data?.message ||

      "Generate gagal."

    );

  }

};

// ==========================
// FORMAT RUPIAH
// ==========================

const rupiah = (angka) => {

  return Number(

    angka || 0

  ).toLocaleString(

    "id-ID"

  );

};
// ==========================
// FILTER DATA
// ==========================

const filteredData = computed(() => {

  return dashboard.value.filter(item => {

    // Search nama
    const cocokNama =
      item.nama
        ?.toLowerCase()
        .includes(
          search.value.toLowerCase()
        );

    // Filter status
    let cocokStatus = true;

    if (filterStatus.value === "lunas") {

      cocokStatus =
        item.jumlah_tunggakan === 0;

    }

    if (filterStatus.value === "menunggak") {

      cocokStatus =
        item.jumlah_tunggakan > 0;

    }

    // Filter tahun
    // (sementara menggunakan tahun periode aktif)

    let cocokTahun = true;

    if (
      filterTahun.value &&
      status.value.periode
    ) {

      cocokTahun =
        status.value.periode.startsWith(
          String(filterTahun.value)
        );

    }

    return (
      cocokNama &&
      cocokStatus &&
      cocokTahun
    );

  });

});

// ==========================
// CARD STATISTIK
// ==========================

const totalAnggota = computed(() => {

  return dashboard.value.length;

});

const anggotaLunas = computed(() => {

  return dashboard.value.filter(

    item =>
      item.jumlah_tunggakan === 0

  ).length;

});

const anggotaMenunggak = computed(() => {

  return dashboard.value.filter(

    item =>
      item.jumlah_tunggakan > 0

  ).length;

});

const totalTunggakan = computed(() => {

  return dashboard.value.reduce(

    (sum, item) =>

      sum +
      Number(
        item.total_tunggakan
      ),

    0

  );

});

// ==========================
// HITUNG PROGRESS
// ==========================

const hitungProgress = (
  row
) => {

  const totalBulan = 12;

  const lunas =
    totalBulan -
    row.jumlah_tunggakan;

  return Math.max(

    0,

    Math.min(

      100,

      Math.round(
        (lunas / totalBulan) * 100
      )

    )

  );

};

// ==========================
// DETAIL
// ==========================

const lihatDetail = (
  row
) => {

  router.push(
    `/tagihan/${row.id}`
  );

};

// ==========================
// INIT
// ==========================

onMounted(() => {

  loadStatus();

  loadData();

});

</script>

<style scoped>

/* ===========================
   PAGE
=========================== */

.page{
  display:flex;
  flex-direction:column;
  gap:20px;
}

/* ===========================
   HEADER
=========================== */

.page-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
}

.page-header h2{
  margin:0;
  font-size:28px;
  font-weight:700;
  color:#303133;
}

.subtitle{
  margin-top:6px;
  color:#909399;
  font-size:14px;
}

/* ===========================
   CARD PERIODE
=========================== */

.periode-card{

  border-radius:16px;

}

.info-title{

  color:#909399;

  font-size:13px;

  margin-bottom:8px;

}

.info-value{

  font-size:20px;

  font-weight:700;

  color:#303133;

}

/* ===========================
   SUMMARY
=========================== */

.summary-row{

  margin-top:5px;

}

.summary-card{

  border-radius:16px;

  transition:.25s;

  cursor:default;

}

.summary-card:hover{

  transform:translateY(-4px);

  box-shadow:
    0 12px 26px
    rgba(0,0,0,.08);

}

.summary-title{

  color:#909399;

  font-size:14px;

  margin-bottom:10px;

}

.summary-value{

  font-size:30px;

  font-weight:bold;

  color:#303133;

}

.summary-value.success{

  color:#67C23A;

}

.summary-value.warning{

  color:#E6A23C;

}

.summary-value.danger{

  color:#F56C6C;

}

/* ===========================
   TABLE
=========================== */

.table-card{

  border-radius:16px;

}

.toolbar{

  display:flex;

  justify-content:space-between;

  align-items:center;

  margin-bottom:20px;

  gap:15px;

  flex-wrap:wrap;

}

.el-table{

  border-radius:12px;

}

.el-table th{

  background:#f8f9fb !important;

  color:#606266;

  font-weight:600;

}

.el-table td{

  padding-top:12px;

  padding-bottom:12px;

}

/* ===========================
   AVATAR
=========================== */

.el-avatar{

  border:2px solid #ebeef5;

}

/* ===========================
   BUTTON
=========================== */

.el-button{

  border-radius:10px;

}

.el-button--primary{

  font-weight:600;

}

/* ===========================
   TAG
=========================== */

.el-tag{

  border-radius:20px;

  padding:0 14px;

}

/* ===========================
   PROGRESS
=========================== */

:deep(.el-progress-bar__outer){

  border-radius:20px;

  height:10px;

}

:deep(.el-progress-bar__inner){

  border-radius:20px;

}

/* ===========================
   CARD HOVER
=========================== */

:deep(.el-card){

  transition:.25s;

}

:deep(.el-card:hover){

  box-shadow:

    0 10px 24px

    rgba(0,0,0,.08);

}

/* ===========================
   RESPONSIVE
=========================== */

@media(max-width:992px){

.page-header{

flex-direction:column;

align-items:flex-start;

}

.toolbar{

flex-direction:column;

align-items:stretch;

}

.toolbar .el-input{

width:100%!important;

}

.toolbar .el-select{

width:100%!important;

}

}

@media(max-width:768px){

.page-header h2{

font-size:22px;

}

.summary-value{

font-size:24px;

}

.info-value{

font-size:18px;

}

.subtitle{

font-size:13px;

}

}

</style>