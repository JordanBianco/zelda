import api from '@/apis/api'
// import router from '@/router'

export const getBooks = async ({commit}, {search, filters, sort, page}) => {
    if (filters) {
        try {
            const res = await api.get(
                'books?search=' + search
                + '&min_price=' + filters.min_price
                + '&max_price=' + filters.max_price
                + '&min_total_pages=' + filters.min_total_pages
                + '&max_total_pages=' + filters.max_total_pages
                + '&min_first_published=' + filters.min_first_published
                + '&max_first_published=' + filters.max_first_published
                + '&status=' + filters.status
                + '&min_avg=' + filters.min_avg
                + '&cover=' + filters.cover
                + '&genres=' + filters.genres
                + '&sort=' + sort
                + '&page=' + page
            )
            if (res.status === 200) {
                commit('GET_BOOKS', res.data)
            }
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            const res = await api.get(
                'books?search=' + search
                + '&sort=' + sort
                + '&page=' + page
            )
            if (res.status === 200) {
                commit('GET_BOOKS', res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getBook = async ({commit}, {id}) => {
    commit('GET_BOOK', null)
    try {
        const res = await api.get('books/' + id)
        if (res.status === 200) {
            commit('GET_BOOK', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getSimilarBooks = async ({commit}, {id}) => {
    commit('GET_SIMILAR_BOOKS', null)
    try {
        const res = await api.get('books/' + id + '/similar')
        if (res.status === 200) {
            commit('GET_SIMILAR_BOOKS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getReviews = async ({commit}, {id, rating, sort}) => {
    if (rating) {
        try {
            const res = await api.get('books/' + id + '/reviews?rating=' + rating + '&sort=' + sort)
            if (res.status === 200) {
                commit('GET_SELECTED_REVIEWS', res.data.data)
            }
        } catch (error) {
            console.log(error)
        } 
    } else {
        try {
            const res = await api.get('books/' + id + '/reviews?sort=' + sort)
            if (res.status === 200) {
                commit('GET_SELECTED_REVIEWS', [])
                commit('GET_REVIEWS', res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
}

export const storeBook = async ({commit}, {book}) => {
    try {
        const res = await api.post('books', book)
        // if (res.status === 201) {
            console.log(res)
            // router.push({ name: 'Book.show', params: { id: res.data.data.id }})
        // }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}