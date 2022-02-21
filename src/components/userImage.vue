<template>
    <div>
        <div v-if="user">
            <img 
                v-if="user.image"
                :src="imagePath"
                alt="user image">
        
            <img
                v-else
                :src="'https://eu.ui-avatars.com/api/?name='+user.name"
                alt="user image">
        </div>
        <div v-else>
            <img
                :src="'https://eu.ui-avatars.com/api/?name=undefined'"
                alt="user image">
        </div>
    </div>
</template>

<script>
export default {
    name: 'userImage',
    props: {
        user: {
            type: [Object, null],
            required: false
        }
    },
    computed: {
        imagePath() {
            return 'http://localhost:8000/storage/' + this.user.image.url
        }
    }
}
</script>