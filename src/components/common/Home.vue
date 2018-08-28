<template>
	<div class="wrapper">
		<v-head></v-head>
		<v-sidebar></v-sidebar>
		<div class="content-box" :class="{'content-collapse': collapse}">
			<v-tags></v-tags>
			<div class="content">
				<transition name="move" mode="out-in">
					<keep-alive :include="tagList">
						<router-view></router-view>
					</keep-alive>
				</transition>
			</div>
		</div>
		
	</div>
	
</template>
<script>
	import vHead from './Header.vue';
	import vSidebar from './Sidebar.vue';
	import vTags from './Tags.vue';
	import bus from './bus';
	export default {
		data() {
			return {
				tagList: [],
				collapse: false
			}
		},
		components: {
			vHead, vSidebar, vTags
		},
		created() {
			bus.$on('collapse', state => {
				this.collapse = state;
			})

			// 只有在标签页列表里的页面，才使用keep-alive存储状态
			// 即如果关闭列表，则不再保存到内存中 
			bus.$on('tags', state => {
				let arr = [];
				for (let i = 0, len = state.length; i < len; i++) {
					state[i].name && arr.push(state[i].name);
				}
				this.tagList = arr;
			})
		}

	}
</script>
