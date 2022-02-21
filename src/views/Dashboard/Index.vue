<template>
    <div>
        <div v-if="user" class="md:flex md:items-start md:space-x-4 my-10">
            <userImage
                :user="user"
                class="w-full md:w-44"
            />

            <div class="mt-4 md:mt-0">
                <p>{{ user.name }}</p>
                <p class="text-sm text-gray-400">{{ user.email }}</p>
            </div>
        </div>

        <div class="flex flex-col space-y-1 text-sm">
            <router-link
                :to="{ name: 'User.edit' }"
                class="block"
            >
                    Impostazioni
            </router-link>
            
            <router-link :to="{ name: 'Orders' }" class="block">
                I mei acquisti
            </router-link>

            <router-link  :to="{ name: 'Favourites' }" class="block">
                Libri salvati
            </router-link>

            <router-link :to="{ name: 'Reviews' }" class="block">
                Recensioni
            </router-link>
        </div>
    </div>
</template>

<script>
import userImage from '@/components/userImage'

export default {
    name: 'Dashboard.Index',
    components: {
        userImage
    },
    mounted() {
        this.getFavourites()
        this.getCartItems()
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
        favourites() {
            return this.$store.getters['favourites/favourites']
        },
    },
    methods: {
        getFavourites() {
            this.$store.dispatch('favourites/getFavourites')
        },
        getCartItems() {
            this.$store.dispatch('cart/getCartItems')
        },
    }
}
</script>