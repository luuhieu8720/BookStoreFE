<template>
  <div class="container">
    <h2
      :style="{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }"
    >
      Chi tiết tác giả
    </h2>
    <form>
      <div class="card-body">
        <div class="row" :style="{ marginTop: '18px', marginBottom: '18px' }">
          <div class="col-sm-3">
            <h6 class="mb-0">Họ và tên</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p
              type="h6"
              :style="{
                border: 'none',
                borderColor: 'transparent',
                borderWidth: '0px',
                width: '500px',
              }"
              class="text-secondary"
            >
              {{ author.name }}
            </p>
          </div>
        </div>
        <hr />
        <div class="row" :style="{ marginTop: '18px', marginBottom: '18px' }">
          <div class="col-sm-3">
            <h6 class="mb-0">Website</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p
              type="h6"
              :style="{
                border: 'none',
                borderColor: 'transparent',
                borderWidth: '0px',
                width: '500px',
              }"
              class="text-secondary"
            >
              {{ author.website }}
            </p>
          </div>
        </div>
        <hr />
        <div class="row" :style="{ marginTop: '18px', marginBottom: '18px' }">
          <div class="col-sm-3">
            <h6 class="mb-0">Ngày sinh</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p
              type="h6"
              :style="{
                border: 'none',
                borderColor: 'transparent',
                borderWidth: '0px',
                width: '500px',
              }"
              class="text-secondary"
            >
              {{ author.birthday }}
            </p>
          </div>
        </div>
        <hr />
        <div class="row" :style="{ marginTop: '20px', marginBottom: '13px' }">
          <div class="col-sm-12">
            <router-link
              :to="{ name: 'EditAuthor', params: { id: author.id } }"
              :hidden="!isInRole()"
            >
              <Button class="btn btn-primary rounded-4" label="Cập nhật" />
            </router-link>

            <Button
              class="btn btn-secondary mx-2 rounded-4"
              label="Xóa"
              @click="deleteAuthor()"
              :hidden="!isInRole()"
            />

            <router-link :to="{ name: 'AuthorsPage' }" :hidden="isInRole()">
              <Button class="btn btn-primary" label="Quay lại" />
            </router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>  

<script lang="ts">
import authorsServices from "@/services/authors.services";
import { defineComponent, ref, onMounted } from "@vue/runtime-core";
import AuthorItem from "@/models/author/author";
import store from '@/store'
import { useRoute } from "vue-router";
import router from "@/router";
import { Role } from "@/models/user/role";
import moment from 'moment'
export default defineComponent({
  setup() {
    const author = ref({} as AuthorItem);
    const route = useRoute();
    const isLoading = ref(false);
    var authorId = route.params.id.toString();
    const isInRole = () => {
      if (store.state.user != null) {
        return store.state.user.role == Role.Admin;
      }
    };
    const deleteAuthor = () => {
      if (confirm("Bạn muốn xóa tác giả này?")) {
        authorsServices
          .deleteAuthor(authorId)
          .then(() => {
            alert("Xóa thành công!");
            router.push("/authors");
          })
      } else {
        window.location.reload();
      }
    };
    onMounted(() => {
      isLoading.value = true;
      authorsServices
        .getAuthor(authorId)
        .then((response) => {
          author.value = response.data;
        (author.value.birthday = moment(String(author.value.birthday)).format(
            "DD/MM/YYYY"
        ));
        })
        .finally(() => {
          isLoading.value = false;
        });
    });
    return {
        author,
        isLoading,
        isInRole,
        deleteAuthor
    }
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
