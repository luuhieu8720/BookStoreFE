<template>
  <div>
    <GetCategories />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GetCategories from '@/components/Categories/GetCategories.vue'

export default defineComponent({
  components: {
    GetCategories
  },
});
</script>