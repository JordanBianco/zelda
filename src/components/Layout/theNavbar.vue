<template>
    <div>
        <nav class="bg-white py-5 border-b border-gray-100">
            <div class="px-5 md:px-10 lg:px-20 flex items-center justify-between">
            
                <div class="w-1/3 md:hidden">
                    <svg @click="toggleSidemenu()" class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                </div>

                <div class="w-1/3 justify-center md:justify-start flex items-baseline md:space-x-4">
                    <router-link
                        class="text-secondary-100 tracking-widest text-xl"
                        :to="{ name: 'Books' }">
                            <h1>Zelda</h1>
                    </router-link>

                    <router-link
                        class="text-gray-400 hidden md:block"
                        exact-active-class="text-primary-300"
                        :to="{ name: 'Books' }">
                            Libri
                    </router-link>
                </div>

                <div class="w-1/3 flex items-center justify-end space-x-2">
                    <router-link
                        v-if="!isAuth"
                        class="block text-gray-400"
                        exact-active-class="text-primary-300"
                        @click.native="toggleMenu()"
                        :to="{ name: 'Login' }">
                            <svg class="w-4.5 h-4.5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>
                    </router-link>

                    <userDashboardMenu v-else />                    
                    
                    <shoppingCart />
                </div>
            </div>
        </nav>

        <aside
            :class="{ '-translate-x-full' : ! showSidemenu }"
            class="bg-white fixed left-0 top-0 bottom-0 transform transition ease-linear w-full xs:w-3/5 md:w-1/3 z-40">
                <header class="flex p-6 text-gray-400">
                    <svg
                        @click="toggleSidemenu()"
                        class="w-5 h-5 flex-none hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                </header>
                <div class="p-5">
                    <router-link
                        class="text-gray-400"
                        exact-active-class="text-primary-300"
                        :to="{ name: 'Books' }">
                            Libri
                    </router-link>
                </div>

                <div class="bg-secondary-100 p-5 text-xs text-gray-300 absolute bottom-0 w-full">
                    Unicons by <a class="text-primary-300" href="https://iconscout.com/">Iconscout</a>
                </div>
        </aside>

        <div
            v-if="showSidemenu"
            @click="toggleSidemenu()"
            class="fixed inset-0 bg-black opacity-20 z-10"></div>
    </div>
</template>

<script>
import userDashboardMenu from '@/components/Layout/userDashboardMenu'
import shoppingCart from '@/components/Layout/shoppingCart'


export default {
    name: 'theNavbar',
    components: {
        shoppingCart,
        userDashboardMenu
    },
    data() {
        return {
            showMenu: false,
            showSidemenu: false
        }
    },
    computed: {
        isAuth() {
            return this.$store.getters['auth/is_auth']
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = ! this.showMenu
        },
        toggleSidemenu() {
            this.showSidemenu = ! this.showSidemenu
        },
    }
}
</script>