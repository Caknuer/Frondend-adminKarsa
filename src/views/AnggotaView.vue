<template>

  <div>
    <div class="page-header">

      <h2>Data Anggota</h2>

    <el-input
    v-model="search"
    placeholder="Cari nama anggota..."
    clearable
    style="width:300px"
    />

    </div>

    <el-table
      :data="filteredAnggota"
      style="width: 100%"
      v-loading="loading"
    >

    <el-table-column
    label="Foto"
    width="90"
    >

    <template #default="scope">

    <el-avatar
      :size="50"
      :src="scope.row.foto_profile_url"
    >
      {{
        scope.row.nama
          ?.charAt(0)
          ?.toUpperCase()
      }}
    </el-avatar>

      </template>

    </el-table-column>

    
    <el-table-column
        prop="nama"
        label="Nama"
      />

      <el-table-column
        prop="nik"
        label="NIK"
        width="180"
      />

      <el-table-column
        prop="jenis_kelamin"
        label="JK"
        width="100"
      />

      <el-table-column
        prop="no_hp"
        label="No HP"
      />
      
      <el-table-column
        prop="pekerjaan"
        label="Pekerjaan"
        width="180"
      />

      <el-table-column
        label="Saldo"
        width="180"
      >
        <template #default="scope">

          <strong
            style="
              color:#409EFF;
            "
          >
            Rp
            {{
              Number(
                scope.row.saldo_total || 0
              ).toLocaleString("id-ID")
            }}
          </strong>

        </template>
      </el-table-column>

      <el-table-column
        label="Status"
        width="120"
      >

      <template #default="scope">

        <el-tag
          :type="
            scope.row.status === 'approved'
              ? 'success'
              : scope.row.status === 'pending'
              ? 'warning'
              : 'danger'
          "
        >

          {{ scope.row.status }}

        </el-tag>

          </template>

      </el-table-column>

      <el-table-column
      label="Role"
      width="120"
      >

      <template #default="scope">

      <el-tag
        type="info"
      >
        {{ scope.row.role }}
      </el-tag>

        </template>

      </el-table-column>

      <el-table-column
        label="Aksi"
        width="120"
      >

        <template #default="scope">

          <el-button
            type="primary"
            size="small"
            @click="goToDetail(scope.row.id)"
          >
            Detail
          </el-button>

        </template>

      </el-table-column>

    </el-table>

  </div>

</template>

<script setup>

import { useRouter } from "vue-router";

const router = useRouter();

const goToDetail = (id) => {
  router.push(`/anggota/${id}`);
};

import {
ref,
computed,
onMounted
} from "vue";

const search = ref("");

const filteredAnggota = computed(() => {

  const keyword =
    search.value.toLowerCase();

  return anggota.value.filter(
    item =>

      item.nama
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.nik
        ?.toLowerCase()
        .includes(keyword)

      ||

      item.email
        ?.toLowerCase()
        .includes(keyword)
  );

});

import api from "../api/axios";

const anggota = ref([]);
const loading = ref(false);

const loadData = async () => {

  try {

    loading.value = true;

    const response =
      await api.get("/anggota");

    anggota.value =
      response.data.data;

  } catch (error) {

    console.error(error);

  } finally {

    loading.value = false;

  }

};

onMounted(() => {
  loadData();
});
</script>

<style scoped>

  .page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .page-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    }
  }

</style>