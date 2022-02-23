<template>
    <div>
        <div v-if="user" class="flex items-start space-x-4 pt-6">
            <userImage
                :user="user"
                class="w-24"
            />

            <div class="mt-4 md:mt-0">
                <p>{{ user.name }}</p>
                <p class="text-sm text-gray-400">{{ user.email }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import userImage from '@/components/userImage'

export default {
    name: 'Dashboard.Index',
    components: {
        userImage
    },
    computed: {
        user() {
            return this.$store.getters['auth/user']
        },
    }
}
</script>