<template>
  <div>

    <el-page-header
      content="Kelola Penarikan"
    />

    <div class="stats-grid">

      <el-card>
        <div class="stat-card">
          <h4>Total Pengajuan</h4>
          <h2>{{ penarikanList.length }}</h2>
        </div>
      </el-card>

      <el-card>
        <div class="stat-card">
          <h4>Pending</h4>
          <h2>
            {{ pendingCount }}
          </h2>
        </div>
      </el-card>

      <el-card>
        <div class="stat-card">
          <h4>Approved</h4>
          <h2>
            {{ approvedCount }}
          </h2>
        </div>
      </el-card>

      <el-card>
        <div class="stat-card">
          <h4>Rejected</h4>
          <h2>
            {{ rejectedCount }}
          </h2>
        </div>
      </el-card>

    </div>

    <el-card>

      <el-table
        :data="penarikanList"
        v-loading="loading"
        stripe
      >

        <el-table-column
          label="Nama Anggota"
        >
          <template #default="scope">
            {{ scope.row.users?.nama || "-" }}
          </template>
        </el-table-column>

        <el-table-column
          prop="nominal"
          label="Nominal"
        >
          <template #default="scope">
            Rp
            {{ formatRupiah(scope.row.nominal) }}
          </template>
        </el-table-column>

        <el-table-column
          prop="keterangan"
          label="Keterangan"
        />

        <el-table-column
          prop="tanggal"
          label="Tanggal"
        />

        <el-table-column
          label="Status"
          width="140"
        >
          <template #default="scope">

            <el-tag
              v-if="
                scope.row.status ===
                'pending'
              "
              type="warning"
            >
              Pending
            </el-tag>

            <el-tag
              v-if="
                scope.row.status ===
                'approved'
              "
              type="success"
            >
              Approved
            </el-tag>

            <el-tag
              v-if="
                scope.row.status ===
                'rejected'
              "
              type="danger"
            >
              Rejected
            </el-tag>

          </template>
        </el-table-column>

        <el-table-column
          label="Aksi"
          width="220"
        >
          <template #default="scope">

            <div
              v-if="
                scope.row.status ===
                'pending'
              "
            >

              <el-button
                size="small"
                type="success"
                @click="
                  approvePenarikan(
                    scope.row.id
                  )
                "
              >
                Approve
              </el-button>

              <el-button
                size="small"
                type="danger"
                @click="
                  rejectPenarikan(
                    scope.row.id
                  )
                "
              >
                Reject
              </el-button>

            </div>

            <span v-else>
              -
            </span>

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
  onMounted,
} from "vue";

import api from "../api/axios";

import { ElMessage } from "element-plus";

const loading = ref(false);

const penarikanList = ref([]);

const loadPenarikan =
async () => {

  try {

    loading.value = true;

    const response =
      await api.get(
        "/penarikan"
      );

    console.log(response.data);

    penarikanList.value =
      response.data.data;

  } catch (error) {

    ElMessage.error(
      "Gagal memuat data"
    );

  } finally {

    loading.value = false;

  }

};

const approvePenarikan =
async (id) => {

  try {

    await api.put(
      `/penarikan/${id}/approve`
    );

    ElMessage.success(
      "Penarikan disetujui"
    );

    loadPenarikan();

  } catch (error) {

    ElMessage.error(
      "Gagal approve"
    );

  }

};

const rejectPenarikan =
async (id) => {

  try {

    await api.put(
      `/penarikan/${id}/reject`
    );

    ElMessage.success(
      "Penarikan ditolak"
    );

    loadPenarikan();

  } catch (error) {

    ElMessage.error(
      "Gagal reject"
    );

  }

};

const formatRupiah =
(value) => {

  return new Intl.NumberFormat(
    "id-ID"
  ).format(value || 0);

};

const pendingCount =
computed(() =>
  penarikanList.value.filter(
    (i) =>
      i.status === "pending"
  ).length
);

const approvedCount =
computed(() =>
  penarikanList.value.filter(
    (i) =>
      i.status === "approved"
  ).length
);

const rejectedCount =
computed(() =>
  penarikanList.value.filter(
    (i) =>
      i.status === "rejected"
  ).length
);

onMounted(() => {
  loadPenarikan();
});
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.stat-card {
  text-align: center;
}

.stat-card h4 {
  margin: 0;
  color: #888;
}

.stat-card h2 {
  margin-top: 10px;
  color: #AF101A;
}
</style>