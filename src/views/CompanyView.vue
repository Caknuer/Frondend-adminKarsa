<template>

  <div class="company-page">

    <!-- HEADER -->
    <el-page-header
      content="Profil Koperasi"
    />

    <p class="page-description">
      Kelola informasi utama koperasi yang akan ditampilkan
      pada aplikasi anggota dan website admin.
    </p>

    <!-- INFORMASI UMUM -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <template #header>

        <div class="section-title">

          <el-icon>
            <OfficeBuilding />
          </el-icon>

          <span>Informasi Umum</span>

        </div>

      </template>

      <el-form
        :model="form"
        label-position="top"
      >

        <el-row :gutter="20">

          <el-col :span="24">

            <el-form-item
              label="Nama Koperasi"
            >
              <el-input
                v-model="form.nama_koperasi"
                placeholder="Masukkan nama koperasi"
                clearable
              />
            </el-form-item>

          </el-col>

          <el-col :span="24">

            <el-form-item
              label="Deskripsi"
            >

              <el-input
                v-model="form.deskripsi"
                type="textarea"
                :rows="5"
                resize="none"
                placeholder="Masukkan deskripsi koperasi..."
              />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

    </el-card>
    <!-- VISI & MISI -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <template #header>

        <div class="section-title">

          <el-icon>
            <Opportunity />
          </el-icon>

          <span>
            Visi & Misi
          </span>

        </div>

      </template>

      <el-form
        :model="form"
        label-position="top"
      >

        <el-row :gutter="20">

          <!-- VISI -->
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
          >

            <el-form-item
              label="Visi"
            >

              <el-input
                v-model="form.visi"
                type="textarea"
                :rows="6"
                resize="none"
                placeholder="Masukkan visi koperasi"
              />

            </el-form-item>

          </el-col>

          <!-- MISI -->
          <el-col
            :xs="24"
            :sm="24"
            :md="12"
          >

            <el-form-item
              label="Misi"
            >

              <el-input
                v-model="form.misi"
                type="textarea"
                :rows="6"
                resize="none"
                placeholder="Masukkan misi koperasi"
              />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

    </el-card>
    <!-- KONTAK KOPERASI -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <template #header>

        <div class="section-title">

          <el-icon>
            <Location />
          </el-icon>

          <span>
            Kontak Koperasi
          </span>

        </div>

      </template>

      <el-form
        :model="form"
        label-position="top"
      >

        <el-row :gutter="20">

          <!-- ALAMAT -->
          <el-col :span="24">

            <el-form-item
              label="Alamat"
            >

              <el-input
                v-model="form.alamat"
                type="textarea"
                :rows="3"
                resize="none"
                placeholder="Masukkan alamat koperasi"
              />

            </el-form-item>

          </el-col>

          <!-- TELEPON -->
          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Nomor Telepon"
            >

              <el-input
                v-model="form.telepon"
                placeholder="08xxxxxxxxxx"
              >

                <template #prefix>

                  <el-icon>
                    <Phone />
                  </el-icon>

                </template>

              </el-input>

            </el-form-item>

          </el-col>

          <!-- EMAIL -->
          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Email"
            >

              <el-input
                v-model="form.email"
                placeholder="koperasi@email.com"
              >

                <template #prefix>

                  <el-icon>
                    <Message />
                  </el-icon>

                </template>

              </el-input>

            </el-form-item>

          </el-col>

          <!-- WEBSITE -->
          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Website"
            >

              <el-input
                v-model="form.website"
                placeholder="https://..."
              >

                <template #prefix>

                  <el-icon>
                    <Link />
                  </el-icon>

                </template>

              </el-input>

            </el-form-item>

          </el-col>

          <!-- JAM -->
          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Jam Operasional"
            >

              <el-input
                v-model="form.jam_operasional"
                placeholder="Senin - Jumat 08.00 - 16.00"
              >

                <template #prefix>

                  <el-icon>
                    <Clock />
                  </el-icon>

                </template>

              </el-input>

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

    </el-card>
    <!-- LOGO KOPERASI -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <template #header>

        <div class="section-title">

          <el-icon>
            <Picture />
          </el-icon>

          <span>
            Logo Koperasi
          </span>

        </div>

      </template>

      <el-row
        :gutter="30"
        align="middle"
      >

        <!-- PREVIEW -->
        <el-col
          :xs="24"
          :md="10"
        >

          <div class="logo-preview">

            <img
              v-if="form.logo_url"
              :src="form.logo_url"
              class="logo-image"
            />

            <div
              v-else
              class="logo-placeholder"
            >

              <el-icon
                :size="60"
              >
                <Picture />
              </el-icon>

              <p>
                Belum ada logo
              </p>

            </div>

          </div>

        </el-col>

        <!-- UPLOAD -->
        <el-col
          :xs="24"
          :md="14"
        >

          <el-upload
            :show-file-list="false"
            :http-request="uploadLogo"
          >

            <el-button
              type="primary"
            >
              Upload Logo
            </el-button>

          </el-upload>

          <p class="upload-info">

            Format yang didukung :
            JPG, PNG, WEBP

          </p>

          <p class="upload-info">

            Ukuran maksimal :
            2 MB

          </p>

        </el-col>

      </el-row>

    </el-card>
    <!-- TOMBOL AKSI -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <div class="action-container">

        <el-button
          size="large"
          @click="resetForm"
        >
          Reset
        </el-button>

        <el-button
          type="primary"
          size="large"
          :loading="loadingSave"
          @click="simpan"
        >
          Simpan Perubahan
        </el-button>

      </div>

    </el-card>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
} from "vue";

import {
  OfficeBuilding,
  Opportunity,
  Location,
  Phone,
  Message,
  Link,
  Clock,
  Picture,
} from "@element-plus/icons-vue";

import api from "../api/axios";

import { ElMessage } from "element-plus";

const loading = ref(false);

const loadingSave = ref(false);

const form = ref({

  nama_koperasi: "",

  slogan: "",

  deskripsi: "",

  visi: "",

  misi: "",

  tahun_berdiri: "",

  alamat: "",

  telepon: "",

  email: "",

  website: "",

  jam_operasional: "",

  logo_url: "",

  banner_url: "",

  foto_kantor_url: "",

  latitude: "",

  longitude: "",

  maps_url: "",

});

const loadData = async () => {

  try {

    loading.value = true;

    const response =
      await api.get("/company");

    form.value =
      response.data.data;

  } catch (error) {

    ElMessage.error(
      "Gagal memuat profil koperasi"
    );

  } finally {

    loading.value = false;

  }

};

const simpan = async () => {

  if (!form.value.nama_koperasi) {

    ElMessage.warning(
      "Nama koperasi wajib diisi."
    );

    return;

  }

  if (!form.value.alamat) {

    ElMessage.warning(
      "Alamat wajib diisi."
    );

    return;

  }

  try {

    loadingSave.value = true;

    await api.put(
      "/company",
      form.value
    );

    ElMessage.success(
      "Profil koperasi berhasil diperbarui."
    );

    loadData();

  } catch (error) {

    ElMessage.error(
      error.response?.data?.message ||
      "Gagal menyimpan data."
    );

  } finally {

    loadingSave.value = false;

  }

};

const resetForm = () => {

  loadData();

};

const uploadLogo = async (options) => {

  try {

    const file =
      options.file;

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    form.value.logo_url =
      response.data.url;

    ElMessage.success(
      "Logo berhasil diupload."
    );

  } catch (error) {

    ElMessage.error(
      "Upload logo gagal."
    );

  }

};

onMounted(() => {

  loadData();

});
</script>

<style scoped>

.company-page {

  padding: 10px;

}

.page-description {

  margin: 12px 0 24px;

  color: #666;

  font-size: 14px;

  line-height: 1.7;

}

/* ===========================
   CARD
=========================== */

.section-card {

  margin-bottom: 24px;

  border-radius: 14px;

  border: 1px solid #ebeef5;

}

.section-title {

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 17px;

  font-weight: 600;

  color: #AF101A;

}

/* ===========================
   FORM
=========================== */

:deep(.el-form-item__label){

  font-weight: 600;

  color: #444;

}

:deep(.el-input__wrapper){

  border-radius: 10px;

}

:deep(.el-textarea__inner){

  border-radius: 10px;

}

:deep(.el-input__wrapper:hover){

  box-shadow: 0 0 0 1px #AF101A inset;

}

:deep(.el-textarea__inner:hover){

  box-shadow: 0 0 0 1px #AF101A inset;

}

/* ===========================
   LOGO
=========================== */

.logo-preview{

  width: 220px;

  height: 220px;

  margin: auto;

  border-radius: 16px;

  border: 2px dashed #dcdfe6;

  background: #fafafa;

  display: flex;

  justify-content: center;

  align-items: center;

  overflow: hidden;

}

.logo-image{

  width: 100%;

  height: 100%;

  object-fit: contain;

}

.logo-placeholder{

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  color: #999;

  text-align: center;

}

.logo-placeholder p{

  margin-top: 12px;

  font-size: 14px;

}

.upload-info{

  margin-top: 12px;

  color: #888;

  font-size: 13px;

  line-height: 1.7;

}

/* ===========================
   BUTTON
=========================== */

.action-container{

  display: flex;

  justify-content: flex-end;

  gap: 12px;

}

.action-container .el-button{

  min-width: 170px;

}

/* ===========================
   RESPONSIVE
=========================== */

@media (max-width:768px){

  .logo-preview{

    width: 180px;

    height: 180px;

    margin-bottom: 20px;

  }

  .action-container{

    flex-direction: column-reverse;

  }

  .action-container .el-button{

    width: 100%;

  }

}

</style>