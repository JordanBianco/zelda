import api from '@/apis/api'

export const getGenres = async ({commit}) => {
    try {
        const res = await api.get('genres')
        if (res.status === 200) {
            commit('GET_GENRES', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getGenreBooks = async ({commit}, {id}) => {
    commit('GET_GENRE_BOOKS', null)
    try {
        const res = await api.get('genres/' + id + '/books')
        if (res.status === 200) {
            commit('GET_GENRE_BOOKS', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getGenre = async ({commit}, {id}) => {
    commit('GET_GENRE', null)
    try {
        const res = await api.get('genres/' + id)
        if (res.status === 200) {
            commit('GET_GENRE', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}