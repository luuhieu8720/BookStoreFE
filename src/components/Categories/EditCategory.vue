<template>
  <div class="container">
    <form>
      <div class="row p-m-2">
        <div class="col-md-8 col-md-offset-2">
          <h4 class="mt-3 mb-3">Chỉnh sửa thể loại</h4>
          <div class="form-group">
            <span class="p-float-label">
              <h6>Tên thể loại</h6>
              <InputText id="name" type="text" v-model="category.name" />
            </span>
          </div>
          <div class="form-group">
            <h6>Mô tả</h6>
            <Editor
              v-model="category.description"
              editorStyle="height: 320px"
            />
          </div>
          <div class="form-group">
            <Button
              class="btn btn-primary rounded-4"
              label="Cập nhật"
              @click="updateCategory()"
            />
            <router-link
              :to="{ name: 'GetCategory', params: { id: categoryId } }"
            >
              <Button
                class="btn btn-secondary rounded-4 p-m-2"
                label="Quay lại"
              />
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import categoryServices from "@/services/categories.services";
import useNotification from "@/logics/notification.logic";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import CategoryItem from "@/models/category/categories";
import { useRoute } from "vue-router";
import Editor from "primevue/editor";
export default defineComponent({
  components: {
    Editor,
  },
  setup() {
    const category = ref({} as CategoryItem);
    const notification = useNotification();
    const route = useRoute();
    const categoryId = route.params.id.toString();
    const isLoading = ref(false);
    const updateCategory = () => {
      categoryServices.updateCategory(categoryId, category.value).then(() => {
        notification.showMessage("Cập nhật thành công!");
      });
    };
    onMounted(() => {
      isLoading.value = true;
      categoryServices
        .getCategory(categoryId)
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