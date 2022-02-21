<template>
    <header class="border-b border-gray-200 py-8 mb-6">
        <p class="text-lg text-gray-600">{{ text }}</p>
    </header>
</template>

<script>
export default {
    name: 'pageHeader',
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>