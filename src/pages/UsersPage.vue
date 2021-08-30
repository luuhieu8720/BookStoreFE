<template>
  <div>
    <GetUsers />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GetUsers from '@/components/User/GetUsers.vue'
export default defineComponent({
  components: {
    GetUsers
  }
});
</script>