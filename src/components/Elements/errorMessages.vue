<template>
    <div
        v-if="errors.length != 0"
        :class="{ 'bg-red-100 p-3 mb-6' : errors.length != 0 }">
            <div
                v-for="(error, index) in errors"
                :key="index"
                class="text-red-500 text-sm">
                    {{ error[0] }}
            </div>
    </div>
</template>

<script>
export default {
    name: 'errorMessages',
    props: {
        errors: {
            type: [Array, Object],
            required: true
        }
    }
}
</script>