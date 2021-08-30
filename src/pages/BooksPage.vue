<template>
  <div>
    <GetBooks />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GetBooks from '@/components/Books/GetBooks.vue';

export default defineComponent({
  components: {
    GetBooks
  },
});
</script>