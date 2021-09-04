<template>
  <Card>
    <template #title>
      <div style="text-align: center">Danh sách tác giả</div>
    </template>
    <template #content>
      <DataTable :value="authors">
        <Column field="id" header="ID" style="width: 70px" />

        <Column field="name" header="Tên tác giả" style="width: 200px" />

        <Column field="website" header="Website" style="width: 300px" />

        <Column field="birthday" header="Ngày sinh" style="width: 200px" />

        <Column field="id" header="Chi tiết">
          <template #body="slotProps">
            <router-link
              :to="{ name: 'GetAuthor', params: { id: slotProps.data.id } }"
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
import authorsServices from "@/services/authors.services";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import moment from "moment";
import AuthorItem from "@/models/author/author";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";
export default defineComponent({
  components: {
    DataTable,
    Column,
    Card,
  },
  setup() {
    const authors = ref([] as AuthorItem[]);
    const isLoading = ref(false);
    onMounted(() => {
      isLoading.value = true;
      authorsServices
        .getAuthors()
        .then((response) => {
          (authors.value = response.data),
            authors.value.forEach(
              (author) =>
                (author.birthday = moment(String(author.birthday)).format(
                  "DD/MM/YYYY"
                ))
            );
        })
        .finally(() => {
          isLoading.value = false;
        });
    });
    return {
      authors,
      isLoading,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
