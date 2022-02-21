<template>
    <button
        :type="type"
        class="bg-secondary-100 hover:bg-secondary-200 transition text-white p-2 text-sm">
            {{ text }}
    </button>
</template>

<script>
export default {
    name: 'baseButton',
    props: {
        text: {
            type: String,
            default: "Submit",
        },
        type: {
            type: String,
            default: "submit"
        },
    }
}
</script>