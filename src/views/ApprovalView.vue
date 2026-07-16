<template>

  <div>

    <h2>Approval Anggota</h2>

    <el-table
      :data="anggota"
      style="width:100%"
      v-loading="loading"
    >

      <el-table-column
        prop="nama"
        label="Nama"
      />

      <el-table-column
        prop="email"
        label="Email"
      />

      <el-table-column
        prop="status"
        label="Status"
      />

      <el-table-column
        label="Aksi"
      >

        <template #default="scope">

          <el-button
            type="success"
            @click="approve(scope.row.id)"
          >
            Approve
          </el-button>

          <el-button
            type="danger"
            @click="reject(scope.row.id)"
          >
            Reject
          </el-button>

        </template>

      </el-table-column>

    </el-table>

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import api from "../api/axios";

const anggota = ref([]);
const loading = ref(false);

const loadData = async () => {

  try {

    loading.value = true;

    const response =
      await api.get("/anggota/pending");

    anggota.value =
      response.data.data;

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;

  }

};

const approve = async (id) => {

  try {

    await api.put(
      `/anggota/${id}/approve`
    );

    ElMessage.success(
      "Anggota disetujui"
    );

    loadData();

  } catch (error) {

    ElMessage.error(
      "Gagal approve"
    );

  }

};

const reject = async (id) => {

  try {

    await api.put(
      `/anggota/${id}/reject`
    );

    ElMessage.success(
      "Anggota ditolak"
    );

    loadData();

  } catch (error) {

    ElMessage.error(
      "Gagal reject"
    );

  }

};

onMounted(() => {
  loadData();
});
</script>