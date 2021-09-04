<template>
  <div class="container">
    <h2 :style="{ textAlign: 'center', marginTop: '30px' }">
      Chi tiết thể loại
    </h2>
    <form>
      <div class="card-body">
        <div class="row" :style="{ marginBottom: '18px' }">
          <div class="col-sm-3">
            <h6 class="mb-0">Tên thể loại</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary">
              {{ category.name }}
            </p>
          </div>
        </div>
        <hr />
        <div class="row" :style="{ marginTop: '18px', marginBottom: '18px' }">
          <div class="col-sm-3">
            <h6 class="mb-0">Mô tả</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary">
              {{ category.description }}
            </p>
          </div>
        </div>
        <hr />
        <div class="row" :style="{ marginTop: '18px', marginBottom: '18px' }">
          <div class="col-sm-3">
            <h6 class="mb-0">Các sách thuộc thể loại này</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary" v-for="item in books" :key="item.id">
              {{ item.name }}
            </p>
          </div>
        </div>
        <hr />
        <div class="row" :style="{ marginTop: '20px', marginBottom: '13px' }">
          <div class="col-sm-12">
            <router-link
              :to="{ name: 'EditCategory', params: { id: category.id } }"
              :hidden="!isInRole()"
            >
              <Button class="btn btn-primary rounded-4" label="Cập nhật" />
            </router-link>

            <Button
              class="btn btn-secondary mx-2 rounded-4"
              label="Xóa"
              @click="deleteCategory()"
              :hidden="!isInRole()"
            />

            <router-link :to="{ name: 'CategoriesPage' }" :hidden="isInRole()">
              <Button class="btn btn-primary" label="Quay lại" />
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>  

<script lang="ts">
import CategoriesServices from "@/services/categories.services";
import store from "@/store";
import router from "@/router";
import { Role } from "@/models/user/role";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import CategoryItem from "@/models/category/categories";
import BookItem from "@/models/book/books";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const category = ref({} as CategoryItem);
    const books = ref([] as BookItem[]);
    const route = useRoute();
    var categoryId = route.params.id.toString();
    const isLoading = ref(false);
    const isInRole = () => {
      if (store.state.user != null) {
        return store.state.user.role == Role.Admin;
      }
    };

    const deleteCategory = () => {
      if (confirm("Bạn muốn xóa thể loại này?")) {
        CategoriesServices.deleteCategory(categoryId).then(() => {
          alert("Xóa thành công!");
          router.push({ name: "CategoriesPage" });
        });
      }
    };

    onMounted(() => {
      isLoading.value = true;
      CategoriesServices.getCategory(categoryId)
        .then((response) => {
          category.value = response.data;
        })
        .finally(() => {
          isLoading.value = false;
        });
      CategoriesServices.getBookCategory(categoryId)
        .then((response) => {
          books.value = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    });
    return {
      category,
      books,
      isInRole,
      deleteCategory,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-secondary:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
}
</style>
