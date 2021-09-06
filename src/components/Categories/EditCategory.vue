<template>
  <Card>
    <template #title>
      <div class="p-d-flex p-jc-left ms-3 mt-1">
        <div>Chỉnh sửa thể loại</div>
      </div>
    </template>
    <template #content>
      <div class="row p-m-2">
        <div class="col-md-8 col-md-offset-2">
          <div class="form-group">
            <span class="p-float-label">
              <h6>Tên thể loại</h6>
              <InputText id="name" type="text" v-model="category.name" />
            </span>
          </div>
          <div class="form-group">
            <h6>Mô tả</h6>
            <Editor v-model="category.description" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <Button
        class="ms-4"
        icon="pi pi-check"
        label="Lưu"
        @click="updateCategory()"
      />
      <router-link
        :to="{ name: 'GetCategory', params: { id: categoryId } }"
        class="text-decoration-none"
      >
        <Button class="p-button-secondary mx-2" label="Quay lại" />
      </router-link>
    </template>
  </Card>
</template>
<script lang="ts">
import categoryServices from "@/services/categories.services";
import useNotification from "@/logics/notification.logic";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import CategoryItem from "@/models/category/categories";
import { useRoute } from "vue-router";
import Editor from "primevue/editor";
import Card from "primevue/card";
export default defineComponent({
  components: {
    Editor,
    Card,
  },

  setup() {
    const category = ref({} as CategoryItem);
    const notification = useNotification();
    const route = useRoute();
    const categoryId = route.params.id.toString();
    const isLoading = ref(false);
    const updateCategory = () => {
      console.log(category.value.description);
      categoryServices.update(categoryId, category.value).then(() => {
        notification.showMessage("Cập nhật thành công!");
        console.log(category.value.description);
      });
    };

    onMounted(() => {
      isLoading.value = true;
      categoryServices
        .get(categoryId)
        .then((response) => {
          category.value = response.data;
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    return {
      category,
      categoryId,
      isLoading,
      updateCategory,
    };
  },
});
</script>

<style scoped>
</style>