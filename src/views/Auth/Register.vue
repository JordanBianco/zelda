<template>
    <div>
        <form
            @submit.prevent="register"
            class="mt-10 mx-auto md:w-80">

            <div class="text-center mb-10">
                <h2 class="text-lg text-gray-700 font-semibold mb-1">Registrati</h2>
                <p class="text-gray-500 text-xs">Registrati e ipsum dolor sit amet. ipsum dolor sit amet consectetur.</p>
            </div>
            
            <errorMessages
                :errors="errors"
            />

            <div class="mb-6">
                <label for="name" class="text-xs text-gray-400 mb-1 block">Nome</label>
                <input
                    v-model="user.name"
                    type="text"
                    name="name"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>
            
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

            <div class="mb-6">
                <label for="password_confirmation" class="text-xs text-gray-400 mb-1 block">Conferma password</label>
                <input
                    v-model="user.password_confirmation"
                    type="password"
                    name="password_confirmation"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>
            
            <baseButton
                text="Registrati"
                class="w-full"
            />
        </form>
    </div>
</template>

<script>
import baseButton from '@/components/Elements/baseButton'
import errorMessages from '@/components/Elements/errorMessages'

export default {
    name: 'Rgister',
    components: {
        baseButton,
        errorMessages
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
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
        register() {
            if (this.errors.length != 0) {
                this.$store.dispatch('auth/clearErrors')
            }
            this.$store.dispatch('auth/register', { user: this.user })
        },
        clearErrors() {
            this.$store.dispatch('auth/clearErrors')
        }
    }
}
</script>