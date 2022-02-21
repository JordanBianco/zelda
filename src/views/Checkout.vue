<template>
    <div>
        <pageHeader
            text="Checkout"
        />

        <!-- Overlay -->
        <div v-if="overlay" class="bg-black opacity-20 fixed inset-0 flex justify-center items-center">
            <svg class="animate-spin w-8 h-8 flex-none text-gray-400" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8042,15A.99956.99956,0,0,0,5.438,14.63379l-1.73242,1a1.00016,1.00016,0,0,0,1,1.73242l1.73242-1A1.00073,1.00073,0,0,0,6.8042,15ZM3.70557,8.36621l1.73242,1a1.00016,1.00016,0,1,0,1-1.73242l-1.73242-1a1.00016,1.00016,0,0,0-1,1.73242ZM6,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,6,12ZM17.1958,9a1.0006,1.0006,0,0,0,1.36621.36621l1.73242-1a1.00016,1.00016,0,1,0-1-1.73242l-1.73242,1A1.00073,1.00073,0,0,0,17.1958,9ZM15,6.8042A1.0006,1.0006,0,0,0,16.36621,6.438l1-1.73242a1.00016,1.00016,0,1,0-1.73242-1l-1,1.73242A1.00073,1.00073,0,0,0,15,6.8042Zm5.29443,8.82959-1.73242-1a1.00016,1.00016,0,1,0-1,1.73242l1.73242,1a1.00016,1.00016,0,0,0,1-1.73242ZM16.36621,17.562a1.00016,1.00016,0,1,0-1.73242,1l1,1.73242a1.00016,1.00016,0,1,0,1.73242-1ZM21,11H19a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Zm-9,7a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm-3-.8042a.99954.99954,0,0,0-1.36621.36621l-1,1.73242a1.00016,1.00016,0,0,0,1.73242,1l1-1.73242A1.00073,1.00073,0,0,0,9,17.1958ZM12,2a1,1,0,0,0-1,1V5a1,1,0,0,0,2,0V3A1,1,0,0,0,12,2Z"/></svg>
        </div>

        <div class="md:flex md:space-x-10">
            <div class="md:w-2/3">
                <!-- <div class="mb-6">
                    <label for="email" class="text-sm text-gray-400 mb-1 block">Indirizzo email</label>
                    <input
                        v-model="order.email"
                        type="email"
                        name="email"
                        class="w-full border border-gray-100 rounded focus:outline-none focus:border-cyan-400 transition p-2 text-sm"
                    />
                </div> -->
            </div>
            <div class="md:w-1/3">
                <header class="my-4">
                    <h4 class="text-gray-600 border-b py-4">Riepilogo ordine</h4>
                </header>

                <div v-if="items.length">
                    <div
                        v-for="item in items"
                        :key="item.id"
                        class="mb-4">
                            
                            <quantityErrors
                                :item="item"
                                :errors="errors"    
                            />

                            <div class="flex space-x-2">
                                <router-link
                                    :to="{ name: 'Book.show', params: { id : item.book.id } }"
                                    class="h-24 w-20 block flex-none">
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
                                    <div class="flex items-center justify-between text-sm">
                                        <p>x{{ item.quantity }}</p>
                                        <span class="block text-primary-300">€{{ item.book.price }},00</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <footer class="mt-10 space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600">Totale</span>
                            <span class="text-lg text-gray-600">€{{ total }},00</span>
                        </div>
                        <button
                            @click="storeOrder()"
                            class="w-full bg-green-c-100 hover:bg-green-c-200 transition focus:outline-none text-white text-sm px-4 py-3">
                                Acquista ora
                        </button>
                    </footer>
                </div>
                <div v-else class="flex justify-center items-center h-24">
                    <!-- Cambiare icona -->
                    <svg class="animate-spin w-8 h-8 flex-none text-gray-400" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M6.8042,15A.99956.99956,0,0,0,5.438,14.63379l-1.73242,1a1.00016,1.00016,0,0,0,1,1.73242l1.73242-1A1.00073,1.00073,0,0,0,6.8042,15ZM3.70557,8.36621l1.73242,1a1.00016,1.00016,0,1,0,1-1.73242l-1.73242-1a1.00016,1.00016,0,0,0-1,1.73242ZM6,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,6,12ZM17.1958,9a1.0006,1.0006,0,0,0,1.36621.36621l1.73242-1a1.00016,1.00016,0,1,0-1-1.73242l-1.73242,1A1.00073,1.00073,0,0,0,17.1958,9ZM15,6.8042A1.0006,1.0006,0,0,0,16.36621,6.438l1-1.73242a1.00016,1.00016,0,1,0-1.73242-1l-1,1.73242A1.00073,1.00073,0,0,0,15,6.8042Zm5.29443,8.82959-1.73242-1a1.00016,1.00016,0,1,0-1,1.73242l1.73242,1a1.00016,1.00016,0,0,0,1-1.73242ZM16.36621,17.562a1.00016,1.00016,0,1,0-1.73242,1l1,1.73242a1.00016,1.00016,0,1,0,1.73242-1ZM21,11H19a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Zm-9,7a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm-3-.8042a.99954.99954,0,0,0-1.36621.36621l-1,1.73242a1.00016,1.00016,0,0,0,1.73242,1l1-1.73242A1.00073,1.00073,0,0,0,9,17.1958ZM12,2a1,1,0,0,0-1,1V5a1,1,0,0,0,2,0V3A1,1,0,0,0,12,2Z"/></svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layout/pageHeader'
import quantityErrors from '@/components/Layout/quantityErrors'

export default {
    name: 'Chekcout',
    components: {
        pageHeader,
        quantityErrors
    },
    mounted() {
        this.checkQuantity()
    },
    watch: {
        success: function() {
            if (this.success) {
                this.overlay = false
                this.setSuccessStatus(false)
            }
        },
        items: function() {
            if (this.items.length == 0) {
                this.$router.push({ name: 'Book.index' })
            }
        }
    },
    data() {
        return {
            overlay: false,
            errors: [
                {
                    message: '',
                    book_id: '',
                }
            ]
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
        items() {
            return this.$store.getters['cart/items']
        },
        total() {
            let total = 0;

            this.items.forEach(item => {
                return total = total + (item.book.price * item.quantity)
            });

            return total
        },
        success() {
            return this.$store.getters['orders/success']
        },
    },
    methods: {
        storeOrder() {
            this.overlay = true
            
            this.$store.dispatch('orders/storeOrder', { 
                user_id: this.user.id,
                items: this.items,
                total: this.total
            })
        },
        setSuccessStatus(value) {
            this.$store.dispatch('orders/setSuccessStatus', value)
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
        removeErrorMessage(index) {
            this.errors.splice(index, 1)
        }
    }
}
</script>