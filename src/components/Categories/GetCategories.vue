<template>
  <Card>
    <template #title>
      <div style="text-align: center">Danh sách thể loại</div>
    </template>
    <template #content>
      <DataTable :value="categories">
        <Column field="id" header="ID" style="width: 70px" />

        <Column field="name" header="Thể loại" style="width: 150px" />

        <Column field="description" header="Mô tả" style="width: 550px" />

        <Column field="id" header="Chi tiết">
          <template #body="slotProps">
            <router-link
              :to="{ name: 'GetCategory', params: { id: slotProps.data.id } }"
            >
              <Button class="btn btn-primary" label="Chi tiết" />
            </router-link>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>  

<script lang="ts">
import categoryServices from "@/services/categories.services";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import CategoryItem from "@/models/category/categories";

export default defineComponent({
  setup() {
    const categories = ref([] as CategoryItem[]);
    const isLoading = ref(false);
    onMounted(() => {
      isLoading.value = true;
      categoryServices
        .getCategories()
        .then((response) => {
          categories.value = response.data;
        })
        .finally(() => {
          isLoading.value = false;
        });
    });
    return {
      categories,
      isLoading,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
