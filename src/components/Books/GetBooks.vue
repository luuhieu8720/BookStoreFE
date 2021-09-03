<template>
  <div class="p-m-2">
    <Card>
      <template #title>
        <div style="text-align: center">Kho sách</div>
      </template>
      <template #content>
        <DataTable :value="books" :loading="isLoading">
          <Column field="id" header="Id" />
          <Column field="name" header="Tên sách" />
          <Column field="author_name" header="Tác giả" />
          <Column field="price" header="Giá" />
          <Column field="year" header="Year" />
          <Column>
            <template #body="slotProps">
              <router-link
                :to="{ name: 'GetBookById', params: { id: slotProps.data.id } }"
              >
                <Button class="btn btn-success" label="Chi tiết" />
              </router-link>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>  

<script lang="ts">
import BookServices from "@/services/books.services";
import { defineComponent, onMounted, ref } from "vue";
import BookItem from "@/models/book/books";

export default defineComponent({
  setup() {
    const books = ref([] as BookItem[]);
    const isLoading = ref(false);

    onMounted(() => {
      isLoading.value = true;
      BookServices.getBooks()
        .then((response) => {
          books.value = response.data;
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    return {
      books,
      isLoading,
    };
  },
});
</script>
