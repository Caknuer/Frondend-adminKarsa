<template>
  <div>

<div
  style="
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
"
>
  <h2>Kelola Admin</h2>

  <el-button
    type="primary"
    @click="dialogVisible = true"
  >
    Tambah Admin
  </el-button>
</div>

<el-card>

  <el-table
    :data="admins"
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
      label="Role"
    >
      <template #default="scope">

        <el-tag
          :type="
            scope.row.role === 'super_admin'
              ? 'danger'
              : 'primary'
          "
        >
          {{ scope.row.role }}
        </el-tag>

      </template>
    </el-table-column>

    <el-table-column
      label="Status"
    >
      <template #default="scope">

        <el-tag
          :type="
            scope.row.is_active
              ? 'success'
              : 'info'
          "
        >
          {{
            scope.row.is_active
              ? 'Aktif'
              : 'Nonaktif'
          }}
        </el-tag>

      </template>
    </el-table-column>

    <el-table-column
      label="Aksi"
      width="180"
    >
      <template #default="scope">

        <el-tooltip
          content="Edit Admin"
          placement="top"
        >
          <el-button
            size="small"
            type="primary"
            :icon="Edit"
            circle
            @click="openEdit(scope.row)"
          />
        </el-tooltip>

        <el-tooltip
          :content="
            scope.row.is_active
              ? 'Nonaktifkan'
              : 'Aktifkan'
          "
          placement="top"
        >
          <el-button
            size="small"
            :type="
              scope.row.is_active
                ? 'warning'
                : 'success'
            "
            :icon="SwitchButton"
            circle
            @click="toggleStatus(scope.row)"
          />
        </el-tooltip>

        <el-tooltip
          content="Hapus Admin"
          placement="top"
        >
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            circle
            @click="deleteAdmin(scope.row)"
          />
        </el-tooltip>

      </template>
    </el-table-column>

  </el-table>

</el-card>

<!-- TAMBAH ADMIN -->

<el-dialog
  v-model="dialogVisible"
  title="Tambah Admin"
  width="500px"
>

  <el-form>

    <el-form-item label="Nama">
      <el-input
        v-model="form.nama"
      />
    </el-form-item>

    <el-form-item label="Email">
      <el-input
        v-model="form.email"
      />
    </el-form-item>

    <el-form-item label="Password">
      <el-input
        v-model="form.password"
        show-password
      />
    </el-form-item>

    <el-form-item label="Role">
      <el-select
        v-model="form.role"
        style="width:100%"
      >

        <el-option
          label="Admin"
          value="admin"
        />

        <el-option
          label="Super Admin"
          value="super_admin"
        />

      </el-select>
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
      @click="createAdmin"
    >
      Simpan
    </el-button>

  </template>

</el-dialog>

<!-- EDIT ADMIN -->

<el-dialog
  v-model="editDialog"
  title="Edit Admin"
  width="500px"
>

  <el-form>

    <el-form-item label="Nama">
      <el-input
        v-model="selectedAdmin.nama"
      />
    </el-form-item>

    <el-form-item label="Email">
      <el-input
        v-model="selectedAdmin.email"
      />
    </el-form-item>

    <el-form-item label="Role">
      <el-select
        v-model="selectedAdmin.role"
        style="width:100%"
      >

        <el-option
          label="Admin"
          value="admin"
        />

        <el-option
          label="Super Admin"
          value="super_admin"
        />

      </el-select>
    </el-form-item>

  </el-form>

  <template #footer>

    <el-button
      @click="editDialog=false"
    >
      Batal
    </el-button>

    <el-button
      type="primary"
      @click="updateAdmin"
    >
      Simpan Perubahan
    </el-button>

  </template>

</el-dialog>

  </div>
</template>

<script setup>
import {
  ref,
  onMounted
} from "vue";

import {
  ElMessage,
  ElMessageBox
} from "element-plus";

import {
  Edit,
  Delete,
  SwitchButton
} from "@element-plus/icons-vue";

import api from "../api/axios";

const admins = ref([]);
const loading = ref(false);

const dialogVisible = ref(false);
const editDialog = ref(false);

const form = ref({
  nama: "",
  email: "",
  password: "",
  role: "admin",
});

const selectedAdmin = ref({
  id: "",
  nama: "",
  email: "",
  role: "",
});

const loadAdmins = async () => {

  loading.value = true;

  try {

    const response =
      await api.get(
        "/roleadmin"
      );

    admins.value =
      response.data.data;

  } catch (error) {

    ElMessage.error(
      "Gagal memuat data admin"
    );

  }

  loading.value = false;

};

const createAdmin = async () => {

  try {

    await api.post(
      "/roleadmin",
      form.value
    );

    ElMessage.success(
      "Admin berhasil dibuat"
    );

    dialogVisible.value = false;

    form.value = {
      nama: "",
      email: "",
      password: "",
      role: "admin",
    };

    loadAdmins();

  } catch (error) {

    ElMessage.error(
      error.response?.data?.message ||
      "Gagal membuat admin"
    );

  }

};

const openEdit = (admin) => {

  selectedAdmin.value = {
    id: admin.id,
    nama: admin.nama,
    email: admin.email,
    role: admin.role,
  };

  editDialog.value = true;

};

const updateAdmin = async () => {

  try {

    await api.put(
      `/roleadmin/${selectedAdmin.value.id}`,
      {
        nama:
          selectedAdmin.value.nama,
        email:
          selectedAdmin.value.email,
        role:
          selectedAdmin.value.role,
      }
    );

    ElMessage.success(
      "Admin berhasil diperbarui"
    );

    editDialog.value = false;

    loadAdmins();

  } catch (error) {

    ElMessage.error(
      error.response?.data?.message ||
      "Gagal memperbarui admin"
    );

  }

};

const toggleStatus = async (
  admin
) => {

  try {

    await api.patch(
      `/roleadmin/${admin.id}/status`,
      {
        is_active:
          !admin.is_active,
      }
    );

    ElMessage.success(
      "Status admin diperbarui"
    );

    loadAdmins();

  } catch (error) {

    ElMessage.error(
      error.response?.data?.message ||
      "Gagal mengubah status"
    );

  }

};

const deleteAdmin = async (
  admin
) => {

  try {

    await ElMessageBox.confirm(
      `Hapus admin ${admin.nama}?`,
      "Konfirmasi",
      {
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        type: "warning",
      }
    );

    await api.delete(
      `/roleadmin/${admin.id}`
    );

    ElMessage.success(
      "Admin berhasil dihapus"
    );

    loadAdmins();

  } catch (error) {

    if (error !== "cancel") {

      ElMessage.error(
        error.response?.data?.message ||
        "Gagal menghapus admin"
      );

    }

  }

};

onMounted(() => {
  loadAdmins();
});
</script>
