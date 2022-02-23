<template>
    <div v-if="book">
        <h3 class="text-xl font-semibold text-gray-600 mt-4">Tutte le recensioni</h3>

        <breadcrumb
            :routes="[
                { 
                    name: 'Books',
                    text: 'Libri'
                },
                { 
                    name: 'Book.show',
                    params: { id: book.id },
                    text: book.title
                }                
            ]"
            current="recensioni"
        />

        <div class="flex items-center justify-between mb-10 pb-10 border-b">
            <p class="text-gray-500 text-sm">{{ reviews.length }} recensioni</p>
            <select
                v-model="sort"
                class="bg-white text-xs text-gray-500 p-2 focus:outline-none border border-gray-200">
                    <option value="created_desc">Data più recente</option>
                    <option value="created_asc">Data meno recente</option>
                    <option value="rating_desc">Valutazione più alta</option>
                    <option value="rating_asc">Valutazione più bassa</option>
            </select>
        </div>

        <singleReview
            v-for="review in reviews"
            :key="review.id"
            :review="review"
        />
    </div>
</template>

<script>
import singleReview from '@/components/singleReview'
import breadcrumb from '@/components/Elements/breadcrumb'

export default {
    name: 'book.reviews',
    components: {
        singleReview,
        breadcrumb
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    mounted() {
		this.getBook()
        this.getReviews()
	},
    watch: {
        sort: function() {
            this.getReviews()
        }
    },
    data() {
        return {
            sort: 'created_desc'
        }
    },
    computed: {
		book() {
			return this.$store.getters['books/book']
		},
        reviews() {
			return this.$store.getters['books/reviews']
		},
    },
    methods: {
        getBook() {
			this.$store.dispatch('books/getBook', { id: this.id })
		},
        getReviews() {
            this.$store.dispatch('books/getReviews', {
                id: this.id,
                rating: null,
                sort: this.sort
            })
        }
    }
}
</script>