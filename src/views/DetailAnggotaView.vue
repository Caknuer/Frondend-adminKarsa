<template>

  <div>

    <el-page-header
      @back="$router.back()"
      content="Detail Anggota"
    />

    <div class="action-bar">

        <el-button
            type="primary"
            @click="dialogEdit = true"
        >
            Edit Data
        </el-button>

        <el-button
            type="danger"
            @click="hapusAnggota"
        >
            Nonaktifkan Anggota
        </el-button>

    </div>

    <el-row
      :gutter="20"
      style="margin-top:20px"
    >

      <!-- FOTO -->

      <el-col
        :xs="24"
        :md="8"
      >

        <el-card>

          <div class="photo-section">

            <h3>Foto Profil</h3>

            <el-image
              :src="
                anggota.foto_profile_url
              "
              fit="cover"
              class="profile-photo"
            />

            <h3
              style="
                margin-top:20px
              "
            >
              Foto KTP
            </h3>

            <el-image
              :src="
                anggota.foto_ktp_url
              "
              fit="contain"
              class="ktp-photo"
              :preview-src-list="[
                anggota.foto_ktp_url
              ]"
            />

          </div>

        </el-card>

      </el-col>

      <!-- DATA -->

      <el-col
        :xs="24"
        :md="16"
      >

        <el-card>

          <el-descriptions
            :column="1"
            border
          >

            <el-descriptions-item
              label="Nama"
            >
              {{ anggota.nama }}
            </el-descriptions-item>

            <el-descriptions-item
              label="NIK"
            >
              {{ anggota.nik }}
            </el-descriptions-item>

            <el-descriptions-item
              label="Email"
            >
              {{ anggota.email }}
            </el-descriptions-item>

            <el-descriptions-item
              label="No HP"
            >
              {{ anggota.no_hp }}
            </el-descriptions-item>

            <el-descriptions-item
                label="Alamat"
            >
                {{ anggota.alamat }}
            </el-descriptions-item>

            <el-descriptions-item
                label="Jenis Kelamin"
            >
                {{ anggota.jenis_kelamin || "-" }}
            </el-descriptions-item>

            <el-descriptions-item
                label="Tempat Lahir"
            >
                {{ anggota.tempat_lahir || "-" }}
            </el-descriptions-item>

            <el-descriptions-item
                label="Tanggal Lahir"
            >
                {{ anggota.tanggal_lahir || "-" }}
            </el-descriptions-item>

            <el-descriptions-item
                label="Pekerjaan"
            >
                {{ anggota.pekerjaan || "-" }}
            </el-descriptions-item>

            <el-descriptions-item
                label="Tipe Keanggotaan"
            >
              {{ anggota.tipe_keanggotaan }}
            </el-descriptions-item>

            <el-descriptions-item
              label="Role"
            >
              <el-tag>
                {{ anggota.role }}
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item
              label="Status"
            >
              <el-tag
                :type="
                  anggota.status === 'approved'
                    ? 'success'
                    : anggota.status === 'pending'
                    ? 'warning'
                    : 'danger'
                "
              >
                {{ anggota.status }}
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item
              label="Firebase UID"
            >
              {{ anggota.firebase_uid }}
            </el-descriptions-item>

            <el-descriptions-item
              label="Tanggal Daftar"
            >
              {{ formatDate(
                anggota.created_at
              ) }}
            </el-descriptions-item>

            <el-descriptions-item
              label="Terakhir Update"
            >
              {{ formatDate(
                anggota.updated_at
              ) }}
            </el-descriptions-item>

          </el-descriptions>

        </el-card>

      </el-col>

    </el-row>

  </div>

  <el-dialog
    v-model="dialogEdit"
    title="Edit Data Anggota"
    width="600px"
    >

    <el-form
    label-position="top"
    >

    <el-form-item label="Nama">

    <el-input
        v-model="form.nama"
    />

    </el-form-item>

    <el-form-item label="No HP">

    <el-input
        v-model="form.no_hp"
    />

    </el-form-item>

    <el-form-item label="Alamat">

    <el-input
        type="textarea"
        v-model="form.alamat"
    />

    </el-form-item>

    <el-form-item
    label="Jenis Kelamin"
    >
    <el-select
        v-model="form.jenis_kelamin"
        style="width:100%"
    >
        <el-option
        label="Laki-laki"
        value="Laki-laki"
        />

        <el-option
        label="Perempuan"
        value="Perempuan"
        />
    </el-select>
    </el-form-item>

    <el-form-item
    label="Tempat Lahir"
    >
    <el-input
        v-model="form.tempat_lahir"
    />
    </el-form-item>

    <el-form-item
    label="Tanggal Lahir"
    >
    <el-date-picker
        v-model="form.tanggal_lahir"
        type="date"
        style="width:100%"
        value-format="YYYY-MM-DD"
    />
    </el-form-item>

    <el-form-item
    label="Pekerjaan"
    >
    <el-input
        v-model="form.pekerjaan"
    />
    </el-form-item>

    <el-form-item
    label="Tipe Keanggotaan"
    >

    <el-input
        v-model="
        form.tipe_keanggotaan
        "
    />

    </el-form-item>

    <el-form-item label="Status">

    <el-select
        v-model="form.status"
        style="width:100%"
    >

        <el-option
        label="Pending"
        value="pending"
        />

        <el-option
        label="Approved"
        value="approved"
        />

        <el-option
        label="Rejected"
        value="rejected"
        />

    </el-select>

    </el-form-item>

    </el-form>

    <template #footer>

    <el-button
    @click="
        dialogEdit = false
    "
    >
    Batal
    </el-button>

    <el-button
    type="primary"
    @click="updateData"
    >
    Simpan
    </el-button>

    </template>

    </el-dialog>

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
  useRoute
} from "vue-router";

import api from "../api/axios";

const dialogEdit = ref(false);

const form = ref({
  nama: "",
  no_hp: "",
  alamat: "",

  jenis_kelamin: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  pekerjaan: "",

  tipe_keanggotaan: "",
  status: "",
});

const route = useRoute();

const anggota = ref({});

const formatDate = (date) => {

  if (!date) return "-";

  return new Date(date)
    .toLocaleString("id-ID");

};

const loadData = async () => {

  try {

    const response =
      await api.get(
        `/anggota/${route.params.id}`
      );

    anggota.value =
      response.data.data;

    form.value = {
    nama:
        response.data.data.nama,

    no_hp:
        response.data.data.no_hp,

    alamat:
        response.data.data.alamat,

    jenis_kelamin:
        response.data.data.jenis_kelamin,

    tempat_lahir:
        response.data.data.tempat_lahir,

    tanggal_lahir:
        response.data.data.tanggal_lahir,

    pekerjaan:
        response.data.data.pekerjaan,

    tipe_keanggotaan:
        response.data.data.tipe_keanggotaan,

    status:
        response.data.data.status,
    };

  } catch (error) {

    console.error(error);

  }

};

const updateData = async () => {

    try {

        await api.put(
        `/anggota/${route.params.id}`,
        form.value
        );

        ElMessage.success(
        "Data berhasil diperbarui"
        );

        dialogEdit.value = false;

        loadData();

    } catch (error) {

        console.error(error);

        ElMessage.error(
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui data"
        );

    }
};

const hapusAnggota = async () => {

    try {

        await ElMessageBox.confirm(
        "Yakin ingin menonaktifkan anggota ini?",
        "Konfirmasi",
        {
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
            type: "warning",
        }
        );

        await api.patch(
        `/anggota/${route.params.id}/delete`
        );

        ElMessage.success(
        "Anggota berhasil dinonaktifkan"
        );

        loadData();

    } catch (error) {

        if (error !== "cancel") {

        console.error(error);

        ElMessage.error(
            "Gagal menonaktifkan anggota"
        );

        }
    }
};

onMounted(() => {

  loadData();

});

</script>

<style scoped>

.photo-section {
  text-align: center;
}

.profile-photo {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}

.ktp-photo {
  width: 100%;
  margin-top: 10px;
}

.action-bar {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

@media (max-width: 768px) {

  .action-bar {
    flex-direction: column;
  }

  .profile-photo {
    width: 140px;
    height: 140px;
  }

}

</style>