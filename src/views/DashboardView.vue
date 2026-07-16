<template>

  <div class="dashboard-header">
  <div>

    <h2>Dashboard</h2>
    <p>
    Selamat datang di Admin Panel Karsa
    </p>

    <el-row :gutter="20">

  <el-col :xs="24" :sm="12" :lg="6">

  <el-card class="stat-card anggota">

    <div class="stat-title">
      Total Anggota
    </div>

    <div class="stat-value">
      {{ dashboard.total_anggota || 0 }}
    </div>

  </el-card>
    </el-col>

    <el-col :xs="24" :sm="12" :lg="6">

  <el-card class="stat-card simpanan">

    <div class="stat-title">
      Total Simpanan
    </div>

    <div class="stat-value">
      Rp {{ rupiah(dashboard.total_simpanan) }}
    </div>

  </el-card>

    </el-col>

    <el-col :xs="24" :sm="12" :lg="6">

  <el-card class="stat-card penarikan">

    <div class="stat-title">
      Total Penarikan
    </div>

    <div class="stat-value">
      Rp {{ rupiah(dashboard.total_penarikan) }}
    </div>

  </el-card>

    </el-col>

    <el-col :xs="24" :sm="12" :lg="6">

  <el-card class="stat-card pending">

    <div class="stat-title">
      Pending Penarikan
    </div>

    <div class="stat-value">
      {{ dashboard.penarikan_pending || 0 }}
    </div>

  </el-card>

    </el-col>

  </el-row>


    <el-card
      class="news-card"
      shadow="hover"
    >

      <template #header>

        <strong>
          Berita Terbaru
        </strong>

      </template>

      <el-table
        :data="dashboard.berita_terbaru || []"
      >

        <el-table-column
          prop="judul"
          label="Judul"
        />

        <el-table-column
          prop="penulis"
          label="Penulis"
        />

        <el-table-column
          label="Tanggal"
        >
          <template #default="scope">
            {{ formatDate(scope.row.created_at) }}
          </template>
        </el-table-column>

      </el-table>

    </el-card>

  </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";

const dashboard = ref({});

const formatDate = (date) => {
  return new Date(date)
    .toLocaleDateString("id-ID");
};

const loadDashboard = async () => {

  try {

    const response =
      await api.get("/dashboard");

    dashboard.value =
      response.data.data;

  } catch (error) {

    console.error(error);

  }

};

const rupiah = (value) => {

  return Number(
    value || 0
  ).toLocaleString("id-ID");

};

onMounted(() => {
  loadDashboard();
});
</script>

<style scoped>

.dashboard-header {
margin-bottom: 24px;
}

.dashboard-header h2 {
margin: 0;
color: #1f2937;
}

.dashboard-header p {
margin-top: 6px;
color: #6b7280;
}

.stat-card {
border: none;
border-radius: 16px;
margin-bottom: 20px;
}

.stat-title {
font-size: 14px;
color: rgba(255,255,255,.8);
}

.stat-value {
margin-top: 10px;
font-size: 28px;
font-weight: bold;
color: white;
}

.anggota {
background: linear-gradient(
135deg,
#2563eb,
#1d4ed8
);
}

.simpanan {
background: linear-gradient(
135deg,
#16a34a,
#15803d
);
}

.penarikan {
background: linear-gradient(
135deg,
#dc2626,
#b91c1c
);
}

.pending {
background: linear-gradient(
135deg,
#d97706,
#b45309
);
}

.news-card {
margin-top: 30px;
border-radius: 16px;
}

@media (max-width: 768px) {

.stat-value {
font-size: 22px;
}

}

.card-title {
  color: #666;
  font-size: 14px;
}

.card-value {
  margin-top: 10px;
  font-size: 28px;
  font-weight: bold;
  color: #b91c1c;
}

</style>