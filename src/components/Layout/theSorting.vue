<template>
    <header>
        <select
            name="sort"
            v-model="sort"
            @change="applySorting"
            class="bg-white text-xs text-gray-500 p-2 focus:outline-none border border-gray-200">
                <option value="price_desc">Prezzo più alto</option>
                <option value="price_asc">Prezzo più basso</option>
                <option value="created_desc">Data più recente</option>
                <option value="created_asc">Data meno recente</option>
        </select>
    </header>
</template>

<script>
export default {
    name: 'theSorting',
    data() {
        return {
            sort: 'created_desc'
        }
    },
    methods: {
        applySorting() {
            this.$emit('applySorting', this.sort)
        },
    }
}
</script>