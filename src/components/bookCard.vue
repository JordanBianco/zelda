<template>
    <div>
        <div
            class="relative"
            @mouseenter="showDetails = true"
            @mouseleave="showDetails = false">
                <router-link
                    :to="{ name: 'Book.show', params: { id : book.id } }"
                    class="h-64 block">
                        <img
                            class="object-cover w-full h-full shadow-lg"
                            src="https://source.unsplash.com/random"
                            alt="">
                </router-link>

                <div
                    v-if="book.quantity_in_stock === 0"
                    class="absolute top-2 left-2 px-2 py-1 font-semibold text-xs bg-red-200 text-red-500">
                        Esaurito
                </div>
            
                <transition name="fade">
                    <div
                        v-if="showDetails"
                        class="absolute bottom-0 left-0 right-0 py-2 flex space-x-1 justify-center">
                        <div
                            @click="addToFavourite()"
                            :class="[ isInFavourites() ? 'text-red-500' : 'text-gray-100 hover:text-red-500' ]"
                            class="cursor-pointer p-2 rounded-lg transition bg-black bg-opacity-50 bg-clip-padding blur-backdrop-filter">
                                <svg class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M16,2H8A3,3,0,0,0,5,5V21a1,1,0,0,0,.5.87,1,1,0,0,0,1,0L12,18.69l5.5,3.18A1,1,0,0,0,18,22a1,1,0,0,0,.5-.13A1,1,0,0,0,19,21V5A3,3,0,0,0,16,2Zm1,17.27-4.5-2.6a1,1,0,0,0-1,0L7,19.27V5A1,1,0,0,1,8,4h8a1,1,0,0,1,1,1Z"/></svg>
                        </div>

                        <div class="relative">
                            <div
                                @mouseover="showBookGenres = true"
                                @mouseleave="showBookGenres = false"
                                class="block text-gray-100 p-2 rounded-lg bg-black bg-opacity-50 bg-clip-padding blur-backdrop-filter">
                                    <svg class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18,2H8A4,4,0,0,0,4,6V18a4,4,0,0,0,4,4H18a2,2,0,0,0,2-2V4A2,2,0,0,0,18,2ZM6,6A2,2,0,0,1,8,4H18V14H8a3.91,3.91,0,0,0-2,.56ZM8,20a2,2,0,0,1,0-4H18v4ZM10,8h4a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2Z"/></svg>
                            </div>
                            <div
                                v-if="showBookGenres"
                                class="absolute p-3 bottom-10 -left-5 rounded-lg bg-black bg-opacity-60 bg-clip-padding blur-backdrop-filter">
                                    <div class="flex flex-col text-sm">
                                        <router-link
                                            v-for="genre in book.genres"
                                            :key="genre.id"
                                            :to="{ name: 'Genre.show', params: { id: genre.id } }"
                                            class="block leading-tight text-white">
                                                {{ genre.name }}
                                        </router-link>
                                    </div>
                            </div>
                        </div>
                    </div>
                </transition>
        </div>

        <div class="pt-2">
            <header class="text-sm mb-1">
                <router-link :to="{ name: 'Book.show', params: { id : book.id } }">
                    <p class="leading-none mb-1 text-gray-600">{{ book.title | truncate }}</p>
                </router-link>

                <div> 
                    <router-link
                        v-for="author in book.authors"
                        :key="author.id"
                        to=""
                        class="block text-xs leading-tight text-gray-400 hover:text-gray-600">
                            {{ author.name }}
                    </router-link>
                </div>
            </header>

            <footer class="flex space-x-4 justify-between items-center mt-2">
                <div v-if="$route.name != 'Favourites'" class="flex items-center space-x-1">
                    <div class="flex items-center">
                        <svg v-for="i in book.avg_rating" :key="i + $uniqid()" class="w-3.5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        <svg v-for="i in 5 - book.avg_rating" :key="i + $uniqid()" class="w-3.5 flex-none text-gray-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                    </div>
                    <span class="text-xs text-gray-400">({{ book.reviews_count }})</span>
                </div>
                <span class="block text-sm text-gray-600">€{{ book.price }},00</span>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bookCard',
    props: {
        book: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showBookGenres: false,
            showDetails: false
        }
    },
    computed: {
        favourites() {
            return this.$store.getters['favourites/favourites']
        },
        items() {
            return this.$store.getters['cart/items']
        },
        isAuth() {
            return this.$store.getters['auth/is_auth']
        }
    },
    methods: {
        // FAVOURITE
        addToFavourite() {
            if (! this.isAuth) {
                this.$router.push({ name: 'Login' })
            }

            if (! this.isInFavourites()) {
                this.$store.dispatch('favourites/addToFavourite', { book: this.book })
            } else {
                this.$store.dispatch('favourites/removeFromFavourite', { book: this.book })
            }
        },
        isInFavourites() {
            return this.favourites.find(book => {
                return book.id == this.book.id
            })
        }
    },
    filters: {
        truncate(text) {
            if (text.length > 28) {
                return text.substring(0, 28) + '...'
            } else {
                return text
            }
        }
    }
}
</script>

<style>
    .backdrop-filter {
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
    }
    .blur-backdrop-filter {
        backdrop-filter: blur(3px);
        -webkit-backdrop-filter: blur(3px);
    }
</style>