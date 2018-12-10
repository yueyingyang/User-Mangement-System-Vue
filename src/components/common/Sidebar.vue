<template>
	<div class="sidebar">
		<el-menu :collapse="collapse" :default-active="onRoutes" active-text-color="#4da1ff" unique-opened router>
			<template v-for="item in items">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</template>
						<el-menu-item v-for="(subItem,i) in item.subs" :index="subItem.index" :key="i">
							{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>

				<template v-else>
					<el-menu-it  em :index="item.index" :key="item.index">
						<i :class="item.icon"></i>
						<span slot="title">
							{{ item.title }}
						</span>
					</el-menu-it>
				</template>
			</template>

			<template v-for="item in newRouter[0].children" v-if="!item.hidden">
				<template v-if="item.subs">
					<el-submenu :index="item.index" :key="item.index">
						<template slot="title">
							<i :class="item.icon"></i>
							<span slot="title">{{ item.title }}</span>
						</template>
						<el-menu-item v-for="(subItem,i) in item.subs" :index="subItem.index" :key="i">
							{{ subItem.title }}
						</el-menu-item>
					</el-submenu>
				</template>

				<template v-else>
					<el-menu-it  em :index="item. index" :key="item.index">
						<i :class="item.icon"></i>
						<span slot="title">
							{{ item.title }}
						</span>
					</el-menu-it>
				</template>
			</template>
		</el-menu>
	</div>
</template>
<script>
	import bus from '../common/bus.js'
	export default {
		data() {
			return {
				collapse: false,
				items: [
					{
						icon: 'el-icon-setting',
						index: 'dashboard',
						title: '系统首页'
					},
					{
						icon: 'el-icon-tickets',
						index: 'table',
						title: '基础表格'
					},
					{
						icon: 'el-icon-view',
						index: 'user',
						title: '用户管理',
						subs: [
							{
								index: 'form',
								title: '基本表单'
							},
							{
								index: 'upload',
								title: '文件上传'
							}
						]
					},
					{
						icon: 'el-icon-star-on',
                        index: 'charts',
                        title: '图表'
					}
				]
			}
		},
		computed: {
			onRoutes() {
				return this.$route.path.replace('/','');
			},
			
			...mapGetters([
				'newRouter'
			])
		},
		created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
			bus.$on('collapse', state => {
				this.collapse = state;
			})
		}

	}
</script>
<style scoped>
	.sidebar {
	    display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
	}
	.sidebar::-webkit-scrollbar{
        width: 0;
    }
	
    .sidebar i {
    	color: #4da1ff;
    }
	.el-menu {
		background-color: #fafbfc;
	}

	.el-menu:not(.el-menu--collapse) {
		width: 250px;
	}
	.sidebar > ul {
        height:100%;
    }

</style>