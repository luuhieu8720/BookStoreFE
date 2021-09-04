import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BooksPage from '@/pages/BooksPage.vue';
import CategoriesPage from "@/pages/CategoriesPage.vue";
import AuthorsPage from "@/pages/AuthorsPage.vue";
import UsersPage from "@/pages/UsersPage.vue";
import GetBookById from "@/components/Books/GetBookById.vue"
import EditBook from "@/components/Books/EditBook.vue"
import GetAuthor from "@/components/Author/GetAuthor.vue"
import EditAuthor from "@/components/Author/EditAuthor.vue"
import GetCategory from "@/components/Categories/GetCategory.vue"
import GetUser from "@/components/User/GetUser.vue"
import EditCategory from '@/components/Categories/EditCategory.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BooksPage',
    component: BooksPage
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: CategoriesPage
  },
  {
    path: '/authors',
    name: 'AuthorsPage',
    component: AuthorsPage
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: UsersPage
  },
  {
    path: '/getbookbyid/:id?',
    name: 'GetBookById',
    component: GetBookById
  },
  {
    path: '/editbook/:id?',
    name: 'EditBook',
    component: EditBook
  },
  {
    path: '/authors/:id',
    name: 'GetAuthor',
    component: GetAuthor
  },
  {
    path: '/editauthor/:id',
    name: 'EditAuthor',
    component: EditAuthor
  },
  {
    path: '/getcategorybyid/:id',
    name: 'GetCategory',
    component: GetCategory
  },
  {
    path: '/getuserbyid/:id',
    name: 'GetUser',
    component: GetUser
  },
  {
    path: '/editcategory/:id',
    name: 'EditCategory',
    component: EditCategory
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
