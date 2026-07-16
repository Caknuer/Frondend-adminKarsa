<template>

  <div class="login-container">

    <el-card
      class="login-card"
    >

      <h2>
        Admin Karsa
      </h2>

      <el-form>

        <el-form-item>

          <el-input
            v-model="email"
            placeholder="Email"
          />

        </el-form-item>

        <el-form-item>

          <el-input
            v-model="password"
            type="password"
            placeholder="Password"
            show-password
          />

        </el-form-item>

        <el-button
          type="primary"
          style="width:100%"
          @click="login"
        >
          Login
        </el-button>

      </el-form>

    </el-card>

  </div>

</template>

<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import api from "../api/axios";

const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {

  try {

    const response =
      await api.post(
        "/admin/login",
        {
          email: email.value,
          password: password.value
        }
      );

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(
        response.data.admin
      )
    );

    ElMessage.success(
      "Login berhasil"
    );

    router.push(
      "/"
    );

  } catch (error) {

    ElMessage.error(
      error.response?.data?.message ||
      "Login gagal"
    );

  }

};

</script>

<style scoped>

.login-container{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
}

.login-card{
  width:400px;
}

</style>