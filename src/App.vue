<template>
	<div class="bg-gray-50 min-h-screen" style="font-family: 'Montserrat', sans-serif;">
		<theNavbar />
		<transition name="fade">
			<router-view class="w-85% xl:w-3/4 mx-auto" />
		</transition>

		<notificationList />
	</div>
</template>

<script>
import theNavbar from '@/components/Layout/theNavbar'
import notificationList from '@/components/Notifications/notificationList'

export default {
	components: {
		theNavbar,
		notificationList
	}
}
</script>

<style>
	.fade-enter-active, .fade-leave-active {
		transition-property: opacity;
		transition-duration: .15s;
	}

	.fade-enter-active {
		transition-delay: .15s;
	}

	.fade-enter, .fade-leave-active {
		opacity: 0
	}

	@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;1,700&display=swap');
</style>