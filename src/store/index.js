import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

import auth from '@/store/modules/auth'

import books from '@/store/modules/books'
import genres from '@/store/modules/genres'
import favourites from '@/store/modules/favourites'
import notifications from '@/store/modules/notifications'
import cart from '@/store/modules/cart'
import orders from '@/store/modules/orders'
import reviews from '@/store/modules/reviews'

const dataState = createPersistedState({
	paths: [
		'auth.is_auth',
		'auth.user',
		'auth.token',
	],
	storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
	},
})

export default new Vuex.Store({
	modules: {
		auth,
		books,
		genres,
		favourites,
		notifications,
		cart,
		orders,
		reviews
	},
	plugins: [dataState],
})
