<template>
  <div class="container" :style="{ marginLeft: '30px' }">
    <form>
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <h3 id="padding-page">Chỉnh sửa tác giả</h3>
          <div class="form-group" :style="{ marginTop: '40px' }">
            <span class="p-float-label">
              <InputText id="id" type="text" v-model="author.id" disabled />
              <label for="id" :style="{ fontSize: '15px' }">Mã tác giả</label>
            </span>
          </div>
          <div class="form-group" :style="{ marginTop: '40px' }">
            <span class="p-float-label">
              <InputText id="name" type="text" v-model="author.name" />
              <label for="name" :style="{ fontSize: '15px' }"
                >Tên tác giả</label
              >
            </span>
          </div>
          <div class="form-group" :style="{ marginTop: '40px' }">
            <div class="p-float-label">
              <Calendar id="date" v-model="author.birthday" :showIcon="true" />
              <label for="date" :style="{ fontSize: '15px' }">Ngày sinh</label>
            </div>
          </div>
          <div class="form-group">
            <Button
              class="btn btn-primary"
              label="Cập nhật"
              :style="{ borderRadius: '10px' }"
              @click="updateAuthor()"
            />
            <router-link :to="{ name: 'GetAuthor', params: { id: authorId } }">
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
import authorServices from "@/services/authors.services";
import useNotification from "@/logics/notification.logic";
import moment from "moment";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import AuthorItem from "@/models/author/author";
import { useRoute } from "vue-router";
import Calendar from "primevue/calendar";
export default defineComponent({
  components: {
    Calendar,
  },
  setup() {
    const author = ref({} as AuthorItem);
    const route = useRoute();
    const notification = useNotification();
    var authorId = route.params.id.toString();
    const isLoading = ref(false);
    const updateAuthor = () => {
      isLoading.value = true;
      authorServices
        .updateAuthor(authorId, author.value)
        .then(() => {
          notification.showMessage("Cập nhật thành công!");
        })
        .finally(() => (isLoading.value = false));
    };
    onMounted(() => {
      authorServices.getAuthor(authorId).then((response) => {
        (author.value = response.data),
          (author.value.birthday = moment(String(author.value.birthday)).format(
            "YYYY-MM-DD"
          ));
      });
    });
    return {
      author,
      isLoading,
      updateAuthor,
      authorId,
    };
  },
});
</script>

<style scoped>
#padding-page {
  margin-top: 40px;
}
</style>