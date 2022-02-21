import axios from 'axios'
import store from '@/store'
// import router from '@/router'

const api = axios.create({
	// baseURL: 'http://localhost:8000/api',
	baseURL: 'https://zelda-library.herokuapp.com/api',
	withCredentials: true
});

api.interceptors.request.use(function(config) {
	const token = store.getters['auth/token'];
	if(token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, function(err) {
	return Promise.reject(err);
});

// api.interceptors.response.use(function (response) {
//     return response
// }, function (error) {
//     if (error.response.status === 403) {
// 		router.push({ name: 'Dashboard' })  
//     }
//     // if (error.response.status === 403) {
//     //     router.push({ name: 'Dashboard' })
//     // }
//     // if (error.response.status === 404) {
//     //     // TODO: NOT FOUND PAGE
//     //     router.push({
//     //         name: 'Dashboard'
//     //     });
//     // }
//     return Promise.reject(error)
// })

export default api;