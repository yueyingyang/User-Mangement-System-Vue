<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		
	</div>
	
</template>
<script>
	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	import bus from './bus';
	export default {
		// data() {

		// },
		components: {
			vHead, vSidebar
		},
		// created() {
			
		// }

	}
</script>
<style scoped>
	
</style>