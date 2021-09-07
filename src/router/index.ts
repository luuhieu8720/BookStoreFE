import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BooksPage from '@/pages/BooksPage.vue'
import CategoriesPage from "@/pages/CategoriesPage.vue"
import AuthorsPage from "@/pages/AuthorsPage.vue"
import UsersPage from "@/pages/UsersPage.vue"
import BookDetailPage from "@/components/Books/GetBookById.vue"
import EditBook from "@/components/Books/EditBook.vue"
import AuthorDetailPage from "@/components/Author/GetAuthor.vue"
import AuthorEditPage from "@/components/Author/EditAuthor.vue"
import CategoryDetailPage from "@/components/Categories/GetCategory.vue"
import UserDetailPage from "@/components/User/GetUser.vue"
import CategoryEditPage from '@/components/Categories/EditCategory.vue'
import { Role } from '@/models/user/role'
import useNotification from '@/logics/notification.logic'

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
		path: '/books/:id?',
		name: 'BookDetail',
		component: BookDetailPage
	},
	{
		path: '/editbook/:id?',
		name: 'EditBook',
		component: EditBook
	},
	{
		path: '/authors/:id',
		name: 'AuthorDetail',
		component: AuthorDetailPage
	},
	{
		path: '/authors/:id/edit',
		name: 'AuthorEdit',
		component: AuthorEditPage
	},
	{
		path: '/categories/:id',
		name: 'CategoryDetail',
		component: CategoryDetailPage
	},
	{
		path: '/users/:id',
		name: 'UserDetail',
		component: UserDetailPage
	},
	{
		path: '/categories/:id/edit',
		name: 'CategoryEdit',
		component: CategoryEditPage,
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
