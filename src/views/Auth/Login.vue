<template>
    <div>
        <form
            @submit.prevent="login"
            class="mt-10 mx-auto md:w-80">
            
            <div class="text-center mb-10">
                <h2 class="text-lg text-gray-600 font-semibold mb-1">Accedi</h2>
                <p class="text-gray-500 text-xs">Non hai un account? <router-link :to="{ name: 'Register' }">Registrati</router-link></p>
            </div>
            
            <errorMessages
                :errors="errors"
            />
            
            <div class="mb-6">
                <label for="email" class="text-xs text-gray-400 mb-1 block">Indirizzo email</label>
                <input
                    v-model="user.email"
                    type="email"
                    name="email"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>

            <div class="mb-6">
                <label for="password" class="text-xs text-gray-400 mb-1 block">Password</label>
                <input
                    v-model="user.password"
                    type="password"
                    name="password"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>
            
            <baseButton
                text="Accedi"
                class="w-full"
            />

            <router-link
                :to="{ name: 'ForgotPassword' }"
                class="text-xs text-gray-400 hover:underline text-right block mt-1.5">
                    Password dimenticata?
            </router-link>
        </form>
    </div>
</template>

<script>
import baseButton from '@/components/Elements/baseButton'
import errorMessages from '@/components/Elements/errorMessages'

export default {
    name: 'Login',
    components: {
        baseButton,
        errorMessages
    },
    data() {
        return {
            user: {
                email: 'user@example.com',
                password: 'password'
            }
        }
    },
    watch: {
        "this.$route": {
            handler() {
                this.clearErrors()
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        errors() {
            return this.$store.getters['auth/errors']
        },
    },
    methods: {
        login() {
            if (this.errors.length != 0) {
                this.$store.dispatch('auth/clearErrors')
            }
            this.$store.dispatch('auth/login', { user: this.user })
        },
        clearErrors() {
            this.$store.dispatch('auth/clearErrors')
        }
    }
}
</script>