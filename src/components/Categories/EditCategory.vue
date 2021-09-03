<template>
  <div class="container" :style="{ marginLeft: '30px' }">
    <form>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h3 id="padding-page">Chỉnh sửa thể loại</h3>
          <div class="form-group" :style="{ marginTop: '40px' }">
            <span class="p-float-label">
              <InputText id="id" type="text" v-model="category.id" disabled />
              <label for="id" :style="{ fontSize: '15px' }">Mã thể loại</label>
            </span>
          </div>
          <div class="form-group" :style="{ marginTop: '40px' }">
            <span class="p-float-label">
              <InputText id="name" type="text" v-model="category.name" />
              <label for="name" :style="{ fontSize: '15px' }"
                >Tên thể loại</label
              >
            </span>
          </div>
          <div class="form-group">
            <label for="description">Mô tả<span class="require">*</span></label>
            <textarea
              rows="6"
              name="description"
              :placeholder="category.description"
              v-model="category.description"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <Button
              class="btn btn-primary"
              label="Cập nhật"
              :style="{ borderRadius: '10px' }"
              @click="updateCategory()"
            />
            <router-link
              :to="{ name: 'GetCategory', params: { id: categoryId } }"
            >
              <Button
                class="btn btn-secondary"
                :style="{ borderRadius: '10px', marginLeft: '10px' }"
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
export default defineComponent({
  setup() {
    const category = ref({} as CategoryItem);
    const disabled = true;
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
      disabled,
    };
  },
});
</script>

<style scoped>
#padding-page {
  margin-top: 40px;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}
</style>