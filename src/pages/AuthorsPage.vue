<template>
  <div>
    <GetAuthors />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GetAuthors from '@/components/Author/GetAuthors.vue';

export default defineComponent({
  components: {
    GetAuthors
  }
});
</script>