import api from '@/apis/api'

export const getFavourites = async ({commit}) => {
    try {
        const res = await api.get('favourites')
        if (res.status === 200) {
            commit('GET_FAVOURITES', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const addToFavourite = async ({commit}, {book}) => {
    try {
        const res = await api.post('favourites/' + book.id)
        if (res.status === 200) {
            commit('ADD_TO_FAVOURITE', book)
        }
    } catch (error) {
        console.log(error)
    }
}

export const removeFromFavourite = async ({commit}, {book}) => {
    try {
        const res = await api.delete('favourites/' + book.id)
        if (res.status === 200) {
            commit('REMOVE_FROM_FAVOURITE', book)
        }
    } catch (error) {
        console.log(error)
    }
}

export const emptyFavourites = async ({commit}) => {
    commit('GET_FAVOURITES', [])
}

