<template>
    <div>
        <form
            @submit.prevent="resetPassword"
            class="mt-10 mx-auto md:w-80">
            
            <div class="text-center mb-8">
                <h2 class="text-lg text-gray-600 font-semibold mb-1">Password Reset</h2>
                <p class="text-gray-500 text-xs">Inserisci una nuova password</p>
            </div>
            
            <errorMessages
                :errors="errors"
            />
            
            <div class="mb-6">
                <label for="password" class="text-sm text-gray-400 mb-1 block">Password</label>
                <input
                    v-model="data.password"
                    type="password"
                    name="password"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-300 transition p-3 text-sm"
                />
            </div>

            <div class="mb-6">
                <label for="password_confirmation" class="text-sm text-gray-400 mb-1 block">Conferma Password</label>
                <input
                    v-model="data.password_confirmation"
                    type="password"
                    name="password_confirmation"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-300 transition p-3 text-sm"
                />
            </div>
            
            <baseButton
                text="Conferma"
                class="w-full"
            />
        </form>
    </div>
</template>

<script>
import baseButton from '@/components/Elements/baseButton'
import errorMessages from '@/components/Elements/errorMessages'

export default {
    name: 'ForgotPassword',
    components: {
        baseButton,
        errorMessages
    },
    data() {
        return {
            data: {
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
        resetPassword() {
            this.$store.dispatch('auth/resetPassword', {
                data: this.data,
                token: this.$route.query.token
            })
        },
        clearErrors() {
            this.$store.dispatch('auth/clearErrors')
        }
    }
}
</script>