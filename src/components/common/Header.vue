<template>
	<div class="header row">
		<div class="header-left row">
			<!-- 折叠按钮 -->
			<div class="collapse-btn" @click="collapseBar">
				<i class="el-icon-menu"></i>
			</div>
			<div class="logo hidden-xs-only">用户管理系统</div>
		</div>
		<div class="header-right row">
			<!-- 用户头像 -->
			<div class="user-avatar">
				<img src="../../../static/img/new image - wdh7v.jpg">
			</div>

			<!-- 用户名下拉菜单 -->
			<el-dropdown class="user-name" @command="handleCommand">
				<span>
					{{username}}
					<i class=" el-icon-caret-bottom"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<a href="https://github.com/erbuiii">
						<el-dropdown-item>关于作者</el-dropdown-item>	
					</a>
					<a href="https://github.com/erbuiii">
						<el-dropdown-item>项目仓库</el-dropdown-item>	
					</a>
					<el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>

</template>
<script>
	import bus from '../common/bus.js'
	export default {
		data() {
			return {
				collapse: false,	//折叠的状态
				name: 'erbuiii',
			}
		},
		computed: {
			username(){
				return this.$store.getters.userName;
			}
		},
		methods: {
			// 侧边栏折叠
			collapseBar() {
				this.collapse = !this.collapse;
				bus.$emit('collapse', this.collapse);
			},
			// 用户名下拉菜单事件
			handleCommand(command) {
				if (command == 'logout') {
					this.$store.dispatch("logOut",'');
					this.$router.push('/login');
				}
			}
		},
		mounted() {
			if (document.body.clientWidth < 900) {
				this.collapseBar();
			}
		}
	}
</script>
<style scoped>
	.header {
		position: relative;
		height: 70px;
		color: #4da1ff;
		font-size: 22px;
		background: #fafbfc;
		border-bottom: 1px solid #e7e9ea;
	}

	.header-left {
		width: 250px;
	}

	.collapse-btn {
		padding: 0 21px;
		cursor: pointer;
	}

	.header-right {
		position: absolute;
		right: 0;
		padding-right: 25px;
	}

	.user-avatar img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.user-name {
		margin-left: 20px;
	}



</style>