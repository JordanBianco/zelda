<template>
    <div>
        <div
            v-for="error, index in errors"
            :key="index">
                <div
                    class="bg-blue-100 text-blue-500 text-sm p-4 rounded-lg my-4 flex items-start space-x-2"
                    v-if="error.book_id === item.book.id">
                        <div class="flex items-start space-x-3 w-full">
                            <svg class="w-5 h-5 flex-none" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z"/></svg>
                            <span>{{ error.message }}</span>
                        </div>
                        <div
                            @click="removeErrorMessage(index)"
                            class="hover:bg-blue-200 p-1 rounded-full cursor-pointer">
                                <svg class="w-5 h-5 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                        </div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'quantityErrors',
    props: {
        item: {
            type: Object,
            required: true
        },
        errors: {
            type: Array,
            required: true
        }
    },
    methods: {
        removeErrorMessage(index) {
            this.errors.splice(index, 1)
        }
    }
}
</script>