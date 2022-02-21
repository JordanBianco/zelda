<template>
    <div class="border-b pb-20 mb-20">
        <h3 class="text-xl font-semibold text-gray-600 mb-4">Recensioni</h3>
        
        <section
            v-if="reviews && reviews.length > 0"
            class="md:flex md:flex-row md:space-x-12">

            <!-- Left Side -->
            <section class="md:w-1/3 mb-8 md:mb-0">
                <div class="border p-4 pb-8">
                    <div class="flex items-center justify-center space-x-0.5">
                        <span class="text-4xl text-gray-600 font-semibold block">{{ book.avg_rating }}</span>
                        <span class="text-lg text-gray-400 font-normal block">/5</span>    
                    </div>
                    
                    <div class="flex items-center justify-center mt-1">
                        <svg
                            v-for="i in book.avg_rating"
                            :key="i + $uniqid()"
                            class="w-5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                        
                        <svg
                            v-for="i in 5 - book.avg_rating"
                            :key="i + $uniqid()"
                            class="w-5 flex-none text-gray-300" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="currentColor" d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"/></svg>
                    </div>
                    <p class="text-gray-700 text-center text-sm mt-2">{{ book.reviews_count}} recensioni</p>

                    <div class="mt-6 space-y-4.5">
                        <!-- 5 stelle -->
                        <div class="flex items-center justify-between relative">
                            <span class="text-gray-500 text-sm absolute left-0">5</span>
                            <div class="w-4/5 mx-auto flex">
                                <div
                                    :style="'background:rgba(254, 179, 114); width:'+ (fiveStarsReview / reviews.length) * 100 + '%'"
                                    :class="{ 'rounded-full' : fiveStarsReview == reviews.length }"
                                    class="h-2 rounded-l-full">
                                </div>
                                <div
                                    :style="'background:rgba(229, 231, 235);width:'+ (100 - (fiveStarsReview / reviews.length) * 100) + '%'"
                                    :class="{ 'rounded-full' : fiveStarsReview == 0 }"
                                    class="h-2 rounded-r-full">
                                </div>
                            </div>
                            <span
                                @click="selectReviews(5)"
                                :class="{ 'text-primary-300' : rating === 5 }"
                                class="block text-gray-500 hover:underline text-sm cursor-pointer absolute right-0">
                                    {{ fiveStarsReview }}
                            </span>
                        </div>

                        <!-- 4 stelle -->
                        <div class="flex items-center justify-between relative">
                            <span class="text-gray-500 text-sm absolute left-0">4</span>
                            <div class="w-4/5 mx-auto flex">
                                <div
                                    :style="'background:rgba(254, 179, 114); width:'+ (fourStarsReview / reviews.length) * 100  + '%'"
                                    :class="{ 'rounded-full' : fourStarsReview == reviews.length }"
                                    class="h-2 rounded-l-full">
                                </div>
                                <div
                                    :style="'background:rgba(229, 231, 235);width:'+ (100 - (fourStarsReview / reviews.length) * 100) + '%'"
                                    :class="{ 'rounded-full' : fourStarsReview == 0 }"
                                    class="h-2 rounded-r-full">
                                </div>
                            </div>
                            <span
                                @click="selectReviews(4)"
                                :class="{ 'text-primary-300' : rating === 4 }"
                                class="block text-gray-500 hover:underline text-sm cursor-pointer absolute right-0">
                                    {{ fourStarsReview }}
                            </span>
                        </div>

                        <!-- 3 stelle -->
                        <div class="flex items-center justify-between relative">
                            <span class="text-gray-500 text-sm absolute left-0">3</span>
                            <div class="w-4/5 mx-auto flex">
                                <div
                                    :style="'background:rgba(254, 179, 114); width:'+ (threeStarsReview / reviews.length) * 100  + '%'"
                                    :class="{ 'rounded-full' : threeStarsReview == reviews.length }"
                                    class="h-2 rounded-l-full">
                                </div>
                                <div
                                    :style="'background:rgba(229, 231, 235);width:'+ (100 - (threeStarsReview / reviews.length) * 100) + '%'"
                                    :class="{ 'rounded-full' : threeStarsReview == 0 }"
                                    class="h-2 rounded-r-full">
                                </div>
                            </div>
                            <span
                                @click="selectReviews(3)"
                                :class="{ 'text-primary-300' : rating === 3 }"
                                class="block text-gray-500 hover:underline text-sm cursor-pointer absolute right-0">
                                    {{ threeStarsReview }}
                            </span>
                        </div>

                        <!-- 2 stelle -->
                        <div class="flex items-center justify-between relative">
                            <span class="text-gray-500 text-sm absolute left-0">2</span>
                            <div class="w-4/5 mx-auto flex">
                                <div
                                    :style="'background:rgba(254, 179, 114); width:'+ (twoStarsReview / reviews.length) * 100  + '%'"
                                    :class="{ 'rounded-full' : twoStarsReview == reviews.length }"
                                    class="h-2 rounded-l-full">
                                </div>
                                <div
                                    :style="'background:rgba(229, 231, 235);width:'+ (100 - (twoStarsReview / reviews.length) * 100) + '%'"
                                    :class="{ 'rounded-full' : twoStarsReview == 0 }"
                                    class="h-2 rounded-r-full">
                                </div>
                            </div>
                            <span
                                @click="selectReviews(2)"
                                :class="{ 'text-primary-300' : rating === 2 }"
                                class="block text-gray-500 hover:underline text-sm cursor-pointer absolute right-0">
                                    {{ twoStarsReview }}
                            </span>
                        </div>

                        <!-- 1 stella -->
                        <div class="flex items-center justify-between relative">
                            <span class="text-gray-500 text-sm absolute left-0">1</span>
                            <div class="w-4/5 mx-auto flex">
                                <div
                                    :style="'background:rgba(254, 179, 114); width:'+ (oneStarReview / reviews.length) * 100  + '%'"
                                    :class="{ 'rounded-full' : oneStarReview == reviews.length }"
                                    class="h-2 rounded-l-full">
                                </div>
                                <div
                                    :style="'background:rgba(229, 231, 235);width:'+ (100 - (oneStarReview / reviews.length) * 100) + '%'"
                                    :class="{ 'rounded-full' : oneStarReview == 0 }"
                                    class="h-2 rounded-r-full">
                                </div>
                            </div>
                            <span
                                @click="selectReviews(1)"
                                :class="{ 'text-primary-300' : rating === 1 }"
                                class="block text-gray-500 hover:underline text-sm cursor-pointer absolute right-0">
                                    {{ oneStarReview }}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Right Side -->
            <div class="md:w-2/3">

                <div v-if="selectedReviews.length > 0">
                    <singleReview
                        v-for="review in selectedReviews"
                        :key="review.id"
                        :review="review"
                    />
                </div>
                <div v-else>
                    <singleReview
                        v-for="review in reviews.slice(0, 5)"
                        :key="review.id"
                        :review="review"
                    />
                    <router-link
                        :to="{ name: 'Book.reviews', params: { id: book.id }}"
                        v-if="reviews.length > 5"
                        class="text-right text-gray-400 hover:text-gray-600 text-sm block">
                            Mostra tutte
                    </router-link>
                </div>
            </div>
        </section>
        <section v-else>
            <p class="text-gray-500 text-sm">Questo libro non ha ancora ricevuto recensioni</p>
        </section>
    </div>
</template>

<script>
import singleReview from '@/components/singleReview'

export default {
    name: 'bookReviews',
    props: {
        book: {
            type: Object,
            required: true
        },
        reviews: {
            type: Array,
            required: false
        },
        selectedReviews: {
            type: Array,
            required: false
        },
        rating: {
            type: Number,
            required: false
        }
    },
    components: {
        singleReview
    },
    computed: {
        fiveStarsReview() {
            return this.reviews.filter(review => {
                return review.rating === 5
            }).length
        },
        fourStarsReview() {
            return this.reviews.filter(review => {
                return review.rating === 4
            }).length
        },
        threeStarsReview() {
            return this.reviews.filter(review => {
                return review.rating === 3
            }).length
        },
        twoStarsReview() {
            return this.reviews.filter(review => {
                return review.rating === 2
            }).length
        },
        oneStarReview() {
            return this.reviews.filter(review => {
                return review.rating === 1
            }).length
        },
    },
    methods: {
        selectReviews(value) {
            this.$emit('selectReviews', value)
        }
    }
}
</script>