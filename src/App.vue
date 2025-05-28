<script setup>
import { RouterView } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';

</script>

<template>
  <!-- <div>
    <RouterView />
  </div> -->
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </DefaultLayout>
</template>

<style></style>