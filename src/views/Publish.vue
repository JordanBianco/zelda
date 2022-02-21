<template>
    <div>
        <div class="px-10 py-6">
            <div class="mb-4">
                <h2 class="text-gray-600">Ciao {{ user.name }}! Pubblica un nuovo annuncio</h2>
            </div>
            
            <form
                @submit.prevent="storeBook"
                class="mt-4 bg-white shadow-sm rounded p-6"
            >
                <errorMessages
                    :errors="errors"
                />
                
                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="title"
                        class="text-sm text-gray-500 block w-1/6">
                            Titolo del libro
                    </label>
                    <input
                        v-model="book.title"
                        type="text"
                        name="title"
                        class="w-5/6 border border-gray-200 rounded focus:outline-none focus:border-cyan-400 p-2"
                    />
                </div>

                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="description"
                        class="text-sm text-gray-500 block w-1/6">
                            Aggiungi una breve descrizione del libro
                    </label>
                    <textarea
                        v-model="book.description"
                        name="description"
                        rows="5"
                        class="w-5/6 resize-none border border-gray-200 rounded focus:outline-none focus:border-cyan-400 p-2"
                    ></textarea>
                </div>

                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="price"
                        class="text-sm text-gray-500 block w-1/6">
                            Scegli un prezzo per il libro
                    </label>
                    <input
                        v-model="book.price"
                        type="number"
                        min="0"
                        name="price"
                        class="w-5/6 border border-gray-200 rounded focus:outline-none focus:border-cyan-400 p-2 text-sm"
                    />
                </div>

                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="total_pages"
                        class="text-sm text-gray-500 block w-1/6">
                            Totale pagine
                    </label>
                    <input
                        v-model="book.total_pages"
                        type="number"
                        min="0"
                        name="total_pages"
                        class="w-5/6 border border-gray-200 rounded focus:outline-none focus:border-cyan-400 p-2 text-sm"
                    />
                </div>

                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="status"
                        class="text-sm text-gray-500 block w-1/6">
                            Stato del libro
                    </label>
                    <label class="block text-gray-600 text-sm">
                        <input
                            type="radio"
                            v-model="book.status"
                            value="nuovo"
                            name="status"
                        />
                        Nuovo
                    </label>

                    <label class="block text-gray-600 text-sm">
                        <input
                            type="radio"
                            v-model="book.status"
                            value="usato"
                            name="status"
                        />
                        Usato
                    </label>
                </div>

                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="cover"
                        class="text-sm text-gray-500 block w-1/6">
                            Copertina
                    </label>
                    <label class="block text-gray-600 text-sm">
                        <input
                            type="radio"
                            v-model="book.cover"
                            value="rigida"
                            name="cover"
                        />
                        Rigida
                    </label>

                    <label class="block text-gray-600 text-sm">
                        <input
                            type="radio"
                            v-model="book.cover"
                            value="flessibile"
                            name="cover"
                        />
                        Flessibile
                    </label>
                </div>

                <div class="mb-6 flex items-start space-x-4">
                    <label
                        for="genres"
                        class="text-sm text-gray-500 block w-1/6">
                            Seleziona uno o più generi
                            <span class="text-xs text-gray-400 leading-none block mt-1">Tieni premuto ctrl per scegliere più generi</span>
                    </label>
                    <select
                        name="genres"
                        multiple
                        v-model="book.genres"
                        class="w-5/6 border border-gray-200 rounded focus:outline-none focus:border-cyan-400 p-2 text-sm">
                            <option
                                v-for="genre in genres"
                                :key="genre.id"
                                :value="genre.id">
                                    {{ genre.name }}
                            </option>    
                    </select>
                </div>
                
                <div class="flex justify-end">
                    <baseButton 
                        text="Conferma"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import errorMessages from '@/components/Elements/errorMessages'
import baseButton from '@/components/Elements/baseButton'

export default {
    name: 'Publish',
    components: {
        errorMessages,
        baseButton
    },
    mounted() {
        this.getGenres()
    },
    data() {
        return {
            page: 1,
            book: {
                title: '',
                description: '',
                price: '',
                total_pages: '',
                first_published: '',
                status: '',
                cover: '',
                authors: [],
                genres: []
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
        errors() {
            return this.$store.getters['books/errors']
        },
        genres() {
            return this.$store.getters['genres/genres']
        }
    },
    methods: {
        getGenres() {
            this.$store.dispatch('genres/getGenres')
        },
        storeBook() {
            console.log(this.book)
            // this.$store.dispatch('books/storeBook', { book: this.book })
        }
    }
}
</script>