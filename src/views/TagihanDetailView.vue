<template>

<div class="page">

<el-page-header
@back="$router.back()"
content="Detail Tagihan Anggota"
/>

<!-- ========================= -->

<!-- HEADER -->

<!-- ========================= -->

<el-card class="header-card">

<el-row :gutter="20">

<el-col
:xs="24"
:md="6"
>

<div class="profile">

<el-avatar
:size="90"
:src="detail.anggota?.foto_profile_url"
>
{{ detail.anggota?.nama?.charAt(0) }}
</el-avatar>

<h2>

{{ detail.anggota?.nama }}

</h2>

</div>

</el-col>

<el-col
:xs="24"
:md="18"
>

<el-row :gutter="20">

<el-col :span="8">

<div class="info-box">

<div class="label">

Saldo

</div>

<div class="value">

Rp {{ rupiah(detail.saldo) }}

</div>

</div>

</el-col>

<el-col :span="8">

<div class="info-box">

<div class="label">

Total Simpanan

</div>

<div class="value">

Rp {{ rupiah(detail.total_simpanan) }}

</div>

</div>

</el-col>

<el-col :span="8">

<div class="info-box">

<div class="label">

Penarikan

</div>

<div class="value">

Rp {{ rupiah(detail.total_penarikan) }}

</div>

</div>

</el-col>

</el-row>

<div
style="
margin-top:25px;
"
>

<el-progress

:text-inside="true"

:stroke-width="20"

:percentage="progress"

status="success"

/>

</div>

<div
class="summary"
>

<div>

🟢 Lunas

<b>

{{ jumlahLunas }}

</b>

</div>

<div>

🔴 Belum

<b>

{{ jumlahBelum }}

</b>

</div>

<div>

⚪ Belum Aktif

<b>

{{ jumlahBelumAktif }}

</b>

</div>

</div>

</el-col>

</el-row>

</el-card>
<!-- ========================= -->
<!-- FILTER TAHUN -->
<!-- ========================= -->

<el-card class="tahun-card">

  <div class="tahun-header">

    <h3>Tahun Pembayaran</h3>

    <el-select
      v-model="tahun"
      style="width:150px"
      @change="loadDetail"
    >

      <el-option
        v-for="item in daftarTahun"
        :key="item"
        :label="item"
        :value="item"
      />

    </el-select>

  </div>

</el-card>

<!-- ========================= -->
<!-- GRID BULAN -->
<!-- ========================= -->

<el-row
  :gutter="20"
  class="bulan-grid"
>

  <el-col
    v-for="item in detail.bulan"
    :key="item.periode"
    :xs="12"
    :sm="8"
    :md="4"
  >

    <el-card

      class="bulan-card"

      :class="{

        active:
          selected?.periode ===
          item.periode

      }"

      @click="
        pilihBulan(item)
      "

    >

      <div class="bulan-title">

        {{ namaBulan(item.periode) }}

      </div>

      <div
        class="bulan-nominal"
      >

        <template
          v-if="
            item.status !==
            'belum_aktif'
          "
        >

          Rp

          {{ rupiah(item.nominal) }}

        </template>

        <template
          v-else
        >

          -

        </template>

      </div>

      <!-- ================= -->

      <!-- STATUS -->

      <!-- ================= -->

      <div
        class="bulan-status"
      >

        <!-- BELUM AKTIF -->

        <template
          v-if="
            item.status ===
            'belum_aktif'
          "
        >

          <el-tag
            type="info"
          >

            Belum Aktif

          </el-tag>

        </template>

        <!-- BELUM BAYAR -->

        <template
          v-else-if="
            item.status ===
            'belum_bayar'
          "
        >

          <el-tag
            type="danger"
          >

            Belum Bayar

          </el-tag>

        </template>

        <!-- LUNAS -->

        <template
          v-else
        >

          <el-tag
            type="success"
          >

            Lunas

          </el-tag>

        </template>

      </div>

      <!-- ================= -->

      <!-- TOMBOL -->

      <!-- ================= -->

      <div
        class="bulan-action"
      >

        <!-- AKTIFKAN -->

        <el-button

          v-if="
            item.status ===
            'belum_aktif'
          "

          type="primary"

          size="small"

          @click.stop="
            aktifkanTagihan(item)
          "

        >

          Aktifkan

        </el-button>

        <!-- VERIFIKASI -->

        <el-button

          v-else-if="
            item.status ===
            'belum_bayar'
          "

          type="warning"

          size="small"

          @click.stop="
            pilihBulan(item)
          "

        >

          Verifikasi

        </el-button>

        <!-- DETAIL -->

        <el-button

          v-else

          size="small"

          type="success"

          @click.stop="
            pilihBulan(item)
          "

        >

          Detail

        </el-button>

      </div>

    </el-card>

  </el-col>

</el-row>
<!-- ========================= -->
<!-- DETAIL BULAN -->
<!-- ========================= -->

<el-card
  v-if="selected"
  class="detail-card"
>

  <div class="detail-header">

    <h3>

      Detail Tagihan

    </h3>

    <el-tag
      size="large"
      :type="
        selected.status === 'lunas'
          ? 'success'
          : selected.status === 'belum_bayar'
          ? 'danger'
          : 'info'
      "
    >

      {{
        selected.status === "lunas"
          ? "Lunas"

          : selected.status ===
            "belum_bayar"

          ? "Belum Bayar"

          : "Belum Aktif"

      }}

    </el-tag>

  </div>

  <el-row :gutter="20">

    <el-col
      :xs="24"
      :md="12"
    >

      <el-descriptions
        :column="1"
        border
      >

        <el-descriptions-item
          label="Periode"
        >

          {{ selected.periode }}

        </el-descriptions-item>

        <el-descriptions-item
          label="Nominal"
        >

          Rp

          {{ rupiah(selected.nominal) }}

        </el-descriptions-item>

        <el-descriptions-item
          label="Jatuh Tempo"
        >

          {{

            selected.jatuh_tempo ||

            "-"

          }}

        </el-descriptions-item>

        <el-descriptions-item
          label="Tanggal Bayar"
        >

          {{

            selected.tanggal_bayar ||

            "-"

          }}

        </el-descriptions-item>

      </el-descriptions>

    </el-col>

    <!-- ======================== -->
    <!-- ACTION -->
    <!-- ======================== -->

    <el-col
      :xs="24"
      :md="12"
    >

      <!-- BELUM AKTIF -->

      <div
        v-if="
          selected.status ===
          'belum_aktif'
        "
      >

        <el-result
          icon="info"
          title="Tagihan Belum Dibuat"
          sub-title="
            Klik tombol di bawah untuk
            membuat tagihan bulan ini.
          "
        >

          <template #extra>

            <el-button

              type="primary"

              size="large"

              @click="
                aktifkanTagihan(selected)
              "

            >

              Aktifkan Tagihan

            </el-button>

          </template>

        </el-result>

      </div>

      <!-- BELUM BAYAR -->

      <div
        v-else-if="
          selected.status ===
          'belum_bayar'
        "
      >

        <el-result
          icon="warning"
          title="Menunggu Pembayaran"
          sub-title="
            Verifikasi jika anggota
            sudah melakukan pembayaran.
          "
        >

          <template #extra>

            <el-button

              type="success"

              size="large"

              @click="
                bayarTagihan(selected.id)
              "

            >

              Verifikasi Pembayaran

            </el-button>

          </template>

        </el-result>

      </div>

      <!-- LUNAS -->

      <div
        v-else
      >

        <el-result
          icon="success"
          title="Pembayaran Selesai"
          sub-title="
            Tagihan bulan ini sudah lunas.
          "
        />

      </div>

    </el-col>

  </el-row>

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
  useRoute,
  useRouter
} from "vue-router";

import {
  ElMessage,
  ElMessageBox
} from "element-plus";

import api from "../api/axios";

const route = useRoute();

const router = useRouter();

const detail = ref({});

const loading = ref(false);

const tahun = ref(
  new Date().getFullYear()
);

const selected = ref(null);

// ==========================
// DAFTAR TAHUN
// ==========================

const daftarTahun = computed(() => {

  const hasil = [];

  const sekarang =
    new Date().getFullYear();

  for (
    let i = sekarang;
    i >= 2025;
    i--
  ) {

    hasil.push(i);

  }

  return hasil;

});

// ==========================
// LOAD DETAIL
// ==========================

const loadDetail = async () => {

  try {

    loading.value = true;

    const response =
      await api.get(

        `/tagihan/detail/${route.params.id}`,

        {

          params: {

            tahun:
              tahun.value

          }

        }

      );

    detail.value =
      response.data.data;

    if (
      detail.value.bulan &&
      detail.value.bulan.length > 0
    ) {
      selected.value =
        detail.value.bulan[0];
    } else {
      selected.value = null;
    }

  } catch (error) {

    console.error(error);

    ElMessage.error(
      "Gagal memuat data."
    );

  } finally {

    loading.value = false;

  }

};
// ==========================
// PILIH BULAN
// ==========================

const pilihBulan = (item) => {

  selected.value = item;

};

// ==========================
// AKTIFKAN TAGIHAN
// ==========================

const aktifkanTagihan = async (item) => {

  try {

    await ElMessageBox.confirm(

      `Aktifkan tagihan periode ${item.periode}?`,

      "Konfirmasi",

      {

        type: "warning"

      }

    );

    await api.post(

      "/tagihan/aktifkan",

      {

        user_id:
          detail.value.anggota.id,

        periode:
          item.periode

      }

    );

    ElMessage.success(

      "Tagihan berhasil diaktifkan."

    );

    loadDetail();

  } catch (error) {

    if (error !== "cancel") {

      console.error(error);

      ElMessage.error(

        error.response?.data?.message ||

        "Gagal mengaktifkan tagihan."

      );

    }

  }

};

// ==========================
// VERIFIKASI PEMBAYARAN
// ==========================

const bayarTagihan = async (id) => {

  try {

    await ElMessageBox.confirm(

      "Verifikasi pembayaran anggota?",

      "Konfirmasi",

      {

        type: "warning"

      }

    );

    await api.patch(

      `/tagihan/${id}/lunas`

    );

    ElMessage.success(

      "Pembayaran berhasil diverifikasi."

    );

    loadDetail();

  } catch (error) {

    if (error !== "cancel") {

      console.error(error);

      ElMessage.error(

        error.response?.data?.message ||

        "Verifikasi gagal."

      );

    }

  }

};

// ==========================
// PROGRESS PEMBAYARAN
// ==========================

const progress = computed(() => {

  if (!detail.value.bulan)

    return 0;

  const total =
    detail.value.bulan.length;

  const lunas =
    detail.value.bulan.filter(

      item =>
        item.status === "lunas"

    ).length;

  return Math.round(

    (lunas / total) * 100

  );

});

// ==========================
// STATISTIK
// ==========================

const jumlahLunas = computed(() => {

  if (!detail.value.bulan)

    return 0;

  return detail.value.bulan.filter(

    item =>
      item.status === "lunas"

  ).length;

});

const jumlahBelum = computed(() => {

  if (!detail.value.bulan)

    return 0;

  return detail.value.bulan.filter(

    item =>
      item.status ===
      "belum_bayar"

  ).length;

});

const jumlahBelumAktif = computed(() => {

  if (!detail.value.bulan)

    return 0;

  return detail.value.bulan.filter(

    item =>
      item.status ===
      "belum_aktif"

  ).length;

});

// ==========================
// FORMAT NAMA BULAN
// ==========================

const namaBulan = (periode) => {

  if (!periode)

    return "-";

  const bulan = [

    "Januari",

    "Februari",

    "Maret",

    "April",

    "Mei",

    "Juni",

    "Juli",

    "Agustus",

    "September",

    "Oktober",

    "November",

    "Desember"

  ];

  const index =
    Number(

      periode.split("-")[1]

    ) - 1;

  return bulan[index];

};

// ==========================
// FORMAT RUPIAH
// ==========================

const rupiah = (value) => {

  return Number(

    value || 0

  ).toLocaleString(

    "id-ID"

  );

};

// ==========================
// INIT
// ==========================

onMounted(() => {

  loadDetail();

});

</script>
<style scoped>

/* ==========================
   PAGE
========================== */

.page{
  display:flex;
  flex-direction:column;
  gap:20px;
}

/* ==========================
   HEADER CARD
========================== */

.header-card{
  border-radius:16px;
}

.profile{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
}

.profile h2{
  margin-top:15px;
  margin-bottom:0;
  font-size:22px;
  color:#303133;
}

.info-box{
  background:#f8f9fb;
  border-radius:12px;
  padding:18px;
  text-align:center;
}

.label{
  color:#909399;
  font-size:13px;
}

.value{
  margin-top:10px;
  font-size:24px;
  font-weight:bold;
  color:#303133;
}

.summary{
  margin-top:25px;
  display:flex;
  justify-content:space-around;
  text-align:center;
}

.summary div{
  font-size:15px;
}

/* ==========================
   TAHUN
========================== */

.tahun-card{
  border-radius:16px;
}

.tahun-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.tahun-header h3{
  margin:0;
}

/* ==========================
   GRID BULAN
========================== */

.bulan-grid{
  margin-top:0;
}

.bulan-card{

  cursor:pointer;

  transition:.25s;

  border-radius:14px;

  min-height:170px;

}

.bulan-card:hover{

  transform:translateY(-4px);

  box-shadow:
    0 12px 24px
    rgba(0,0,0,.08);

}

.bulan-card.active{

  border:2px solid
  #409EFF;

}

.bulan-title{

  font-weight:bold;

  font-size:18px;

  color:#303133;

}

.bulan-nominal{

  margin-top:12px;

  margin-bottom:15px;

  font-size:17px;

  color:#606266;

}

.bulan-status{

  margin-bottom:15px;

}

.bulan-action{

  margin-top:10px;

}

/* ==========================
   DETAIL
========================== */

.detail-card{

  border-radius:16px;

}

.detail-header{

  display:flex;

  justify-content:space-between;

  align-items:center;

  margin-bottom:20px;

}

.detail-header h3{

  margin:0;

}

/* ==========================
   BUTTON
========================== */

.el-button{

  border-radius:10px;

}

.el-button--primary,

.el-button--success,

.el-button--warning{

  font-weight:600;

}

/* ==========================
   AVATAR
========================== */

.el-avatar{

  border:3px solid
  #ebeef5;

}

/* ==========================
   TAG
========================== */

.el-tag{

  border-radius:20px;

  padding:0 14px;

}

/* ==========================
   CARD HOVER
========================== */

:deep(.el-card){

  transition:.25s;

}

:deep(.el-card:hover){

  box-shadow:

    0 10px 22px

    rgba(0,0,0,.08);

}

/* ==========================
   PROGRESS
========================== */

:deep(.el-progress-bar__outer){

  border-radius:20px;

  height:18px;

}

:deep(.el-progress-bar__inner){

  border-radius:20px;

}

/* ==========================
   RESPONSIVE
========================== */

@media(max-width:992px){

.summary{

flex-direction:column;

gap:10px;

}

.tahun-header{

flex-direction:column;

align-items:flex-start;

gap:15px;

}

.detail-header{

flex-direction:column;

align-items:flex-start;

gap:10px;

}

}

@media(max-width:768px){

.profile h2{

font-size:20px;

}

.value{

font-size:20px;

}

.bulan-card{

min-height:auto;

}

.bulan-title{

font-size:16px;

}

}

</style>