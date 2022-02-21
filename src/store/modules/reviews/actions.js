import api from '@/apis/api'

export const getReviews = async ({commit}) => {
    try {
        const res = await api.get('reviews')
        if (res.status === 200) {
            commit('GET_REVIEWS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const storeReview = async ({commit}, {id, review}) => {
    try {
        const res = await api.post('books/' + id + '/reviews', {
            book_id: id,
            title: review.title,
            rating: review.rating,
            body: review.body,
        })

        if (res.status === 201) {
            commit('ADD_REVIEWED', id)
            commit('SET_SUCCESS_STATUS', true)
            commit('notifications/ADD_NOTIFICATION', { message: 'Grazie per aver lasciato una recensione' }, { root:true})
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateReview = async ({commit}, {review}) => {
    try {
        const res = await api.patch('reviews/' + review.id + '/update', {
            title: review.title,
            rating: review.rating,
            body: review.body,
        })

        if (res.status === 200) {
            commit('SET_SUCCESS_STATUS', true)
            commit('notifications/ADD_NOTIFICATION', { message: 'Recensione modificata' }, { root:true})
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deleteReview = async ({commit}, {id, index}) => {
    try {
        const res = await api.delete('reviews/' + id + '/delete')

        if (res.status === 200) {
            commit('notifications/ADD_NOTIFICATION', { message: 'Recensione eliminata' }, { root:true})
            commit('DELETE_REVIEW', index)
        }
    } catch (error) {
        console.log(error)
    }
}

export const toggleShow = ({commit}, value) => {
    commit('TOGGLE_SHOW', value)
}

export const setSuccessStatus = ({commit}, value) => {
    commit('SET_SUCCESS_STATUS', value)
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}

