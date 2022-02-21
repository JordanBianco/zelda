<template>
    <div>
        <section v-if="books && books.length > 0">
            <h3 class="text-xl font-semibold text-gray-600 mb-4">Potrebbero interessarti</h3>
            <div class="flex items-center space-x-6 overflow-x-auto pb-10">
                <bookCard
                    v-for="(book, index) in books"
                    :key="book.id"
                    :book="book"
                    :index="index"
                />
            </div>
        </section>
    </div>
</template>

<script>
import bookCard from '@/components/bookCard'

export default {
    name: 'similarBooks',
    props: {
        books: {
            type: [Array, Object],
        }
    },
    components: {
        bookCard
    }
}
</script>