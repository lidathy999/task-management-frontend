<template>

  <v-layout class="rounded-md border min-h-screen">
    <v-app-bar title="Logo" class="!fixed top-0"></v-app-bar>

    <!-- <v-navigation-drawer ssr>
      <v-list nav>
        <v-list-item :class="{'!bg-primary': applicationStore.activeSidebar === 'dashboard'}" title="Dashboard" link @click="setActiveSidebar('dashboard')"></v-list-item>
        <v-list-item :class="{'!bg-primary': applicationStore.activeSidebar === 'my-tasks'}" title="My Tasks" link @click="setActiveSidebar('my-tasks')"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-main>
      <v-sheet class="overflow-auto">
        <slot />
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">

import { useApplicationStore } from '@/store/applicationStore';

const applicationStore = useApplicationStore();

// const setActiveSidebar = (name: string) => {
//   applicationStore.setActiveSidebar(name);
// };
</script>