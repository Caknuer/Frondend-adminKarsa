<template>

  <div>

    <div
      style="
      display:flex;
      justify-content:space-between;
      margin-bottom:20px;
      "
    >

      <h2>Berita</h2>

      <el-button
        type="primary"
        @click="openCreate"
      >
        Tambah Berita
      </el-button>

    </div>

    <el-table
      :data="berita"
      v-loading="loading"
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
        label="Status"
      >

        <template #default="scope">

          <el-tag
            type="success"
            v-if="scope.row.is_active"
          >
            Aktif
          </el-tag>

          <el-tag
            type="danger"
            v-else
          >
            Nonaktif
          </el-tag>

        </template>

      </el-table-column>

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
      title="Berita"
      width="600"
    >

      <el-form>

        <el-form-item
          label="Judul"
        >
          <el-input
            v-model="form.judul"
          />
        </el-form-item>

        <el-form-item
          label="Konten"
        >
          <el-input
            type="textarea"
            rows="5"
            v-model="form.konten"
          />
        </el-form-item>

        <el-form-item
          label="Penulis"
        >
          <el-input
            v-model="form.penulis"
          />
        </el-form-item>

        <el-form-item
          label="Status"
        >

          <el-switch
            v-model="form.is_active"
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

const berita = ref([]);
const loading = ref(false);

const dialogVisible = ref(false);

const form = ref({});

const loadData = async () => {

  loading.value = true;

  try {

    const response =
      await api.get("/news");

    berita.value =
      response.data.data;

  } finally {

    loading.value = false;

  }

};

const openCreate = () => {

  form.value = {
    is_active: true,
  };

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
        `/news/${form.value.id}`,
        form.value
      );

    } else {

      await api.post(
        "/news",
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
      `/news/${id}`
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