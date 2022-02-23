<template>
    <div>
        <breadcrumb
            :routes="[{ name: 'Dashboard', text: 'Dashboard' }]"
            current="i miei acquisti"
        />

        <div v-if="orders">
            <div
                v-for="order in orders"
                :key="order.id"
                class="border-b py-6"
            >
                <h2 class="mb-4 text-gray-500">Ordine numero: {{ order.id }}</h2>
                <div
                    v-for="book in order.books"
                    :key="book.id"
                    :class="{ 'mb-8' : order.books.length > 1 }"
                    class="flex space-x-4">
                        <div>
                            <router-link
                                :to="{ name: 'Book.show', params: { id : book.id } }"
                                class="h-24 w-18 block">
                                    <img
                                        class="object-cover w-full h-full shadow-lg"
                                        src="https://source.unsplash.com/random"
                                        alt="">
                            </router-link>
                        </div>
                        <div>
                            <p class="text-gray-600 text-sm">{{ book.title }}</p>

                            <button
                                v-if="! hasBeenReviewed(book.id)"
                                @click="openSidebarReview(book)"
                                class="text-sm text-primary-300 hover:underline transition block">
                                    Lascia una recensione
                            </button>

                            <p class="text-gray-400 leading-tight text-xs md:text-sm mt-2">{{ book.description | truncate }}</p>
                            <div class="flex items-center space-x-4 mt-4">
                                <div>
                                    <span class="text-xs text-gray-400 block">totale</span>
                                    <span class="text-sm">{{ order.total }}€</span>
                                </div>
                                <div>
                                    <span class="text-xs text-gray-400 block">Acquistato il</span>
                                    <span class="text-sm">{{ $moment(order.created_at).format('DD-MM-YYYY H:m') }}</span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <addReview
                :book="selectedBook"
                @emptySelectedBook="emptySelectedBook"
            />
        </div>
    </div>
</template>

<script>
import breadcrumb from '@/components/Elements/breadcrumb'
import addReview from '@/components/addReview'

export default {
    name: 'Orders',
    components: {
        breadcrumb,
        addReview
    },
    mounted() {
        this.getOrders()
        this.getReviews()
    },
    data() {
        return {
            selectedBook: [],
        }
    },
    computed: {
        orders() {
            return this.$store.getters['orders/orders']
        },
        reviews() {
            return this.$store.getters['reviews/reviews']
        },
        reviewed() {
            return this.$store.getters['reviews/reviewed']
        },
    },
    methods: {
        getOrders() {
            this.$store.dispatch('orders/getOrders')
        },
        getReviews() {
            this.$store.dispatch('reviews/getReviews')
        },
        hasBeenReviewed(id) {
            return this.reviewed.includes(id)
        },
        openSidebarReview(book) {
            this.selectedBook = book
            this.$store.dispatch('reviews/toggleShow', true)
        },
        emptySelectedBook() {
            this.selectedBook = []
        }
    },
    filters: {
        truncate(text) {
            if (text.length > 350) {
                return text.substring(0, 350) + '...'
            } else {
                return text
            }
        }
    }
}
</script>