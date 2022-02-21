<template>
	<div>
		<section>
			<sideFilters
				:class="{ '-translate-x-full' : ! showFilters }"
				class="fixed left-0 top-0 h-screen transform transition ease-linear w-full xs:w-4/5 md:w-80 z-20 overflow-y-auto"
				@applyFilters="applyFilters"
				@applySearch="applySearch"
				@closeFiltersMenu="showFilters = false"
			/>

			<div
				v-if="showFilters"
				@click="showFilters = false"
				class="fixed inset-0 bg-black opacity-20 z-10"></div>
 
			<div v-if="books.data" class="pt-10">

				<div class="flex items-center justify-between mb-8">
					<div class="flex items-center space-x-2">
						<svg @click="toggleShowFilters()" class="w-5 h-5 flex-none transform rotate-90 text-gray-400 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20,8.18V3a1,1,0,0,0-2,0V8.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V13.82a3,3,0,0,0,0-5.64ZM19,12a1,1,0,1,1,1-1A1,1,0,0,1,19,12Zm-6,2.18V3a1,1,0,0,0-2,0V14.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V19.82a3,3,0,0,0,0-5.64ZM12,18a1,1,0,1,1,1-1A1,1,0,0,1,12,18ZM6,6.18V3A1,1,0,0,0,4,3V6.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V11.82A3,3,0,0,0,6,6.18ZM5,10A1,1,0,1,1,6,9,1,1,0,0,1,5,10Z"/></svg>
						<span
							v-if="books.meta"
							class="text-gray-500 block text-xs">
								Risultati {{ books.meta.total }}
						</span>
					</div>

					<theSorting
						@applySorting="applySorting"
					/>
				</div>

				<div class="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-16">
					<bookCard
						v-for="(book, index) in books.data"
						:key="book.id"
						:book="book"
						:index="index"
					/>
				</div>

				<pagination
					class="flex justify-center items-center space-x-4 py-20 text-gray-400"
					@pagination-change-page="getBooks"
					:data="books"
					:limit="4"
					>
						<div slot="prev-nav">
							<svg class="w-5 h-5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"/></svg>
						</div>
						<div slot="next-nav">
							<svg class="w-5 h-5 flex-none text-primary-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"/></svg>
						</div>
				</pagination>
			</div>
			<div v-else class="flex-1 pt-24">
				<div class="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-16">
					<content-placeholders
						v-for="i in 12"
						:key="i"
						:rounded=false>
							<content-placeholders-img />
							<content-placeholders-heading />
							<content-placeholders-text :lines="1" />
					</content-placeholders>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import sideFilters from '@/components/Layout/sideFilters'
import theSorting from '@/components/Layout/theSorting'
import bookCard from '@/components/bookCard'

export default {
	name: 'Book.index',
	components: {
		sideFilters,
		theSorting,
		bookCard
	},
	mounted() {
		this.getBooks()
	},
	data() {
        return {
			search: '',
            filters: null,
            sort: 'created_desc',
			showFilters: false
        }
    },
    watch: {
		sort : function() {
            this.getBooks()
        },
    },
	computed: {
		books() {
			return this.$store.getters['books/books']
		}
	},
	methods: {
		getBooks(page = 1) {
			this.$store.dispatch('books/getBooks', {
				search: this.search,
				filters: this.filters,
				sort: this.sort,
				page: page
			})
		},
		applySearch(search) {
			this.search = search
			this.getBooks()
		},
		applyFilters(filters) {
			this.filters = filters
			this.getBooks()
        },
		applySorting(sort) {
			this.sort = sort
		},
		toggleShowFilters() {
			this.showFilters = ! this.showFilters
		}
	}
}
</script>

<style>
	.active {
		background-color: rgba(254, 179, 114);
		padding: 1px 10px;
		color: white;
	}
</style>
