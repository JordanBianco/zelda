<template>
    <aside class="bg-secondary-100 pb-28">
        <div class="flex items-center justify-between text-gray-300 p-6">
            <div class="text-sm flex items-center space-x-2">
                <svg @click="closeFiltersMenu()" class="w-5 h-5 flex-none text-primary-300 cursor-pointer" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="currentColor" d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"/></svg>
                <span>Filtri</span>
            </div>
            <span
                @click="removeFilters"
                class="text-xs cursor-pointer hover:text-primary-300 transition">Rimuovi filtri</span>
        </div>

        <section class="space-y-10 p-6">

            <!-- Search -->
            <div class="mb-2 border-b border-gray-600 pb-8">
                <div class="flex items-center space-x-2">
                    <div class="relative">
                        <input
                            type="text"
                            v-model="search"
                            placeholder="Cerca per titolo o autore"
                            class="bg-secondary-100 placeholder-gray-600 border border-gray-600 w-full pl-8 pr-2 py-2 text-gray-300 focus:outline-none text-sm">

                        <svg class="w-4.5 h-4.5 flex-none absolute top-2.5 left-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"/></svg>
                    </div>
                
                    <button
                        class="border border-primary-300 text-primary-300 transition focus:outline-none text-sm px-2 py-2"
                        @click="applySearch()">
                            Cerca
                    </button>
                </div>

                <p
                    v-if="search.length"
                    @click="search = ''"
                    class="text-xs text-gray-300 cursor-pointer mt-1">
                        cancella
                </p>
            </div>

            <!-- Generi -->
            <div>
                <span class="text-gray-300 text-sm block mb-2">Generi</span>
                <div
                    v-for="genre in genres"
                    :key="genre.id"
                    :class="[ filters.genres.includes(genre.id) ? 'text-primary-300' : 'text-gray-300' ]"
                    class="flex justify-between items-center text-sm mb-1">
                        <div class="space-x-2">
                            <input
                                type="checkbox"
                                name="genres"
                                @change="applyFilters()"
                                v-model="filters.genres"
                                :value="genre.id">
                            <router-link
                                :to="{ name: 'Genre.show', params: {id: genre.id }}"
                            >
                                {{ genre.name }}
                            </router-link>
                        </div>
                        <span class="text-xs">{{ genre.books_count }}</span>
                </div>
                <div
                    @click="toggleGenresLimit()"
                    class="flex items-center justify-between mt-2 text-primary-300 cursor-pointer transition">
                        <span class="text-sm">{{ genresLimit != null ? 'Visualizza tutti' : 'Mostra meno' }}</span>
                        <svg v-if="genresLimit != null" class="w-4 h-4 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/></svg>
                        <svg v-else class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,11H5a1,1,0,0,0,0,2H19a1,1,0,0,0,0-2Z"/></svg>
                </div>
            </div>

            <!-- Price -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm block">Prezzo</span>
                    <span
                        v-if="filters.min_price || filters.max_price"
                        @click="emptyPrices()"
                        class="text-xs text-gray-300 cursor-pointer">
                            rimuovi
                    </span>
                </div>
                <div class="flex items-center space-x-2">
                    <input
                        type="text"
                        v-model="filters.min_price"
                        placeholder="Min"
                        class="w-1/3 bg-secondary-100 placeholder-gray-600 border border-gray-600 p-2 text-gray-300 focus:outline-none text-sm">

                    <input
                        type="text"
                        v-model="filters.max_price"
                        placeholder="Max"
                        class="w-1/3 bg-secondary-100 placeholder-gray-600 border border-gray-600 p-2 text-gray-300 focus:outline-none text-sm">

                    <button
                        class="w-1/3 border border-primary-300 text-primary-300 transition focus:outline-none text-sm p-2"
                        @click="applyFilters()">
                            Applica
                    </button>
                </div>
            </div>

            <!-- Total Pages -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm block">Pagine totali</span>
                    <span
                        v-if="filters.min_total_pages || filters.max_total_pages"
                        @click="emptyTotalPages()"
                        class="text-xs text-gray-300 cursor-pointer">
                            rimuovi
                    </span>
                </div>
                <div class="flex items-center space-x-2">
                    <input
                        type="text"
                        v-model="filters.min_total_pages"
                        placeholder="Min"
                        class="w-1/3 bg-secondary-100 placeholder-gray-600 border border-gray-600 p-2 text-gray-300 focus:outline-none text-sm">

                    <input
                        type="text"
                        v-model="filters.max_total_pages"
                        placeholder="Max"
                        class="w-1/3 bg-secondary-100 placeholder-gray-600 border border-gray-600 p-2 text-gray-300 focus:outline-none text-sm">

                    <button
                        class="w-1/3 border border-primary-300 hover:border-primary-300 text-primary-300 transition focus:outline-none text-sm p-2"
                        @click="applyFilters()">
                            Applica
                    </button>
                </div>
            </div>

            <!-- Anno di pubblicazione -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm block">Anno di pubblicazione</span>
                    <span
                        v-if="filters.min_first_published || filters.max_first_published"
                        @click="emptyFirstPublished()"
                        class="text-xs text-gray-300 cursor-pointer">
                            rimuovi
                    </span>
                </div>
                <div class="flex items-center space-x-2">
                    <input
                        type="text"
                        v-model="filters.min_first_published"
                        placeholder="Da"
                        class="w-1/3 bg-secondary-100 placeholder-gray-600 border border-gray-600 p-2 text-gray-300 focus:outline-none text-sm">

                    <input
                        type="text"
                        v-model="filters.max_first_published"
                        placeholder="A"
                        class="w-1/3 bg-secondary-100 placeholder-gray-600 border border-gray-600 p-2 text-gray-300 focus:outline-none text-sm">

                    <button
                        class="w-1/3 border border-primary-300 text-primary-300 transition focus:outline-none text-sm p-2"
                        @click="applyFilters()">
                            Applica
                    </button>
                </div>
            </div>

            <!-- Media Recensioni -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm block">Valutazione</span>
                    <span
                        v-if="filters.min_avg"
                        @click="emptyMinAvg()"
                        class="text-xs text-gray-300 cursor-pointer">
                            rimuovi
                    </span>
                </div>
                <div class="space-y-2">
                    <!-- 1 star -->
                    <div @click="setAvgRating(1)" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <svg v-for="i in 1" :key="i + $uniqid()" class="w-4.5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                            <svg v-for="i in 4" :key="i + $uniqid()" class="w-4.5 flex-none text-gray-500" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                        <span
                            :class="{ 'underline' : filters.min_avg == 1 }"
                            class="block text-sm text-gray-300 cursor-pointer">
                                1 stella in su
                        </span>
                    </div>
                    <!-- 2 stars -->
                    <div @click="setAvgRating(2)" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <svg v-for="i in 2" :key="i + $uniqid()" class="w-4.5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                            <svg v-for="i in 3" :key="i + $uniqid()" class="w-4.5 flex-none text-gray-500" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                        <span
                            :class="{ 'underline' : filters.min_avg == 2 }"
                            class="block text-sm text-gray-300 cursor-pointer">
                                2 stelle in su
                        </span>
                    </div>
                    <!-- 3 stars -->
                    <div @click="setAvgRating(3)" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <svg v-for="i in 3" :key="i + $uniqid()" class="w-4.5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                            <svg v-for="i in 2" :key="i + $uniqid()" class="w-4.5 flex-none text-gray-500" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                        <span
                            :class="{ 'underline' : filters.min_avg == 3 }"
                            class="block text-sm text-gray-300 cursor-pointer">
                                3 stelle in su
                        </span>
                    </div>
                    <!-- 4 stars -->
                    <div @click="setAvgRating(4)" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <svg v-for="i in 4" :key="i + $uniqid()" class="w-4.5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                            <svg v-for="i in 1" :key="i + $uniqid()" class="w-4.5 flex-none text-gray-500" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                        <span
                            :class="{ 'underline' : filters.min_avg == 4 }"
                            class="block text-sm text-gray-300 cursor-pointer">
                                4 stelle in su
                        </span>
                    </div>
                    <!-- 5 stars -->
                    <div @click="setAvgRating(5)" class="flex items-center justify-between">
                        <div class="flex items-center">
                            <svg v-for="i in 5" :key="i + $uniqid()" class="w-4.5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                        <span
                            :class="{ 'underline' : filters.min_avg == 5 }"
                            class="block text-sm text-gray-300 cursor-pointer">
                                5 stelle
                        </span>
                    </div>
                </div>
            </div>

            <!-- Stato -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm block">Stato</span>
                    <span
                        v-if="filters.status"
                        @click="emptyStatus()"
                        class="text-xs text-gray-300 cursor-pointer">
                            rimuovi
                    </span>
                </div>
                <div class="flex w-full text-sm">
                    <div
                        @click="setStatus('nuovo')"
                        :class="[ filters.status == 'nuovo' ? 'border border-primary-300 text-primary-300' : 'text-gray-600 border border-gray-600 border-r-0' ]"
                        class="w-full p-2 text-center transition cursor-pointer">
                            Nuovo
                    </div>
                    <div
                        @click="setStatus('usato')"
                        :class="[ filters.status == 'usato' ? 'border border-primary-300 text-primary-300' : 'text-gray-600 border border-gray-600' ]"
                        class="w-full p-2 text-center transition cursor-pointer">
                            Usato
                    </div>
                </div>
            </div>

            <!-- Cover -->
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-300 text-sm block">Formato Copertina</span>
                    <span
                        v-if="filters.cover"
                        @click="emptyCover()"
                        class="text-xs text-gray-300 cursor-pointer">
                            rimuovi
                    </span>
                </div>
                <div class="flex w-full text-sm">
                    <div
                        @click="setCover('rigida')"
                        :class="[ filters.cover == 'rigida' ? 'border border-primary-300 text-primary-300' : 'text-gray-600 border border-gray-600 border-r-0' ]"
                        class="w-full p-2 text-center transition cursor-pointer">
                            Rigida
                    </div>
                    <div
                        @click="setCover('flessibile')"
                        :class="[ filters.cover == 'flessibile' ? 'border border-primary-300 text-primary-300' : 'text-gray-600 border border-gray-600' ]"
                        class="w-full p-2 text-center transition cursor-pointer">
                            Flessibile
                    </div>
                </div>
            </div>
        </section>
    </aside>
</template>

<script>
export default {
    name: 'sideFilters',
    mounted() {
        this.getGenres()
    },
    data() {
        return {
            search: '',
            filters: {
                min_price: '',
                max_price: '',
                min_total_pages: '',
                max_total_pages: '',
                min_first_published: '',
                max_first_published: '',
                min_avg: '',
                status: '',
                cover: '',
                genres: []
            },
            genresLimit: 5
        }
    },
    watch: {
        search: function() {
            if (this.search == '') {
                this.applySearch()
            }
        }
    },
    computed: {
        genres() {
            return this.genresLimit 
                ? this.$store.getters['genres/genres'].slice(0 ,this.genresLimit)
                : this.$store.getters['genres/genres']
        }
    },
    methods: {
        getGenres() {
            this.$store.dispatch('genres/getGenres')
        },
        toggleGenresLimit() {
            this.genresLimit === null
                ? this.genresLimit = 5
                : this.genresLimit = null
        },
        // AvgRating
        setAvgRating(value) {
            this.filters.min_avg = value
            this.applyFilters()
        },
        // Status
        setStatus(value) {
            this.filters.status = value
            this.applyFilters()
        },
        // Cover
        setCover(value) {
            this.filters.cover = value
            this.applyFilters()
        },
        // Search
        applySearch() {
            this.$emit('applySearch', this.search)
        },
        applyFilters() {
            this.$emit('applyFilters', this.filters)
        },
        // Rimuove filtri per price
        emptyPrices() {
            this.filters.min_price = ''
            this.filters.max_price = ''
            this.applyFilters()
        },
        // Rimuove filtri per total_pages
        emptyTotalPages() {
            this.filters.min_total_pages = ''
            this.filters.max_total_pages = ''
            this.applyFilters()
        },
        // Rimuove filtri per first_published
        emptyFirstPublished() {
            this.filters.min_first_published = ''
            this.filters.max_first_published = ''
            this.applyFilters()
        },
        // Rimuove filtri per min avg
        emptyMinAvg() {
            this.filters.min_avg = ''
            this.applyFilters()
        },
        // Rimuove filtri per status
        emptyStatus() {
            this.filters.status = ''
            this.applyFilters()
        },
        // Rimuove filtri per cover
        emptyCover() {
            this.filters.cover = ''
            this.applyFilters()
        },
        // Rimuovo tutti i filtri
        removeFilters() {
            Object.keys(this.filters).forEach(i => {
                if (i === 'genres') {
                    this.filters[i] = []
                } else {
                    this.filters[i] = ''
                }
            });
            this.applyFilters()
        },
        closeFiltersMenu() {
            this.$emit('closeFiltersMenu')
        }
    }
}
</script>