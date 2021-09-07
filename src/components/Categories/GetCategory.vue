<template>
  <Card>
    <template #title>
      <div class="p-d-flex p-jc-center">
        <div>Chi tiết thể loại</div>
      </div>
    </template>

    <template #content>
      <div class="card-body">
        <div class="row p-m-2">
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
        <div class="row p-m-2">
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
        <div class="row p-m-2">
          <div class="col-sm-3">
            <h6 class="mb-0">Các sách thuộc thể loại này</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <DataView :value="books">
              <template #list="slotProps">
                <div class="p-col-12">
                  <div class="car-details">
                    <div>
                      <div class="p-grid">
                        <p>{{ slotProps.data.name }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </DataView>
          </div>
        </div>
        <hr />
      </div>
    </template>

    <template #footer>
      <router-link
        class="text-decoration-none"
        :to="{ name: 'CategoryEdit', params: { id: category.id } }"
        :hidden="!isInRole()"
      >
        <Button
          icon="pi pi-play"
          class="p-button-primary ms-4"
          label="Cập nhật"
        />
      </router-link>

      <ConfirmDialog></ConfirmDialog>
      <Button
        icon="pi pi-times"
        label="Xóa"
        class="p-button-secondary mx-2"
        @click="deleteCategory()"
        :hidden="!isInRole()"
      />

      <router-link
        :to="{ name: 'CategoriesPage' }"
        class="text-decoration-none"
      >
        <Button class="btn-light border-dark" label="Quay lại" />
      </router-link>
    </template>
  </Card>
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
import Card from "primevue/card";
import DataView from "primevue/dataview";
import ConfirmDialog from "primevue/confirmdialog";
import useNotification from "@/logics/notification.logic";
import { useConfirm } from "primevue/useconfirm";

export default defineComponent({
  components: {
    Card,
    DataView,
    ConfirmDialog,
  },
  setup() {
    const category = ref({} as CategoryItem);
    const books = ref([] as BookItem[]);
    const route = useRoute();
    var categoryId = route.params.id.toString();
    const isLoading = ref(false);
    const notification = useNotification();
    const isInRole = () => {
      return store.state.user?.role == Role.Admin;
    };

    const confirm = useConfirm();

    const deleteCategory = () => {
      confirm.require({
        message: "Bạn muốn xóa thể loại này?",
        header: "Xác nhận chỉnh sửa",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          CategoriesServices.delete(categoryId).then(() => {
            notification.showMessage("Xóa thành công!");
            router.push({ name: "CategoriesPage" });
          });
        },
      });
    };

    onMounted(() => {
      isLoading.value = true;
      CategoriesServices.get(categoryId)
        .then((response) => (category.value = response.data))
        .finally(() => (isLoading.value = false));
      CategoriesServices.getBooks(categoryId).then(
        (response) => (books.value = response.data)
      );
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
</style>

