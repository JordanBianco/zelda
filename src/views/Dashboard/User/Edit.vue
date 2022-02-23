<template>
    <div>
        <breadcrumb
            :routes="[{ name: 'Dashboard', text: 'Dashboard' }]"
            current="modifica profilo"
        />

        <div class="mb-10 border-b flex items-center overflow-x-auto">
            <div
                @click="view = 'user'"
                :class="[ view == 'user' ? 'border-b border-primary-300 text-gray-600' : 'text-gray-400' ]"
                class="p-3 text-sm cursor-pointer transition">
                    Informazioni
            </div>
            <div
                @click="view = 'password'"
                :class="[ view == 'password' ? 'border-b border-primary-300 text-gray-600' : 'text-gray-400' ]"
                class="p-3 text-sm cursor-pointer transition">
                    Password
            </div>
            <div
                @click="view = 'image'"
                :class="[ view == 'image' ? 'border-b border-primary-300 text-gray-600' : 'text-gray-400' ]"
                class="p-3 text-sm cursor-pointer transition whitespace-nowrap">
                    Immagine profilo 
            </div>
            <div
                @click="view = 'deleteAccount'"
                :class="[ view == 'deleteAccount' ? 'border-b border-primary-300 text-gray-600' : 'text-gray-400' ]"
                class="p-3 text-sm cursor-pointer transition whitespace-nowrap">
                    Elimina account 
            </div>
        </div>

        <form v-if="view == 'user'" @submit.prevent="updateUser">
                        
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

            <baseButton
                text="Salva"
                class="px-4"
            />
        </form>

        <form v-if="view == 'password'" @submit.prevent="updatePassword">
                        
            <errorMessages
                :errors="errors"
            />
            
            <div class="mb-6">
                <label for="old" class="text-xs text-gray-400 mb-1 block">Vecchia Password</label>
                <input
                    v-model="password.old"
                    type="password"
                    name="old"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>

            <div class="mb-6">
                <label for="new" class="text-xs text-gray-400 mb-1 block">Nuova Password</label>
                <input
                    v-model="password.new"
                    type="password"
                    name="new"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>

            <div class="mb-6">
                <label for="new_confirmation" class="text-xs text-gray-400 mb-1 block">Conferma Password</label>
                <input
                    v-model="password.new_confirmation"
                    type="password"
                    name="new_confirmation"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />
            </div>

            <baseButton
                text="Salva"
                class="px-4"
            />
        </form>

        <form v-if="view == 'image'" @submit.prevent="updateImage">
                        
            <errorMessages
                :errors="errors"
            />
            
            <div class="mb-6">
                <input
                    @change="onFileChange"
                    type="file"
                    name="image"
                    class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                />

                <img
                    class="w-64 mt-8"
                    v-if="preview"
                    :src="preview" />
            </div>

            <baseButton
                text="Salva"
                class="px-4"
            />
        </form>

        <form v-if="view == 'deleteAccount'" @submit.prevent="deleteAccount">
            <p class="text-gray-400 text-sm mb-6">Una volta eliminato il tuo account, perderai tutti i dati.</p>           
            <button
                type="submit"
                class="border border-red-400 text-red-400 transition focus:outline-none text-sm p-2">
                    Elimina
            </button>
        </form>
    </div>
</template>

<script>
import breadcrumb from '@/components/Elements/breadcrumb'
import errorMessages from '@/components/Elements/errorMessages'
import baseButton from '@/components/Elements/baseButton'

export default {
    name: 'Edit.Info',
    components: {
        errorMessages,
        baseButton,
        breadcrumb
    },
    watch: {
        "view" : {
            handler() {
                this.$store.dispatch('auth/clearErrors')
            }
        },
        "route" : {
            handler() {
                this.$store.dispatch('auth/clearErrors')
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            view: 'user',
            password: {
                old: '',
                new: '',
                new_confirmation: '',
            },
            image: '',
            preview: ''
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
        errors() {
            return this.$store.getters['auth/errors']
        },
    },
    methods: {
        updateUser() {
            this.$store.dispatch('auth/updateUser', { user: this.user })
        },
        updatePassword() {
            this.$store.dispatch('auth/updatePassword', { password: this.password })
        },
        updateImage() {
            var formData = new FormData();
            formData.append("image", this.image);
            this.$store.dispatch('auth/updateImage', formData)
        },
        onFileChange(e) {
            this.image = e.target.files[0];
            this.preview = URL.createObjectURL(this.image);
        },
        deleteAccount() {
            if (confirm('Sicuro?')) {
                this.$store.dispatch('auth/deleteAccount')
            }
        }
    }
}
</script>