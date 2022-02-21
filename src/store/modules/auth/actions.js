import api from '@/apis/api'
import router from '@/router'

export const getUser = async ({commit}) => {
    try {
        const res = await api.get('user')
        if (res.status === 200) {
            commit('SET_USER', res.data.data)
        }
    } catch (error) {
        console.log(error)
    }
}

export const register = async ({commit}, {user}) => {
    try {
        const res = await api.post('register', {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation
        })
        if (res.status === 201) {
            router.push({ name: 'Login' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const login = async ({commit}, {user}) => {
    try {
        const res = await api.post('login', {
            email: user.email,
            password: user.password
        })
        if (res.status === 200) {
            commit('SET_AUTH_STATUS', true)
            commit('SET_TOKEN', res.data.token)
            commit('SET_USER', res.data.user)
            router.push({ name: 'Dashboard' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const logout = async ({commit}) => {
    try {
        const res = await api.post('logout')
        if (res.status === 200) {
            commit('SET_AUTH_STATUS', false)
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
            router.push({ name: 'Book.index' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const forgotPassword = async ({commit}, {email}) => {
    try {
        const res = await api.post('forgot-password', { email: email })
        if (res.status === 200) {
            commit('notifications/ADD_NOTIFICATION', { message: 'Email inviata con successo!' }, { root:true})
            commit('SET_ERRORS', [])
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const resetPassword = async ({commit}, {data, token}) => {
    try {
        const res = await api.post('reset-password', {
            password: data.password,
            password_confirmation: data.password_confirmation,
            token: token,
        })
        if (res.status === 200) {
            commit('notifications/ADD_NOTIFICATION', { message: 'Password cambiata con successo!' }, { root:true})
            commit('SET_ERRORS', [])
            router.push({ name: 'Login' })
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateUser = async ({commit}, {user}) => {
    try {
        const res = await api.patch('user', {
            name: user.name,
            email: user.email
        })

        if (res.status === 200) {
            commit('notifications/ADD_NOTIFICATION', { message: 'Utente aggiornato!' }, { root:true})
            commit('SET_ERRORS', [])
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updatePassword = async ({commit}, {password}) => {
    try {
        const res = await api.patch('user/password', {
            old: password.old,
            new: password.new,
            new_confirmation: password.new_confirmation,
        })

        if (res.status === 200) {
            commit('notifications/ADD_NOTIFICATION', { message: 'Password aggiornata!' }, { root:true})
            commit('SET_ERRORS', [])
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const updateImage = async ({commit}, formData) => {
    try {
        const res = await api.post('user/image', formData)
        if (res.status === 201) {
            commit('notifications/ADD_NOTIFICATION', { message: 'Immagine cambiata!' }, { root:true})
            commit('SET_ERRORS', [])
        }
    } catch (error) {
        if (error.response.status === 422) {
            commit('SET_ERRORS', error.response.data.errors)
        }
    }
}

export const deleteAccount = async ({commit}) => {
    try {
        const res = await api.delete('user/')
        if (res.status === 200) {
            commit('SET_AUTH_STATUS', false)
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
            router.push({ name: 'Book.index' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const clearErrors = ({commit}) => {
    commit('SET_ERRORS', [])
}