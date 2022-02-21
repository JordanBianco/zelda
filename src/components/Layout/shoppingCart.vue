<template>
    <div>
        <div class="flex items-center relative">
            <svg
                @click="toggleCartItems()"
                class="w-5 h-5 flex-none cursor-pointer text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"/></svg>
            
            <div v-if="items.length > 0" class="absolute -right-3 -top-2 border-2 border-white w-5 h-5 text-xxs text-white bg-primary-300 rounded-full flex items-center justify-center">
                {{ items.length }}
            </div>
        </div>

        <aside
            :class="{ 'translate-x-full' : !showCartItems }"
            class="fixed top-0 right-0 bottom-0 bg-white w-full xs:w-72 z-30 transform transition overflow-x-hidden ease-linear p-4 pt-6">
                <header class="flex justify-between mb-8 text-gray-400 text-sm">
                    <span>Il mio carrello</span>
                    <svg
                        @click="toggleCartItems()"
                        class="w-5 h-5 flex-none hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                </header>
                
                <div
                    v-for="(item, index) in items"
                    :key="item.id"
                    class="mb-8">
                        <div class="flex space-x-3">
                            <router-link
                                @click.native="toggleCartItems()"
                                :to="{ name: 'Book.show', params: { id : item.book.id } }"
                                class="h-24 w-16 block flex-none">
                                    <img
                                        class="object-cover w-full h-full shadow-lg"
                                        src="https://source.unsplash.com/random"
                                        alt="">
                            </router-link>
                            <div class="flex flex-col justify-between w-full">
                                
                                <div>
                                    <p class="leading-tight text-xs mb-1 text-gray-600">{{ item.book.title }}</p>
                                    <router-link
                                        v-for="author in item.book.authors"
                                        :key="author.id"
                                        to=""
                                        class="block text-xs leading-tight text-gray-400 hover:text-gray-600">
                                            {{ author.name }}
                                    </router-link>
                                </div>

                                <p class="text-gray-400 text-sm">x{{ item.quantity }}</p>
                                
                                <footer class="text-sm flex justify-between items-center">
                                    <span class="block text-primary-300">€{{ item.book.price }},00</span>
                                    <div class="flex items-center space-x-0.5">
                                        <div
                                            @click="removeFromCart(item.book, index)"
                                            title="Rimuovi dal carrello">
                                                <svg class="w-4 h-4 flex-none text-gray-400 hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                        </div>
                                        <div
                                            @click="moveToFavourite(item.book, index)"
                                            title="Salva">
                                                <svg class="w-4 h-4 flex-none text-gray-400 hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"/></svg>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                </div>

                <div v-if="items.length > 0" class="mt-10">
                    <router-link
                        @click.native="toggleCartItems()"
                        :to="{ name: 'Cart' }"
                        class="text-xs mb-1 text-gray-400 hover:text-gray-600 transition text-right block">
                            modifica carrello
                    </router-link>
                    <router-link
                        @click.native="toggleCartItems()"
                        :to="{ name: 'Checkout' }"
                        class="block bg-secondary-100 hover:bg-secondary-200 p-3 text-center text-sm text-white transition cursor-pointer">
                            Procedi al pagamento
                    </router-link>
                </div>
        </aside>

        <div
            v-if="showCartItems"
            @click="toggleCartItems()"
            class="fixed inset-0 bg-black opacity-20 z-10"></div>
    </div>
</template>

<script>
export default {
    name: 'shoppingCart',
    data() {
        return {
            showCartItems: false
        }
    },
    computed: {
        isAuth() {
            return this.$store.getters['auth/is_auth']
        },
        items() {
            return this.$store.getters['cart/items']
        },
        favourites() {
            return this.$store.getters['favourites/favourites']
        }
    },
    methods: {
        toggleCartItems() {
            if (! this.isAuth) {
                if (this.$route.name != 'Login') {
                    this.$router.push({ name: 'Login' })
                }
                return
            }
            this.showCartItems = ! this.showCartItems
        },
        removeFromCart(book, index) {
            this.$store.dispatch('cart/removeFromCart', {
                book: book,
                index: index    
            })
        },
        moveToFavourite(book, index) {
            this.removeFromCart(book, index)

            let inFavourite = this.favourites.find(b => {
                return b.id == book.id
            })

            if (inFavourite) {
                alert('Questo libro è già presente nella tua lista preferiti.')
                return
            }

            this.$store.dispatch('favourites/addToFavourite', { book: book })
        },
    }
}
</script>