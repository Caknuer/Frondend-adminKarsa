<template>

  <div class="legal-page">

    <!-- HEADER -->
    <el-page-header
      content="Legalitas Koperasi"
    />

    <p class="page-description">

      Kelola seluruh informasi legalitas koperasi
      yang akan ditampilkan pada aplikasi anggota.

    </p>

    <!-- INFORMASI LEGALITAS -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <template #header>

        <div class="section-title">

          <el-icon>

            <Document />

          </el-icon>

          <span>

            Informasi Legalitas

          </span>

        </div>

      </template>

      <el-form
        :model="form"
        label-position="top"
      >

        <el-row :gutter="20">

          <!-- AHU -->

          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Nomor AHU"
            >

              <el-input
                v-model="form.nomor_ahu"
                placeholder="Masukkan Nomor AHU"
              />

            </el-form-item>

          </el-col>

          <!-- NIK -->

          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Nomor NIK Koperasi"
            >

              <el-input
                v-model="form.nomor_nik"
                placeholder="Masukkan Nomor NIK"
              />

            </el-form-item>

          </el-col>

          <!-- NPWP -->

          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="NPWP"
            >

              <el-input
                v-model="form.npwp"
                placeholder="Masukkan NPWP"
              />

            </el-form-item>

          </el-col>

          <!-- TANGGAL BERDIRI -->

          <el-col
            :xs="24"
            :sm="12"
          >

            <el-form-item
              label="Tanggal Berdiri"
            >

              <el-date-picker

                v-model="form.tanggal_berdiri"

                type="date"

                style="width:100%"

                placeholder="Pilih tanggal"

              />

            </el-form-item>

          </el-col>

          <!-- STATUS -->

          <el-col
            :span="24"
          >

            <el-form-item
              label="Status Koperasi"
            >

              <el-switch

                v-model="form.is_active"

                active-text="Aktif"

                inactive-text="Tidak Aktif"

              />

            </el-form-item>

          </el-col>

        </el-row>

      </el-form>

    </el-card>
    <!-- DOKUMEN LEGALITAS -->
    <el-card
      shadow="never"
      class="section-card"
    >

      <template #header>

        <div class="section-title">

          <el-icon>
            <FolderOpened />
          </el-icon>

          <span>
            Dokumen Legalitas
          </span>

        </div>

      </template>

      <el-row :gutter="30">

        <!-- DOKUMEN AHU -->
        <el-col
          :xs="24"
          :md="12"
        >

          <div class="document-box">

            <h4>
              Dokumen AHU
            </h4>

            <el-upload
              :show-file-list="false"
              :http-request="uploadAhu"
            >

              <el-button
                type="primary"
              >
                Upload Dokumen AHU
              </el-button>

            </el-upload>

            <div
              v-if="form.dokumen_ahu_url"
              class="document-preview"
            >

              <el-tag
                type="success"
              >
                Dokumen tersedia
              </el-tag>

              <br><br>

              <el-button
                type="info"
                plain
                @click="
                  window.open(
                    form.dokumen_ahu_url,
                    '_blank'
                  )
                "
              >
                Lihat Dokumen
              </el-button>

            </div>

            <div
              v-else
              class="document-empty"
            >

              Belum ada dokumen AHU

            </div>

          </div>

        </el-col>

        <!-- DOKUMEN NIK -->
        <el-col
          :xs="24"
          :md="12"
        >

          <div class="document-box">

            <h4>
              Dokumen NIK
            </h4>

            <el-upload
              :show-file-list="false"
              :http-request="uploadNik"
            >

              <el-button
                type="primary"
              >
                Upload Dokumen NIK
              </el-button>

            </el-upload>

            <div
              v-if="form.dokumen_nik_url"
              class="document-preview"
            >

              <el-tag
                type="success"
              >
                Dokumen tersedia
              </el-tag>

              <br><br>

              <el-button
                type="info"
                plain
                @click="
                  window.open(
                    form.dokumen_nik_url,
                    '_blank'
                  )
                "
              >
                Lihat Dokumen
              </el-button>

            </div>

            <div
              v-else
              class="document-empty"
            >

              Belum ada dokumen NIK

            </div>

          </div>

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
  Document,
  FolderOpened,
} from "@element-plus/icons-vue";

import api from "../api/axios";

import {
  ElMessage,
} from "element-plus";

const loading =
ref(false);

const loadingSave =
ref(false);

const form = ref({

  nomor_badan_hukum: "",

  nomor_nib: "",

  nomor_npwp: "",

  tanggal_berdiri: "",

  dokumen_url: "",

});

const loadData =
async () => {

  try {

    loading.value = true;

    const response =
      await api.get(
        "/legalities"
      );

    form.value =
      response.data.data;

  } catch (error) {

    ElMessage.error(
      "Gagal memuat legalitas."
    );

  } finally {

    loading.value = false;

  }

};

const uploadDokumen =
async (options) => {

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
        "/upload/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    form.value.dokumen_url =
      response.data.url;

    ElMessage.success(
      "Dokumen berhasil diupload."
    );

  } catch (error) {

    ElMessage.error(
      "Upload gagal."
    );

  }

};

const resetForm =
() => {

  loadData();

};

const simpan =
async () => {

  if (
    !form.value
      .nomor_badan_hukum
  ) {

    ElMessage.warning(
      "Nomor Badan Hukum wajib diisi."
    );

    return;

  }

  if (
    !form.value
      .nomor_nib
  ) {

    ElMessage.warning(
      "Nomor NIB wajib diisi."
    );

    return;

  }

  try {

    loadingSave.value =
      true;

    await api.put(
      "/legalities",
      form.value
    );

    ElMessage.success(
      "Legalitas berhasil diperbarui."
    );

    loadData();

  } catch (error) {

    ElMessage.error(
      error.response?.data
        ?.message ||
      "Gagal menyimpan data."
    );

  } finally {

    loadingSave.value =
      false;

  }

};

onMounted(() => {

  loadData();

});
</script>

<style scoped>

.legal-page{

  padding:10px;

}

.page-description{

  margin:12px 0 24px;

  color:#666;

  font-size:14px;

  line-height:1.7;

}

/* ==========================
   CARD
========================== */

.section-card{

  margin-bottom:24px;

  border-radius:14px;

  border:1px solid #ebeef5;

}

.section-title{

  display:flex;

  align-items:center;

  gap:10px;

  font-size:16px;

  font-weight:600;

  color:#AF101A;

}

/* ==========================
   FORM
========================== */

:deep(.el-form-item__label){

  font-weight:600;

  color:#444;

}

:deep(.el-input__wrapper){

  border-radius:10px;

}

:deep(.el-textarea__inner){

  border-radius:10px;

}

:deep(.el-input__wrapper:hover){

  box-shadow:0 0 0 1px #AF101A inset;

}

:deep(.el-textarea__inner:hover){

  box-shadow:0 0 0 1px #AF101A inset;

}

:deep(.el-date-editor){

  width:100%;

}

/* ==========================
   DOKUMEN
========================== */

.document-box{

  border:2px dashed #dcdfe6;

  border-radius:16px;

  padding:24px;

  text-align:center;

  min-height:240px;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  transition:.3s;

}

.document-box:hover{

  border-color:#AF101A;

}

.document-box h4{

  margin-bottom:18px;

  color:#AF101A;

}

.document-preview{

  margin-top:20px;

}

.document-preview .el-button{

  margin-top:12px;

}

.document-empty{

  margin-top:20px;

  color:#999;

  font-size:14px;

}

.document-empty .el-icon{

  font-size:50px;

  margin-bottom:12px;

  color:#c0c4cc;

}

/* ==========================
   BUTTON
========================== */

.action-container{

  display:flex;

  justify-content:flex-end;

  gap:12px;

}

.action-container .el-button{

  min-width:180px;

}

/* ==========================
   RESPONSIVE
========================== */

@media (max-width:768px){

  .document-box{

    margin-bottom:20px;

    min-height:200px;

  }

  .action-container{

    flex-direction:column-reverse;

  }

  .action-container .el-button{

    width:100%;

  }

}

</style>