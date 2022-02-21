<template>
    <div>
        <div
            @click="closeSidebarReview()"
            class="fixed inset-0 bg-black opacity-20 z-10"
            v-if="show">
        </div>

        <div
            :class="{ 'translate-x-full' : ! show }"
            class="fixed transform transition ease-linear bg-white right-0 top-0 bottom-0 z-20 w-full md:w-96 shadow-xl">
                <header class="border-b p-6 flex justify-between items-center">
                    <span class="block text-gray-600 text-sm">Lascia una recensione</span>
                    <svg @click="closeSidebarReview()" class="w-5 h-5 flex-none text-gray-400 hover:text-gray-600 transition cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                </header>

                <div class="p-6">
                    <p class="text-xs text-gray-400 mb-1">Recensione per</p>
                    <p class="text-sm text-gray-600 leading-tight">{{ book.title }}</p>
                </div>

                <form @submit.prevent="storeReview" class="p-6">
                    <errorMessages :errors="errors" />
                    <div class="mb-6">
                        <label for="title" class="text-xs text-gray-400 mb-1 block">Dai un titolo alla tua recensione</label>
                        <input
                            v-model="review.title"
                            type="text"
                            name="title"
                            class="w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                        />
                    </div>

                    <div class="mb-6">
                        <label for="title" class="text-xs text-gray-400 mb-1 block">La tua valutazione *</label>
                        <div class="flex items-center">
                            <svg
                                @click="selectRating(i)"
                                v-for="i in 5"
                                :key="i"
                                :class="{ 'text-primary-300' : i <= review.rating }"
                                class="w-5 flex-none text-gray-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        </div>
                    </div>

                    <div class="mb-6">
                        <label for="body" class="text-xs text-gray-400 mb-1 block">Aggiungi un commento *</label>
                        <textarea
                            v-model="review.body"
                            rows="6"
                            name="body"
                            class="resize-none w-full border border-gray-100 focus:outline-none focus:border-primary-100 transition p-3 text-sm"
                        ></textarea>
                    </div>

                    <baseButton
                        text="Salva"
                        class="w-full"
                    />
                </form>
        </div>
    </div>
</template>

<script>
import baseButton from '@/components/Elements/baseButton'
import errorMessages from '@/components/Elements/errorMessages'

export default {
    props: {
        book: {
            type: [Object, Array],
            required: false
        },
    },
    components: {
        baseButton,
        errorMessages
    },
    data() {
        return {
            review: {
                title: '',
                rating: 0,
                body: '',
            }
        }
    },
    watch: {
        success: {
            handler() {
                if (this.success) {
                    this.closeSidebarReview()
                    this.$store.dispatch('reviews/setSuccessStatus', false)
                }
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        show() {
            return this.$store.getters['reviews/show']
        },
        errors() {
			return this.$store.getters['reviews/errors']
		},
        success() {
			return this.$store.getters['reviews/success']
		}
    },
    methods: {
        closeSidebarReview() {
            this.$store.dispatch('reviews/toggleShow', false)
            this.$store.dispatch('reviews/clearErrors')
            Object.keys(this.review).forEach((i) => this.review[i] = '');
            this.$emit('emptySelectedBook')
        },
        selectRating(value) {
            this.review.rating = value
        },
        storeReview() {
            this.$store.dispatch('reviews/storeReview', { 
                id: this.book.id,
                review: this.review    
            })
        }
    }
}
</script>

<style>

</style>