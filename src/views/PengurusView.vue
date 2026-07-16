<template>

  <div>

<div
  style="
  display:flex;
  justify-content:space-between;
  margin-bottom:20px;
  "
>

  <h2>Pengurus</h2>

  <el-button
    type="primary"
    @click="openCreate"
  >
    Tambah Pengurus
  </el-button>

</div>

<el-table
  :data="pengurus"
  v-loading="loading"
>

  <el-table-column
    label="Foto"
    width="100"
  >

    <template #default="scope">

      <el-avatar
        :size="50"
        :src="scope.row.foto_url"
      />

    </template>

  </el-table-column>

  <el-table-column
    prop="nama"
    label="Nama"
  />

  <el-table-column
    prop="jabatan"
    label="Jabatan"
  />

  <el-table-column
    prop="no_hp"
    label="No HP"
  />

  <el-table-column
    prop="email"
    label="Email"
  />

  <el-table-column
    prop="urutan"
    label="Urutan"
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
    width="180"
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
  title="Data Pengurus"
  width="600"
>

  <el-form>

    <el-form-item label="Nama">
      <el-input
        v-model="form.nama"
      />
    </el-form-item>

    <el-form-item label="Jabatan">
      <el-input
        v-model="form.jabatan"
      />
    </el-form-item>

    <el-form-item label="No HP">
      <el-input
        v-model="form.no_hp"
      />
    </el-form-item>

    <el-form-item label="Email">
      <el-input
        v-model="form.email"
      />
    </el-form-item>

    <el-form-item label="Urutan">
      <el-input-number
        v-model="form.urutan"
      />
    </el-form-item>

    <el-form-item label="Foto">

      <input
        type="file"
        @change="uploadFoto"
      />

    </el-form-item>

    <el-form-item
      v-if="form.foto_url"
    >

      <img
        :src="form.foto_url"
        width="120"
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

const pengurus = ref([]);
const loading = ref(false);

const dialogVisible = ref(false);

const form = ref({});

const loadData = async () => {

  loading.value = true;

  try {

    const response =
      await api.get("/managements");

    pengurus.value =
      response.data.data;

  } finally {

    loading.value = false;

  }

};

const openCreate = () => {

  form.value = {
    is_active: true,
    urutan: 1,
  };

  dialogVisible.value = true;

};

const editData = (row) => {

  form.value = {
    ...row
  };

  dialogVisible.value = true;

};

const uploadFoto = async (event) => {

  try {

    const file =
      event.target.files[0];

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/upload/image",
        formData,
        {
          headers: {
            "Content-Type":
            "multipart/form-data"
          }
        }
      );

    form.value.foto_url =
      response.data.url;

    ElMessage.success(
      "Upload berhasil"
    );

  } catch {

    ElMessage.error(
      "Upload gagal"
    );

  }

};

const simpan = async () => {

  try {

    if (form.value.id) {

      await api.put(
        `/managements/${form.value.id}`,
        form.value
      );

    } else {

      await api.post(
        "/managements",
        form.value
      );

    }

    ElMessage.success(
      "Data berhasil disimpan"
    );

    dialogVisible.value = false;

    loadData();

  } catch {

    ElMessage.error(
      "Gagal menyimpan"
    );

  }

};

const hapus = async (id) => {

  try {

    await api.delete(
      `/managements/${id}`
    );

    ElMessage.success(
      "Data berhasil dihapus"
    );

    loadData();

  } catch {

    ElMessage.error(
      "Gagal menghapus"
    );

  }

};

onMounted(() => {
  loadData();
});

</script>
