<template>
    <div class="pb-10">
        <div class="flex space-x-4">
            <div class="flex-none">
                <userImage
                    :user="review.user"
                    class="w-9 rounded-full"/>
            </div>
            <div>
                <div class="flex items-start space-x-3">
                    <h4 v-if="review.user" class="text-gray-600 text-sm font-semibold">{{ review.user.name }}</h4>
                    <h4 v-else class="text-gray-400 text-sm">Utente cancellato</h4>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                            <svg
                                v-for="i in review.rating"
                                :key="i + $uniqid()"
                                class="w-4 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                            
                            <svg
                                v-for="i in 5 - review.rating"
                                :key="i + $uniqid()" class="w-4.5 flex-none text-gray-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                    </div>
                </div>

                <span class="block text-gray-400 text-xs">{{ $moment(review.created_at).format('DD-MM-YYYY H:mm') }}</span>

                <div class="mt-2 text-sm">
                    <p v-if="review.title" class="leading-tight text-gray-600 mb-1">{{ review.title }}</p>
                    <p class="text-gray-400 leading-tight">{{ review.body }}</p>
                </div>

                <div v-if="$route.name === 'Reviews'" class="mt-4 text-xs text-gray-400 ">
                    <span>Recensione di: </span>
                    <router-link
                        :to="{ name: 'Book.show', params: { id: review.book.id }}"
                        class="hover:text-primary-300 transition">
                            {{ review.book.title }}
                    </router-link>
                </div>

                <div
                    v-if="$route.name === 'Reviews' && user && user.id === review.user.id"
                    class="mt-4 text-xs text-gray-400 flex items-center space-x-2">
                        <span @click="openEditMenu()" class="cursor-pointer hover:text-primary-300 transition">Modifica</span>
                        <span class="cursor-pointer hover:text-red-500 transition" @click="deleteReview()">Elimina</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userImage from '@/components/userImage'

export default {
    name: 'singleReview',
    components: {
        userImage
    },
    props: {
        review: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: false
        }
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        }
    },
    methods: {
        deleteReview() {
            if (confirm('Eliminare la recensione?')) {
                this.$store.dispatch('reviews/deleteReview', { 
                    id: this.review.id,
                    index: this.index
                })
            }
        },
        openEditMenu() {
            this.$emit('openEditMenu', this.review )
        },
    }
}
</script>