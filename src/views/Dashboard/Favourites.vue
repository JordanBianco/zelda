<template>
    <div>
        <breadcrumb
            :routes="[{ name: 'Dashboard', text: 'Dashboard' }]"
            current="libri salvati"
        />

        <div v-if="favourites">
            <div class="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 py-6">
                <bookCard
                    v-for="(book, index) in favourites"
                    :key="book.id"
                    :book="book"
                    :index="index"
                />
            </div>
        </div>
    </div>
</template>

<script>
import bookCard from '@/components/bookCard'
import breadcrumb from '@/components/Elements/breadcrumb'

export default {
    name: 'Favourites',
    components: {
        bookCard,
        breadcrumb
    },
    computed: {
        favourites() {
            return this.$store.getters['favourites/favourites']
        },
        items() {
            return this.$store.getters['cart/items']
        }
    },
    methods: {

    }
}
</script>