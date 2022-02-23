<template>
	<div class="pb-20">
        <div v-if="book">
            <breadcrumb
                :routes="[{ name: 'Books', text: 'Libri' }]"
                :current="book.title"
            />

            <div
                v-if="book.quantity_in_stock >= 1 && book.quantity_in_stock <= 4"
                class="bg-blue-100 text-blue-500 text-sm p-4 mt-4 mb-10 rounded-lg flex items-center space-x-2"
            >
                <svg class="w-5 h-5 flex-none" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"/></svg>
                <p>{{ book.quantity_in_stock == 1 ? 'È rimasta solo ' + book.quantity_in_stock + ' copia' : 'Sono rimaste solo ' + book.quantity_in_stock + ' copie' }}</p>
            </div>

            <section class="md:flex md:space-x-8 border-b pb-20 mb-20">
                <section class="md:w-2/5 lg:w-1/3 mb-8 md:mb-0">
                    <div class="relative">
                        <div class="h-96 w-full flex-none">
                            <img
                                class="object-cover w-full h-full shadow-lg"
                                src="https://source.unsplash.com/random"
                                alt="">
                        </div>

                        <div
                            v-if="isExpired"
                            class="absolute top-4 left-4 px-2 py-1 font-semibold bg-red-200 text-red-500">
                                Esaurito
                        </div>
                    </div>
                </section>
                <section class="md:w-3/5 lg:w-2/3 flex flex-col space-y-6 justify-between">
                    <div>
                        <div class="md:flex md:items-start md:justify-between md:space-x-8 text-2xl text-secondary-100 mb-3">
                            <h2 class="leading-none mb-2 md:mb-0">{{ book.title }}</h2>
                            <p>€{{ book.price }},00</p>      
                        </div>
    
                        <div class="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-2 text-sm text-gray-500">
                            <!-- Autori -->
                            <router-link
                                v-for="author in book.authors"
                                :key="author.id"
                                to=""
                                class="block leading-tight hover:text-primary-300 transition whitespace-nowrap">
                                    {{ author.name }}
                            </router-link>

                            <span class="text-xs hidden sm:block">&bull;</span>

                            <!-- Generi -->
                            <div class="flex items-center space-x-2">
                                <router-link
                                    v-for="genre in book.genres"
                                    :key="genre.id"
                                    :to="{ name: 'Genre.show', params: { id: genre.id } }"
                                    class="block leading-tight hover:text-primary-300 transition">
                                        {{ genre.name }}
                                </router-link>
                            </div>

                            <span class="text-xs hidden sm:block">&bull;</span>

                            <span class="block">{{ book.first_published }}</span>
                        </div>

                        <div class="flex items-center space-x-1 my-4">
                            <div class="flex items-center">
                                <svg
                                    v-for="i in book.avg_rating"
                                    :key="i + $uniqid()"
                                    class="w-4 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                                
                                <svg
                                    v-for="i in 5 - book.avg_rating"
                                    :key="i + $uniqid()"
                                    class="w-4 flex-none text-gray-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                            </div>
                            <span class="text-xs text-gray-400">{{ book.reviews_count }} recensioni</span>
                        </div>

                        <p class="text-gray-400 text-sm leading-tight">{{ book.description }}</p>

                        <div class="mt-4 text-gray-400 text-sm">
                            <p>{{ book.status }}</p>
                            <p>Copertina {{ book.cover }}</p>
                        </div>
                    </div>
                    
                    <footer>
                        <div class="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:justify-between">
                            <div class="flex items-center space-x-1">
                                <div @click="decreaseQuantity()" class="border py-1 px-3 bg-white text-gray-600 cursor-pointer">
                                    -
                                </div>
                                <div class="border py-1 px-3 bg-white text-gray-600">
                                    {{ quantity }}
                                </div>
                                <div @click="increaseQuantity()" class="border py-1 px-3 bg-white text-gray-600 cursor-pointer">
                                    +
                                </div>
                            </div>
                        
                            <div class="flex items-center space-x-2 justify-between">
                                <div
                                    @click="addToFavourite()"
                                    :class="[ isInFavourites() ? 'bg-red-200 text-red-500' : 'text-gray-500 hover:bg-red-200 hover:text-red-500' ]"
                                    class="cursor-pointer p-1.5 transition rounded-full">
                                        <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"/></svg>
                                </div>
                                <button
                                    v-if="! isExpired"
                                    @click="addToCart()"
                                    class="flex-none max-w-max bg-secondary-100 hover:bg-secondary-200 transition focus:outline-none text-white text-sm px-4 py-3">
                                        Aggiungi al carrello
                                </button>
                            </div>
                        </div>
                    </footer>
                </section>
            </section>

            <div>
                <bookReviews
                    v-if="reviews"
                    :reviews="reviews"
                    :selectedReviews="selectedReviews"
                    :rating="rating"
                    :book="book"
                    @selectReviews="selectReviews"
                />

                <similarBooks
                    :books="similarBooks"
                />
            </div>
    </div>
    <div v-else class="pb-20 mb-20 mt-16">
        <content-placeholders>
            <content-placeholders-heading :img="true" />
            <content-placeholders-text :lines="5" />
        </content-placeholders>
    </div>            
	</div>
</template>

<script>
import breadcrumb from '@/components/Elements/breadcrumb'
import bookReviews from '@/components/Book/bookReviews'
import similarBooks from '@/components/Book/similarBooks'

export default {
	name: 'Book.show',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    components: {
        breadcrumb,
        bookReviews,
        similarBooks
    },
	mounted() {
		this.getBook()
        this.getReviews()
        this.getSimilarBooks()
	},
    data() {
        return {
            quantity: 1,
            rating: null,
            sort: 'created_desc',
        }
    },
    watch: {
        id: {
            handler() {
                this.getBook()
                this.getReviews()
                this.getSimilarBooks()
                this.quantity = 1
            },
            deep: true,
            immediate: true
        },
        rating: function() {
            this.getReviews()
        }
    },
	computed: {
		book() {
			return this.$store.getters['books/book']
		},
        reviews() {
			return this.$store.getters['books/reviews']
		},
        selectedReviews() {
			return this.$store.getters['books/selectedReviews']
		},
        similarBooks() {
			return this.$store.getters['books/similarBooks']
		},
        favourites() {
            return this.$store.getters['favourites/favourites']
        },
        items() {
            return this.$store.getters['cart/items']
        },
        isAuth() {
            return this.$store.getters['auth/is_auth']
        },
        isExpired() {
            return this.book.quantity_in_stock === 0
        }
	},
	methods: {
		getBook() {
			this.$store.dispatch('books/getBook', { id: this.id })
		},
        getReviews() {
            this.$store.dispatch('books/getReviews', {
                id: this.id,
                rating: this.rating,
                sort: this.sort
            })
        },
        getSimilarBooks() {
            this.$store.dispatch('books/getSimilarBooks', { id: this.id })
        },
        addToFavourite() {
            if (! this.isAuth) {
                this.$router.push({ name: 'Login' })
            }

            if (! this.isInFavourites()) {
                this.$store.dispatch('favourites/addToFavourite', { book: this.book })
            } else {
                this.$store.dispatch('favourites/removeFromFavourite', { book: this.book }) // add index
            }
        },
        isInFavourites() {
            return this.favourites.find(book => {
                return book.id == this.book.id
            })
        },
        increaseQuantity() {
            this.quantity = this.quantity + 1
        },
        decreaseQuantity() {
            if (this.quantity <= 1) {
                return
            }
            this.quantity = this.quantity - 1
        },
        addToCart() {
            if (this.isAuth) {
                this.$store.dispatch('cart/addToCart', {
                    item: { 
                        book: this.book,
                        quantity: this.quantity
                    }
                })
            } else {
                this.$router.push({ name: 'Login' })
            }
        },
        selectReviews(value) {
            if (this.rating == value) {
                this.rating = null
            } else {
                this.rating = value
            }
        }
	}
}
</script>