<template>

  <div>

    <div
      style="
      display:flex;
      justify-content:space-between;
      margin-bottom:20px;
      "
    >

      <h2>Simpanan</h2>

      <el-button
        type="primary"
        @click="openCreate"
      >
        Tambah Simpanan
      </el-button>

    </div>

    <el-table
      :data="simpanan"
      v-loading="loading"
    >

      <el-table-column
        label="Nama"
      >

        <template #default="scope">
          {{ scope.row.users?.nama }}
        </template>

      </el-table-column>

      <el-table-column
        prop="jenis_simpanan"
        label="Jenis"
      />

      <el-table-column
        prop="nominal"
        label="Nominal"
      />

      <el-table-column
        prop="tanggal"
        label="Tanggal"
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
            size="small"
            @click="editData(scope.row)"
          >
            Edit
          </el-button>

          <el-button
            size="small"
            type="danger"
            @click="hapus(scope.row.id)"
          >
            Hapus
          </el-button>

        </template>

      </el-table-column>

    </el-table>

    <el-dialog
      v-model="dialogVisible"
      width="500"
      title="Data Simpanan"
    >

      <el-form>

        <el-form-item
          label="User ID"
        >
          <el-input
            v-model="form.user_id"
          />
        </el-form-item>

        <el-form-item
          label="Jenis Simpanan"
        >
          <el-input
            v-model="form.jenis_simpanan"
          />
        </el-form-item>

        <el-form-item
          label="Nominal"
        >
          <el-input
            v-model="form.nominal"
          />
        </el-form-item>

        <el-form-item
          label="Keterangan"
        >
          <el-input
            v-model="form.keterangan"
          />
        </el-form-item>

      </el-form>

      <template #footer>

        <el-button
          @click="dialogVisible=false"
        >
          Batal
        </el-button>

        <el-button
          type="primary"
          @click="simpan"
        >
          Simpan
        </el-button>

      </template>

    </el-dialog>

  </div>

</template>

<script setup>

import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import api from "../api/axios";

const simpanan = ref([]);
const loading = ref(false);

const dialogVisible = ref(false);

const form = ref({});

const loadData = async () => {

  loading.value = true;

  try {

    const response =
      await api.get("/simpanan");

    simpanan.value =
      response.data.data;

  } finally {

    loading.value = false;

  }

};

const openCreate = () => {

  form.value = {};

  dialogVisible.value = true;

};

const editData = (row) => {

  form.value = {
    ...row
  };

  dialogVisible.value = true;

};

const simpan = async () => {

  try {

    if (form.value.id) {

      await api.put(
        `/simpanan/${form.value.id}`,
        form.value
      );

    } else {

      await api.post(
        "/simpanan",
        form.value
      );

    }

    ElMessage.success(
      "Berhasil disimpan"
    );

    dialogVisible.value = false;

    loadData();

  } catch (error) {

    ElMessage.error(
      "Gagal menyimpan"
    );

  }

};

const hapus = async (id) => {

  try {

    await api.delete(
      `/simpanan/${id}`
    );

    ElMessage.success(
      "Berhasil dihapus"
    );

    loadData();

  } catch (error) {

    ElMessage.error(
      "Gagal menghapus"
    );

  }

};

onMounted(() => {
  loadData();
});

</script>