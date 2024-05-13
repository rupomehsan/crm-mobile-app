<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          CRM Management
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" style="" show-if-above>
      <div class="header">
        <div class="top">
          <div class="img">
            <img src="/avatar.png" alt="">
            <h4>CRM Officer</h4>
          </div>
        </div>
        <div class="nav-wrap">
          <nav class="main-nav" role="navigation">
            <ul class="unstyled list-hover-slide">
              <li><router-link to="/"><i class="fa fa-plus"></i> New Entry</router-link></li>
              <li><router-link to="/all-entries"><i class="fa fa-list"></i> All Entries</router-link></li>
              <li><router-link to="/call-logs"><i class="fa fa-phone"></i> Call Logs</router-link></li>
              <li><router-link to="/at-a-glance"><i class="fa fa-line-chart"></i> At a glance</router-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
