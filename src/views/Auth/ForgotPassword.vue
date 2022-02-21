<template>
    <div>
        <form
            @submit.prevent="forgotPassword"
            class="mt-10 mx-auto md:w-80">
            
            <div class="text-center mb-6">
                <h2 class="text-lg text-gray-600 font-semibold mb-1">Password dimenticata?</h2>
                <p class="text-gray-500 text-xs">Inserisci la tua email</p>
            </div>
            
            <errorMessages
                :errors="errors"
            />
            
            <div class="mb-6">
                <label for="email" class="text-xs text-gray-400 mb-1 block">Indirizzo email</label>
                <input
                    v-model="email"
                    type="email"
                    name="email"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>
            
            <baseButton
                text="Invia email"
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
            email: '',
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
        forgotPassword() {
            this.$store.dispatch('auth/forgotPassword', { email: this.email })
        },
        clearErrors() {
            this.$store.dispatch('auth/clearErrors')
        }
    }
}
</script>