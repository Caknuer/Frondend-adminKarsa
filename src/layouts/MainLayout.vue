<template>

  <el-container class="layout">

<el-aside
  v-if="!isMobile"
  :width="
    isCollapse
      ? '64px'
      : '250px'
  "
  class="sidebar"
>

  <div class="logo">

    <template v-if="!isCollapse">

      <h2>Karsa Admin</h2>

      <span>
        Koperasi Desa Merah Putih
      </span>

    </template>

    <template v-else>

      <h2>K</h2>

    </template>

  </div>

  <el-menu
    router
    :collapse="isCollapse"
    :default-active="route.path"
    background-color="#b91c1c"
    text-color="#ffffff"
    active-text-color="#facc15"
  >

    <el-menu-item index="/">

      <el-icon>
        <House />
      </el-icon>

      <span>Dashboard</span>

    </el-menu-item>

    <el-sub-menu index="1">

      <template #title>

        <el-icon>
          <User />
        </el-icon>

        <span>
          Kelola Anggota
        </span>

      </template>

      <el-menu-item index="/anggota">
        Data Anggota
      </el-menu-item>

      <el-menu-item index="/approval">
        Approval Anggota
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="2">

      <template #title>

        <el-icon>
          <Money />
        </el-icon>

        <span>
          Keuangan
        </span>

      </template>

      <el-menu-item index="/setoran">
        Kelola Setoran
      </el-menu-item>

      <el-menu-item index="/simpanan">
        Simpanan
      </el-menu-item>

      <el-menu-item index="/penarikan">
        Penarikan
      </el-menu-item>

      <el-menu-item index="/tagihan">
        Tagihan Wajib
      </el-menu-item>
      
    </el-sub-menu>

    <el-sub-menu index="3">

      <template #title>

        <el-icon>
          <Document />
        </el-icon>

        <span>
          Konten
        </span>

      </template>

      <el-menu-item index="/berita">
        Berita
      </el-menu-item>

      <el-menu-item index="/pengumuman">
        Pengumuman
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="4">

      <template #title>

        <el-icon>
          <OfficeBuilding />
        </el-icon>

        <span>
          Profil Koperasi
        </span>

      </template>

      <el-menu-item index="/pengurus">
        Pengurus
      </el-menu-item>

      <el-menu-item index="/company">
        Profil Koperasi
      </el-menu-item>

      <el-menu-item index="/legalitas">
        Legalitas
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="5">

      <template #title>

        <el-icon>
          <Setting />
        </el-icon>

        <span>
          Pengaturan
        </span>

      </template>

      <el-menu-item index="/admins">
        Kelola Admin
      </el-menu-item>

    </el-sub-menu>

  </el-menu>

</el-aside>

<el-drawer
  v-model="drawerVisible"
  direction="ltr"
  size="280px"
  :with-header="false"
>

  <div class="logo">

    <h2>Karsa Admin</h2>

    <span>
      Koperasi Desa Merah Putih
    </span>

  </div>

  <el-menu
    router
    :default-active="route.path"
    @select="drawerVisible = false"
  >

    <el-menu-item index="/">

      <el-icon>
        <House />
      </el-icon>

      <span>Dashboard</span>

    </el-menu-item>

    <el-sub-menu index="1">

      <template #title>

        <el-icon>
          <User />
        </el-icon>

        <span>Kelola Anggota</span>

      </template>

      <el-menu-item index="/anggota">
        Data Anggota
      </el-menu-item>

      <el-menu-item index="/approval">
        Approval Anggota
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="2">

      <template #title>

        <el-icon>
          <Money />
        </el-icon>

        <span>Keuangan</span>

      </template>

      <el-menu-item index="/setoran">
        Kelola Setoran
      </el-menu-item>

      <el-menu-item index="/simpanan">
        Simpanan
      </el-menu-item>

      <el-menu-item index="/penarikan">
        Penarikan
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="3">

      <template #title>

        <el-icon>
          <Document />
        </el-icon>

        <span>Konten</span>

      </template>

      <el-menu-item index="/berita">
        Berita
      </el-menu-item>

      <el-menu-item index="/pengumuman">
        Pengumuman
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="4">

      <template #title>

        <el-icon>
          <OfficeBuilding />
        </el-icon>

        <span>Profil Koperasi</span>

      </template>

      <el-menu-item index="/pengurus">
        Pengurus
      </el-menu-item>

      <el-menu-item index="/company">
        Profil Koperasi
      </el-menu-item>

      <el-menu-item index="/legalitas">
        Legalitas
      </el-menu-item>

    </el-sub-menu>

    <el-sub-menu index="5">

      <template #title>

        <el-icon>
          <Setting />
        </el-icon>

        <span>Pengaturan</span>

      </template>

      <el-menu-item index="/admins">
        Kelola Admin
      </el-menu-item>

    </el-sub-menu>

  </el-menu>

</el-drawer>

<el-container>

  <el-header class="header">

    <div class="header-left">

      <el-button
        link
        @click="
          isMobile
          ? drawerVisible = true
          : toggleSidebar()
        "
      >

        <el-icon size="22">

          <Fold
            v-if="
              !isCollapse &&
              !isMobile
            "
          />

          <Expand
            v-else
          />

        </el-icon>

      </el-button>

      <h3>
        Admin Panel Karsa
      </h3>

    </div>

    <div class="header-right">

      <el-dropdown>

        <span class="admin-dropdown">

          <el-avatar>
            {{ adminInitial }}
          </el-avatar>

          <div>

            <div class="admin-name">
              {{ admin.nama }}
            </div>

            <div class="admin-role">
              {{ admin.role }}
            </div>

          </div>

        </span>

        <template #dropdown>

          <el-dropdown-menu>

            <el-dropdown-item disabled>

              {{ admin.email }}

            </el-dropdown-item>

            <el-dropdown-item divided
              @click="logout"
            >

              Logout

            </el-dropdown-item>

          </el-dropdown-menu>

        </template>

      </el-dropdown>

    </div>

  </el-header>

  <el-main class="main">

    <router-view />

  </el-main>

</el-container>

  </el-container>

</template>

<script setup>

import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from "vue";

const isCollapse = ref(false);
const isMobile = ref(false);
const drawerVisible = ref(false);

const checkScreen = () => {

  isMobile.value =
    window.innerWidth < 768;

  if (
    window.innerWidth >= 768 &&
    window.innerWidth < 1024
  ) 
  if (!isMobile.value) {
    drawerVisible.value = false;
  }{
    isCollapse.value = true;
  }
};

onMounted(() => {

  const saved =
    localStorage.getItem(
      "sidebarCollapse"
    );

  if (saved !== null) {
    isCollapse.value =
      JSON.parse(saved);
  }

  checkScreen();

  window.addEventListener(
    "resize",
    checkScreen
  );
});

onBeforeUnmount(() => {

  window.removeEventListener(
    "resize",
    checkScreen
  );

});

const toggleSidebar = () => {

  isCollapse.value =
    !isCollapse.value;

  localStorage.setItem(
    "sidebarCollapse",
    JSON.stringify(
      isCollapse.value
    )
  );
};

import {
  useRouter,
  useRoute
} from "vue-router";

const router = useRouter();
const route = useRoute();

import {
  House,
  User,
  Money,
  Document,
  OfficeBuilding,
  Setting,
  Fold,
  Expand
} from "@element-plus/icons-vue";

const admin = computed(() => {

  return JSON.parse(
    localStorage.getItem("admin")
  ) || {};

});

const adminInitial = computed(() => {

  return admin.value?.nama
    ? admin.value.nama.charAt(0).toUpperCase()
    : "A";

});

const logout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "admin"
  );

  router.push(
    "/login"
  );

};

</script>

<style scoped>

.sidebar {
background: #b91c1c;
transition: all .3s ease;
overflow-y: auto;
}

.layout {
height: 100vh;
overflow: hidden;
}

.el-menu {
  border-right: none;
}

.el-drawer__body {
  padding: 0 !important;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  color: white;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,.2);
}

.logo h2 {
  margin: 0;
}

.logo span {
  font-size: 12px;
  opacity: .8;
}

.header {
background: white;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 20px;
box-shadow: 0 2px 10px rgba(0,0,0,.05);
}

@media (max-width: 768px) {

.header {
padding: 0 12px;
}

.header-left h3 {
font-size: 16px;
}

.admin-role {
display: none;
}

}


.header-left h3 {
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.admin-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.admin-name {
  font-weight: 600;
}

.admin-role {
  font-size: 12px;
  color: #888;
}

.main {
  background: #f5f6fa;
  padding: 20px;
}

</style>
