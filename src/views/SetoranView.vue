<template>
  <div class="page-container">
    <el-card shadow="never">

      <template #header>
        <div class="header">
          <h2>Kelola Setoran</h2>
          <el-button
            type="primary"
            @click="getData"
          >
            Refresh
          </el-button>
        </div>
      </template>

      <el-table
        :data="setoranList"
        border
        stripe
        v-loading="loading"
      >

        <el-table-column
          prop="users.nama"
          label="Nama Anggota"
          min-width="180"
        />

        <el-table-column
          label="Jenis Simpanan"
          min-width="170"
        >
          <template #default="{ row }">
            <el-tag
              :type="
                row.jenis_simpanan ===
                'Simpanan Wajib'
                  ? 'danger'
                  : row.jenis_simpanan ===
                    'Simpanan Pokok'
                      ? 'primary'
                      : 'success'
              "
            >
              {{ row.jenis_simpanan }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="Nominal"
          min-width="140"
        >
          <template #default="{ row }">
            Rp {{ formatRupiah(row.nominal) }}
          </template>
        </el-table-column>

        <el-table-column
          label="Periode Tagihan"
          min-width="220"
        >
          <template #default="{ row }">
            <template
              v-if="
                row.jenis_simpanan ===
                  'Simpanan Wajib' &&
                row.periode_tagihan &&
                row.periode_tagihan.length
              "
            >
              <el-tag
                v-for="
                  periode in row.periode_tagihan
                "
                :key="periode"
                type="warning"
                effect="plain"
                style="
                  margin-right:6px;
                  margin-bottom:6px;
                "
              >
                {{ formatPeriode(periode) }}
              </el-tag>
            </template>

            <span v-else>
              -
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="metode_pembayaran"
          label="Metode"
          width="120"
        />

        <el-table-column
          label="Status"
          width="140"
        >
          <template #default="{ row }">

            <el-tag
              v-if="row.status === 'approved'"
              type="success"
              effect="dark"
            >
              Approved
            </el-tag>

            <el-tag
              v-else-if="row.status === 'rejected'"
              type="danger"
              effect="dark"
            >
              Ditolak
            </el-tag>

            <el-tag
              v-else
              type="warning"
              effect="dark"
            >
              Menunggu
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="Tanggal"
          min-width="180"
        >
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>

        <el-table-column
          label="Aksi"
          width="120"
          fixed="right"
        >
          <template #default="{ row }">

            <el-button
              type="primary"
              size="small"
              @click="showDetail(row)"
            >
              Detail
            </el-button>

          </template>
        </el-table-column>

      </el-table>

    </el-card>

    <!-- DETAIL -->

    <el-dialog
      v-model="dialogVisible"
      title="Detail Setoran"
      width="700px"
    >

      <div
        v-if="selectedData"
        class="detail-wrapper"
      >

        <p>
          <strong>Nama :</strong>
          {{ selectedData.users?.nama }}
        </p>

        <p>
          <strong>Jenis :</strong>
          {{ selectedData.jenis_simpanan }}
        </p>

        <p>
          <strong>Nominal :</strong>
          Rp {{ formatRupiah(selectedData.nominal) }}
        </p>

        <p>
          <strong>Metode :</strong>
          {{ selectedData.metode_pembayaran }}
        </p>

        <div
          v-if="
            selectedData.jenis_simpanan === 'Simpanan Wajib'
          "
          style="margin-bottom:15px"
        >

          <strong>Periode Tagihan :</strong>

          <div
            v-if="
              selectedData.periode_tagihan &&
              selectedData.periode_tagihan.length
            "
            style="margin-top:8px"
          >
            <el-tag
              v-for="periode in selectedData.periode_tagihan"
              :key="periode"
              type="warning"
              style="
                margin-right:8px;
                margin-bottom:8px;
              "
            >
              {{ formatPeriode(periode) }}
            </el-tag>
          </div>

          <span v-else>
            -
          </span>
        </div>

        <p>
          <strong>Status :</strong>
          {{ selectedData.status }}
        </p>

        <p>
          <strong>Keterangan :</strong>
          {{ selectedData.keterangan || '-' }}
        </p>

        <div
          v-if="selectedData.bukti_pembayaran"
          style="margin-top:20px"
        >
          <p>
            <strong>Bukti Pembayaran</strong>
          </p>

          <img
            :src="selectedData.bukti_pembayaran"
            style="
              width:100%;
              max-height:400px;
              object-fit:contain;
              border:1px solid #ddd;
              border-radius:10px;
            "
          />
        </div>

      </div>

      <template #footer>

        <el-button
          @click="dialogVisible = false"
        >
          Tutup
        </el-button>

        <el-button
          v-if="selectedData?.status === 'pending'"
          type="danger"
          @click="rejectData"
        >
          Reject
        </el-button>

        <el-button
          v-if="selectedData?.status === 'pending'"
          type="success"
          @click="approveData"
        >
          Approve
        </el-button>

      </template>

    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  ElMessage,
  ElMessageBox
} from "element-plus";

import api from "../api/axios.js";

const loading = ref(false);

const setoranList = ref([]);

const dialogVisible = ref(false);

const selectedData = ref(null);

const getData = async () => {
  try {

    loading.value = true;

    const response =
      await api.get(
        "/transaksi-setoran"
      );

    setoranList.value =
      response.data.data;

  } catch (error) {

    console.log(error);

  } finally {

    loading.value = false;

  }
};

const showDetail = (row) => {

  selectedData.value = row;

  dialogVisible.value = true;

};

const approveData = async () => {

  try {

    const periode =
      selectedData.value.periode_tagihan || [];

    const daftarPeriode =
      periode.length
        ? periode
            .map(p => `• ${formatPeriode(p)}`)
            .join("<br>")
        : "-";
    await ElMessageBox.confirm(
      `
      <div style="line-height:1.8">

        <b>Nama :</b>
        ${selectedData.value.users?.nama}
        <br>

        <b>Jenis :</b>
        ${selectedData.value.jenis_simpanan}
        <br>

        <b>Nominal :</b>
        Rp ${formatRupiah(selectedData.value.nominal)}
        <br><br>
        <b>Tagihan yang akan dilunasi</b>
        <br>
        ${daftarPeriode}
      </div>
      `,
      "Konfirmasi Approval",
      {
        dangerouslyUseHTMLString: true,
        confirmButtonText:
          "Approve",

        cancelButtonText:
          "Batal",

        type: "warning",
      }
    );

    await api.patch(
      `/transaksi-setoran/${selectedData.value.id}/approve`
    );

    ElMessage.success(
      "Setoran berhasil diapprove"
    );
    dialogVisible.value = false;
    getData();
  } catch (error) {
    if (error !== "cancel") {
      console.log(error);
      ElMessage.error(
        "Gagal approve."
      );
    }
  }
};

const rejectData = async () => {
  try {

    await api.patch(
      `/transaksi-setoran/${selectedData.value.id}/reject`
    );

    ElMessage.success(
      "Setoran berhasil ditolak"
    );

    dialogVisible.value = false;

    getData();

  } catch (error) {

    console.log(error);

  }
};

const formatRupiah = (value) => {

  return Number(value || 0)
    .toLocaleString("id-ID");

};

const formatDate = (date) => {

  return new Date(date)
    .toLocaleString("id-ID");

};

const formatPeriode = (periode) => {

  if (!periode) return "-";

  const bulan = [

    "Januari",

    "Februari",

    "Maret",

    "April",

    "Mei",

    "Juni",

    "Juli",

    "Agustus",

    "September",

    "Oktober",

    "November",

    "Desember",

  ];

  const split = periode.split("-");

  return `${bulan[Number(split[1]) - 1]} ${split[0]}`;

};

onMounted(() => {
  getData();
});
</script>

<style scoped>
.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.detail-wrapper p{
  margin-bottom:10px;
}
</style>