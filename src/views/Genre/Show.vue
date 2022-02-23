<template>
    <div v-if="books && genre">
        <pageHeader
            :text="genre.name"
        />

        <breadcrumb
            :routes="[
                {
                    name: 'Books',
                    text: 'Libri'
                },
            ]"
            :current="genre.name"
        />
        
        <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <bookCard
                v-for="book, index in books"
                :key="book.id"
                :book="book"
                :index="index"
            />
        </div>
    </div>
</template>

<script>
import pageHeader from '@/components/Layout/pageHeader'
import breadcrumb from '@/components/Elements/breadcrumb'
import bookCard from '@/components/bookCard'

export default {
    name: 'Genre.Show',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    components: {
        pageHeader,
        breadcrumb,
        bookCard
    },
    mounted() {
        this.getGenre()
        this.getGenreBooks()
    },
    computed: {
        genre() {
            return this.$store.getters['genres/genre']
        },
        books() {
            return this.$store.getters['genres/books']
        }
    },
    methods: {
        getGenre() {
            this.$store.dispatch('genres/getGenre', {id: this.id})
        },
        getGenreBooks() {
            this.$store.dispatch('genres/getGenreBooks', {id: this.id})
        }
    }
}
</script>