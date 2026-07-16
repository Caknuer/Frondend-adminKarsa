import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../layouts/MainLayout.vue";

import DashboardView from "../views/DashboardView.vue";
import AnggotaView from "../views/AnggotaView.vue";
import ApprovalView from "../views/ApprovalView.vue";
import SimpananView from "../views/SimpananView.vue";
import PenarikanView from "../views/PenarikanView.vue";
import BeritaView from "../views/BeritaView.vue";
import PengumumanView from "../views/PengumumanView.vue";
import PengurusView from "../views/PengurusView.vue";
import CompanyView from "../views/CompanyView.vue";
import LegalitasView from "../views/LegalitasView.vue";
import LoginView from "../views/LoginView.vue";
import RoleAdminView from "../views/RoleAdminView.vue";
import SetoranView from "../views/SetoranView.vue";
import DetailAnggotaView from "../views/DetailAnggotaView.vue";
import TagihanView from "../views/TagihanView.vue";
import TagihanDetailView from "../views/TagihanDetailView.vue";
import SettingTagihanView from "../views/SettingTagihanView.vue";

const routes = [
  {
    path: "/login",
    component: LoginView,
  },

  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        component: DashboardView,
      },
      {
        path: "anggota",
        component: AnggotaView,
      },
      {
        path: "approval",
        component: ApprovalView,
      },
      {
        path: "simpanan",
        component: SimpananView,
      },
      {
        path: "penarikan",
        component: PenarikanView,
      },
      {
        path: "berita",
        component: BeritaView,
      },
      {
        path: "pengumuman",
        component: PengumumanView,
      },
      {
        path: "pengurus",
        component: PengurusView,
      },
      {
        path: "company",
        component: CompanyView,
      },
      {
        path: "legalitas",
        component: LegalitasView,
      },
      {
        path: "admins",
        component: RoleAdminView,
      },
      {
        path: "setoran",
        component: SetoranView,
      },
      {
        path: "anggota/:id",
        name: "DetailAnggota",
        component: DetailAnggotaView,
      },
      {
        path: "tagihan",
        name: "Tagihan",
        component: TagihanView,
      },
      {
        path: "tagihan/:id",
        name: "DetailTagihan",
        component: TagihanDetailView,
      },
      {
        path:"setting-tagihan",
        component: SettingTagihanView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");

  if (to.path === "/login" && token) {
    return "/";
  }

  if (to.path !== "/login" && !token) {
    return "/login";
  }

  return true;
});

export default router;