<template>
    <div class="relative bg-gray-50 min-h-screen">
        <div
            :class="[ isOpen ? 'w-56' : 'w-14' ]"
            class="absolute left-0 top-0 bottom-0 min-h-screen bg-secondary-100 overflow-x-hidden p-2 transform transition-width z-20">
                <div
                    @click="isOpen = !isOpen"
                    class="bg-secondary-400 text-gray-500 rounded-lg text-center max-w-max p-2 cursor-pointer">
                        <svg
                            :class="{ '-rotate-180' : isOpen }"
                            class="w-6 h-6 flex-none transform transition" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"/></svg>
                </div>

                <section class="mt-10 space-y-1">
                    <router-link
                        :to="{ name: 'Dashboard'}"
                        @click.native="closeSideMenu()"
                        exact-active-class="text-primary-300"
                        class="text-gray-400 text-center p-2 flex items-center space-x-3">
                            <svg class="w-6 h-6 flex-none" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M22.60107,2.062a1.00088,1.00088,0,0,0-.71289-.71289A11.25224,11.25224,0,0,0,10.46924,4.97217L9.35431,6.296l-2.6048-.62848A2.77733,2.77733,0,0,0,3.36279,7.0249L1.1626,10.9248A.99989.99989,0,0,0,1.82422,12.394l3.07275.65869a13.41952,13.41952,0,0,0-.55517,2.43409,1.00031,1.00031,0,0,0,.28466.83642l3.1001,3.1001a.99941.99941,0,0,0,.707.293c.02881,0,.05762-.00147.08692-.00391a12.16892,12.16892,0,0,0,2.49157-.49l.64368,3.00318a1.0003,1.0003,0,0,0,1.46924.66162l3.90527-2.20264a3.03526,3.03526,0,0,0,1.375-3.30371l-.6687-2.759,1.23706-1.13751A11.20387,11.20387,0,0,0,22.60107,2.062ZM3.57227,10.72314,5.12842,7.96338a.82552.82552,0,0,1,1.06982-.37549l1.71741.4162-.65.77179A13.09523,13.09523,0,0,0,5.67633,11.174Zm12.47021,8.22217L13.32666,20.477l-.4295-2.00464a11.33992,11.33992,0,0,0,2.41339-1.61987l.74353-.68366.40344,1.66462A1.041,1.041,0,0,1,16.04248,18.94531ZM17.65674,11.98l-3.68457,3.38623a9.77348,9.77348,0,0,1-5.17041,2.3042l-2.4043-2.4043a10.932,10.932,0,0,1,2.40088-5.206l1.67834-1.99268a.9635.9635,0,0,0,.07813-.09277L11.98975,6.271a9.27757,9.27757,0,0,1,8.80957-3.12012A9.21808,9.21808,0,0,1,17.65674,11.98Zm-.923-6.16376a1.5,1.5,0,1,0,1.5,1.5A1.49992,1.49992,0,0,0,16.7337,5.81622Z"/></svg>
                            <span :class="[ isOpen ? 'block' : 'hidden' ]" class="text-sm whitespace-nowrap">Dashboard</span>
                    </router-link>

                    <router-link
                        :to="{ name: 'Orders' }"
                        @click.native="closeSideMenu()"
                        exact-active-class="text-primary-300"
                        class="text-gray-400 text-center p-2 flex items-center space-x-3">
                            <svg class="w-6 h-6 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20.49,7.52a.19.19,0,0,1,0-.08.17.17,0,0,1,0-.07l0-.09-.06-.15,0,0h0l0,0,0,0a.48.48,0,0,0-.09-.11l-.09-.08h0l-.05,0,0,0L16.26,4.45h0l-3.72-2.3A.85.85,0,0,0,12.25,2h-.08a.82.82,0,0,0-.27,0h-.1a1.13,1.13,0,0,0-.33.13L4,6.78l-.09.07-.09.08L3.72,7l-.05.06,0,0-.06.15,0,.09v.06a.69.69,0,0,0,0,.2v8.73a1,1,0,0,0,.47.85l7.5,4.64h0l0,0,.15.06.08,0a.86.86,0,0,0,.52,0l.08,0,.15-.06,0,0h0L20,17.21a1,1,0,0,0,.47-.85V7.63S20.49,7.56,20.49,7.52ZM12,4.17l1.78,1.1L8.19,8.73,6.4,7.63Zm-1,15L5.5,15.81V9.42l5.5,3.4Zm1-8.11L10.09,9.91l5.59-3.47L17.6,7.63Zm6.5,4.72L13,19.2V12.82l5.5-3.4Z"/></svg>
                            <span :class="[ isOpen ? 'block' : 'hidden' ]" class="text-sm whitespace-nowrap">I miei acquisti</span>
                    </router-link>

                    <router-link
                        :to="{ name: 'Reviews' }"
                        @click.native="closeSideMenu()"
                        exact-active-class="text-primary-300"
                        class="text-gray-400 text-center p-2 flex items-center space-x-3">
                            <svg class="w-6 h-6 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10,13H3a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,20H4V15H9ZM21,2H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,21,2ZM20,9H15V4h5Zm1,4H14a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V14A1,1,0,0,0,21,13Zm-1,7H15V15h5ZM10,2H3A1,1,0,0,0,2,3v7a1,1,0,0,0,1,1h7a1,1,0,0,0,1-1V3A1,1,0,0,0,10,2ZM9,9H4V4H9Z"/></svg>
                            <span :class="[ isOpen ? 'block' : 'hidden' ]" class="text-sm whitespace-nowrap">Le mie recensioni</span>
                    </router-link>

                    <router-link
                        :to="{ name: 'Favourites' }"
                        @click.native="closeSideMenu()"
                        exact-active-class="text-primary-300"
                        class="text-gray-400 text-center p-2 flex items-center space-x-3">
                            <svg class="w-6 h-6 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"/></svg>
                            <span :class="[ isOpen ? 'block' : 'hidden' ]" class="text-sm whitespace-nowrap">Libri salvati</span>
                    </router-link>

                    <router-link
                        :to="{ name: 'Settings'}"
                        @click.native="closeSideMenu()"
                        exact-active-class="text-primary-300"
                        class="text-gray-400 text-center p-2 flex items-center space-x-3">
                            <svg class="w-6 h-6 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.9,12.66a1,1,0,0,1,0-1.32L21.18,9.9a1,1,0,0,0,.12-1.17l-2-3.46a1,1,0,0,0-1.07-.48l-1.88.38a1,1,0,0,1-1.15-.66l-.61-1.83A1,1,0,0,0,13.64,2h-4a1,1,0,0,0-1,.68L8.08,4.51a1,1,0,0,1-1.15.66L5,4.79A1,1,0,0,0,4,5.27L2,8.73A1,1,0,0,0,2.1,9.9l1.27,1.44a1,1,0,0,1,0,1.32L2.1,14.1A1,1,0,0,0,2,15.27l2,3.46a1,1,0,0,0,1.07.48l1.88-.38a1,1,0,0,1,1.15.66l.61,1.83a1,1,0,0,0,1,.68h4a1,1,0,0,0,.95-.68l.61-1.83a1,1,0,0,1,1.15-.66l1.88.38a1,1,0,0,0,1.07-.48l2-3.46a1,1,0,0,0-.12-1.17ZM18.41,14l.8.9-1.28,2.22-1.18-.24a3,3,0,0,0-3.45,2L12.92,20H10.36L10,18.86a3,3,0,0,0-3.45-2l-1.18.24L4.07,14.89l.8-.9a3,3,0,0,0,0-4l-.8-.9L5.35,6.89l1.18.24a3,3,0,0,0,3.45-2L10.36,4h2.56l.38,1.14a3,3,0,0,0,3.45,2l1.18-.24,1.28,2.22-.8.9A3,3,0,0,0,18.41,14ZM11.64,8a4,4,0,1,0,4,4A4,4,0,0,0,11.64,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,11.64,14Z"/></svg>
                            <span :class="[ isOpen ? 'block' : 'hidden' ]" class="text-sm whitespace-nowrap">Impostazioni</span>
                    </router-link>

                    <button
                        class="text-gray-400 text-center p-2 flex items-center space-x-3"
                        @click="logout()">
                            <svg class="w-6 h-6 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z"/></svg>
                            <span :class="[ isOpen ? 'block' : 'hidden' ]" class="text-sm whitespace-nowrap">Logout</span>
                    </button>
                </section>
        </div>

        <transition name="fade">
            <router-view
                class="pb-20 pl-14 md:pl-10 lg:pl-6"
                :key="$route.path">
            </router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Dashboard.Layout',
    mounted() {
        this.getFavourites()
        this.getCartItems()
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        favourites() {
            return this.$store.getters['favourites/favourites']
        }
    },
    methods: {
        getFavourites() {
            this.$store.dispatch('favourites/getFavourites')
        },
        getCartItems() {
            this.$store.dispatch('cart/getCartItems')
        },
        logout() {
            this.closeSideMenu()
            this.$store.dispatch('favourites/emptyFavourites')
            this.$store.dispatch('cart/emptyCart')
            this.$store.dispatch('auth/logout')
        },
        closeSideMenu() {
            this.isOpen = false
        }
    }
}
</script>