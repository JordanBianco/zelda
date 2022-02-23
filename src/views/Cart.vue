<template>
    <div>
        <div v-if="items.length > 0">
            <pageHeader
                text="Carrello"
            />

            <div
                v-for="(item, index) in items"
                :key="index"
                class="py-4">

                    <quantityErrors
                        :item="item"
                        :errors="errors"    
                    />
                    
                    <section class="flex space-x-4 items-start">
                        <router-link
                            :to="{ name: 'Book.show', params: { id: item.book.id }}">
                                <div class="h-36 w-24 flex-none">
                                    <img
                                        class="object-cover w-full h-full shadow-lg"
                                        src="https://source.unsplash.com/random"
                                        alt="">
                                </div>
                        </router-link>
                        <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-10 justify-between md:items-center">
                            <div class="w-2/3">
                                <h3 class="text-gray-600 leading-tight text-sm md:text-base mb-1">{{ item.book.title }}</h3>
                                <div class="md:flex md:items-center md:space-x-2 text-xs">
                                    <router-link
                                        v-for="author in item.book.authors"
                                        :key="author.id"
                                        to=""
                                        class="block leading-tight text-gray-400 hover:text-gray-600 whitespace-nowrap">
                                            {{ author.name }}
                                    </router-link>

                                    <span class="text-gray-400 text-xs">&bull;</span>

                                    <div class="flex items-center space-x-2">
                                        <router-link
                                            v-for="genre in item.book.genres"
                                            :key="genre.id"
                                            :to="{ name: 'Genre.show', params: { id: genre.id } }"
                                            class="block leading-tight text-gray-400 hover:text-gray-600">
                                                {{ genre.name }}
                                        </router-link>
                                    </div>
                                </div>

                                <p class="text-xs text-gray-400 leading-tight mt-2 hidden md:block">
                                    {{ item.book.description | truncate }}
                                </p>
                            </div>
                            
                            <div class="flex space-x-1 text-sm">
                                <div @click="decreaseQuantity(item)" class="border py-1 px-3 bg-white text-gray-600 cursor-pointer">
                                    -
                                </div>
                                <div class="border py-1 px-3 bg-white text-gray-600">
                                    {{ item.quantity }}
                                </div>
                                <div @click="increaseQuantity(item)" class="border py-1 px-3 bg-white text-gray-600 cursor-pointer">
                                    +
                                </div>
                            </div>

                            <p class="text-base text-primary-300">€{{ item.book.price * item.quantity }},00</p>
                            
                            <div class="flex items-center space-x-2">
                                <div
                                    @click="removeFromCart(item.book, index)"
                                    class="text-xs text-gray-400 hover:underline transition cursor-pointer whitespace-nowrap">
                                        <svg class="w-4 h-4 flex-none text-gray-400 hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                                </div>
                                <div
                                    @click="moveToFavourite(item.book, index)"
                                    class="text-xs text-gray-400 hover:underline transition cursor-pointer whitespace-nowrap">
                                        <svg class="w-4 h-4 flex-none text-gray-400 hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"/></svg>
                                </div>
                            </div>
                        </div>
                    </section>
            </div>

            <!-- Actions and total -->
            <div class="flex md:justify-end py-6 mt-6 border-t">
                <div>
                    <p class="text-gray-400 mb-4">Totale €{{ total }},00</p>
                    <router-link
                        :to="{ name: 'Checkout' }"
                        class="block max-w-max bg-secondary-100 hover:bg-secondary-200 transition focus:outline-none text-white text-sm px-4 py-3">
                            Procedi al pagamento
                    </router-link>
                    <div
                        @click="removeAllFromCart()"
                        class="mt-1 flex items-center space-x-2 max-w-max text-gray-400 hover:text-gray-600 transition text-xs cursor-pointer">
                            <span>Svuota carrello</span>
                            <svg class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="pt-10 text-sm text-center">
                <p class="text-gray-400">Il tuo carrello è vuoto.</p>
                <router-link
                    class="text-gray-500 max-w-max"
                    :to="{ name: 'Books' }">
                        Continua lo shopping
                </router-link>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layout/pageHeader'
import quantityErrors from '@/components/Layout/quantityErrors'

export default {
    name: 'Cart',
    components: {
        pageHeader,
        quantityErrors
    },
    mounted() {
        this.checkQuantity()
    },
    data() {
        return {
            errors: [
                {
                    message: '',
                    book_id: '',
                }
            ]
        }
    },
    computed: {
        items() {
            return this.$store.getters['cart/items']
        },
        favourites() {
            return this.$store.getters['favourites/favourites']
        },
        total() {
            let total = 0;

            this.items.forEach(item => {
                return total = total + (item.book.price * item.quantity)
            });

            return total
        }
    },
    methods: {
        removeFromCart(item, index) {
            this.$store.dispatch('cart/removeFromCart', { 
                book: item,
                index: index
            })
        },
        moveToFavourite(item, index) {
            this.removeFromCart(item, index)

            let inFavourite = this.favourites.find(book => {
                return book.id == item.id
            })

            if (inFavourite) {
                alert('Questo libro è già presente nella tua lista preferiti.')
                return
            }

            this.$store.dispatch('favourites/addToFavourite', { book: item })
        },
        removeAllFromCart() {
            this.$store.dispatch('cart/removeAllFromCart')
        },
        decreaseQuantity(item) {
            if (item.quantity <= 1) {
                return
            }
            this.$store.dispatch('cart/decreaseQuantity', { book: item.book })
        },
        increaseQuantity(item) {
            if (item.quantity == item.book.quantity_in_stock) {
                alert(item.book.quantity_in_stock == 1 ? 'E\' rimasta solo 1 copia' : 'Sono rimaste solo ' + item.book.quantity_in_stock + ' copie')
                return
            }
            this.$store.dispatch('cart/increaseQuantity', { item: item })
        },
        checkQuantity() {
            this.items.forEach(item => {
                if (item.quantity > item.book.quantity_in_stock) {
                    this.errors.push({
                        message: 'Sono disponibili solo ' + item.book.quantity_in_stock + ' copie di "' + item.book.title + '"',
                        book_id: item.book.id
                    })

                    this.$store.dispatch('cart/adjustQuantity', {item: item})
                }
            })
        },
    },
    filters: {
        truncate(text) {
            if (text.length > 150) {
                return text.substring(0, 150) + '...'
            } else {
                return text
            }
        }
    }
}
</script>