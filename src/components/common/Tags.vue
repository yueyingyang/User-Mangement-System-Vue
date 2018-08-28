<template>
	<div class="tags" v-if="showTags">
		<el-tabs type="card"></el-tabs>
	</div>
</template>

<script>
	import bus from '../common/bus.js'
	export default {
		data() {
			return {
				tagsList: []
			}
		},
		methods: {
			isActive(path) {
				return path === this.$route.fullPath;
			},
			// 设置标签
			setTags(route) {
				// some()：用于检测数组中的某个元素是否符合指定条件，遇到满足的则返回true，剩下元素不再检测
				const isExist = this.tagsList.some(item => {
					return item.path === this.$route.fullPath;
				})

				// 如果标签未建立
				!isExist && this.tagsList.push({
					title: route.meta.title,
					path: route.fullPath,
					name: route.matched[1].components.default.name
				})
				bus.$emit('tags', this.tagsList);
			},
			// 关闭单个标签
			closeTag(index) {
				const delItem = this.tagsList.splice(index, 1)[0];
				const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
				if (item) {
					delItem.path === this.$route.fullPath && this.$route.push(item.path);
				} else {
					this.$router.push('/');
				}
			}
		},
		computed: {
			showTags() {
				return this.tagsList.length > 0;
			}
		},
		watch: {
			$route(newVal, oldVal) {
				this.setTags(newVal);
			}
		},
		created() {
			this.setTags(this.$route);
		}
	}
</script>

<style scoped>
	
</style>