import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	// Auth
	{
		path: '/login',
		name: 'Login',
		component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue'),
		meta: { guest : true }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register.vue'),
		meta: { guest : true }
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: () => import(/* webpackChunkName: "forgotPassword" */ '../views/Auth/ForgotPassword.vue'),
		meta: { guest : true }
	},
	{
		path: '/reset-password',
		name: 'ResetPassword',
		component: () => import(/* webpackChunkName: "resetPassword" */ '../views/Auth/ResetPassword.vue'),
		meta: { guest : true }
	},
	// Books
	{
		path: '/',
		name: 'Book.index',
		component: () => import(/* webpackChunkName: "bookIndex" */ '../views/Book/Index.vue')
	},
	{
		path: '/books/:id',
		name: 'Book.show',
		component: () => import(/* webpackChunkName: "bookShow" */ '../views/Book/Show.vue'),
		props(route) {
			const props = { ...route.params }
			props.id = +props.id
			return props
		},
	},
	// Vedere tutte le recensioni
	{
		path: '/books/:id/reviews',
		name: 'Book.reviews',
		component: () => import(/* webpackChunkName: "bookReviews" */ '../views/Book/Reviews.vue'),
		props(route) {
			const props = { ...route.params }
			props.id = +props.id
			return props
		},
	},
	// Genres
	{
		path: '/genres/:id',
		name: 'Genre.show',
		component: () => import(/* webpackChunkName: "genreShow" */ '../views/Genre/Show.vue'),
		props(route) {
			const props = { ...route.params }
			props.id = +props.id
			return props
		},
	},
	// Dashboard
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Index.vue'),
		meta: { auth : true }
	},
	{
		path: '/orders',
		name: 'Orders',
		component: () => import(/* webpackChunkName: "orders" */ '../views/Dashboard/Orders.vue'),
		meta: { auth : true }
	},
	{
		path: '/favourites',
		name: 'Favourites',
		component: () => import(/* webpackChunkName: "favourites" */ '../views/Dashboard/Favourites.vue'),
		meta: { auth : true }
	},
	{
		path: '/reviews',
		name: 'Reviews',
		component: () => import(/* webpackChunkName: "reviews" */ '../views/Dashboard/Reviews.vue'),
		meta: { auth : true }
	},
	// User
	{
		path: '/user/edit',
		name: 'User.edit',
		component: () => import(/* webpackChunkName: "userEdit" */ '../views/Dashboard/User/Edit.vue'),
		meta: { auth : true }
	},
	// {
	// 	path: '/publish',
	// 	name: 'Publish',
	// 	component: () => import(/* webpackChunkName: "publish" */ '../views/Publish.vue'),
	// 	meta: { auth : true }
	// },
	
	// Shop
	{
		path: '/cart',
		name: 'Cart',
		component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
		meta: { auth : true }
	},
	{
		path: '/checkout',
		name: 'Checkout',
		component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue'),
		meta: { auth : true, cart: true }
	},
]

const router = new VueRouter({
	routes,
	base: 'zelda',
	mode: 'history',
	scrollBehavior: (to, from, savedPosition) => {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				selector: to.hash
			};
		} else {
			return { x: 0, y: 0 };
		}
	},
})

router.beforeEach((to, from, next) => {
	if (to.meta.auth) {

		if (store.getters['auth/is_auth']) {

			if (to.meta.cart) {
				if (store.getters['cart/items'].length == 0) {
					next({ name: 'Book.index' })
				} else {
					next()
				}
			}
			
			next()
		} else {
			next({ name: 'Login' })
		}
	} else if (to.meta.guest) {
		if (store.getters['auth/is_auth']) {
			next({ name: 'Dashboard' })
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
