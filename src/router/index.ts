import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BooksPage from '@/pages/BooksPage.vue'
import CategoriesPage from "@/pages/CategoriesPage.vue"
import AuthorsPage from "@/pages/AuthorsPage.vue"
import UsersPage from "@/pages/UsersPage.vue"
import GetBookById from "@/components/Books/GetBookById.vue"
import EditBook from "@/components/Books/EditBook.vue"
import GetAuthor from "@/components/Author/GetAuthor.vue"
import EditAuthor from "@/components/Author/EditAuthor.vue"
import GetCategory from "@/components/Categories/GetCategory.vue"
import GetUser from "@/components/User/GetUser.vue"
import EditCategory from '@/components/Categories/EditCategory.vue'
import { Role } from '@/models/user/role'

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
		path: '/getauthorbyid/:id',
		name: 'GetAuthor',
		component: GetAuthor
	},
	{
		path: '/editauthor/:id',
		name: 'EditAuthor',
		component: EditAuthor
	},
	{
		path: '/categories/:id',
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
		component: EditCategory,
		meta: {
			requiresAuth: true,
		}
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	const role = localStorage.getItem('role');
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (role != Role.Admin) {
			alert("Bạn không có quyền truy cập trang");
			next({
				path: '/',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
