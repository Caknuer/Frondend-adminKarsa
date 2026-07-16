<template>

<div>

  <h2>

    Pengaturan Tagihan

  </h2>

  <el-card>

    <el-form
      label-position="top"
    >

      <el-form-item
        label="Nominal Simpanan Wajib"
      >

        <el-input-number

          v-model="form.nominal"

          :min="1000"

          :step="1000"

          style="width:100%;"

        />

      </el-form-item>

      <el-form-item
        label="Tanggal Generate"
      >

        <el-input-number

          v-model="form.tanggal_generate"

          :min="1"

          :max="31"

          style="width:100%;"

        />

      </el-form-item>

      <el-form-item
        label="Tanggal Jatuh Tempo"
      >

        <el-input-number

          v-model="
            form.tanggal_jatuh_tempo
          "

          :min="1"

          :max="31"

          style="width:100%;"

        />

      </el-form-item>

      <el-form-item
        label="Generate Otomatis"
      >

        <el-switch

          v-model="
            form.generate_otomatis
          "

        />

      </el-form-item>

      <el-form-item
        label="Status"
      >

        <el-switch

          v-model="
            form.is_active
          "

        />

      </el-form-item>

      <el-button

        type="primary"

        @click="simpan"

      >

        Simpan Pengaturan

      </el-button>

    </el-form>

  </el-card>

</div>

</template>

<script setup>

import {

ref,

onMounted

} from "vue";

import {

ElMessage

} from "element-plus";

import api from "../api/axios";

const form = ref({

nominal:10000,

tanggal_generate:1,

tanggal_jatuh_tempo:25,

generate_otomatis:true,

is_active:true

});

const loadData = async ()=>{

try{

const response =

await api.get(

"/setting-tagihan"

);

form.value =
response.data.data;

}

catch(error){

ElMessage.error(

"Gagal memuat setting"

);

}

};

const simpan = async()=>{

try{

await api.put(

"/setting-tagihan",

form.value

);

ElMessage.success(

"Berhasil disimpan"

);

}

catch(error){

ElMessage.error(

error.response?.data?.message ||

"Gagal menyimpan"

);

}

};

onMounted(()=>{

loadData();

});

</script>

<style scoped>

h2{

margin-bottom:20px;

}

.el-card{

max-width:700px;

}

</style>