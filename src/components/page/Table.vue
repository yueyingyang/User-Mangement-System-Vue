<template>
	<div>
		<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="属性">
      </el-table-column>
	  	<el-table-column
      fixed="right"
      label="操作"
      >
				<template slot-scope="scope">
					<el-button
						@click.native.prevent="deleteRow(scope.$index, tableData)"
						type="text"
						size="small">
						移除
					</el-button>
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
				</template>
    	</el-table-column>
    </el-table>
		<div style="text-align: right;margin-top: 10px;">
			<el-button type="primary" icon="el-icon-plus" circle @click="dialogAddVisible = true"></el-button>	 
		</div>
		<div style="text-align: center;margin-top: 10px;">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="current_change"
				:current-page="currentPage"
				:page-sizes="[3, 6, 9, 12]"
				:page-size="pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total">
			</el-pagination>
    </div>
		<!-- 详情编辑弹出层 -->
		<el-dialog title="详情编辑" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="学生姓名" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="属性" :label-width="formLabelWidth">
					<el-input v-model="form.num" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 新增信息弹出层 -->
		<el-dialog title="新增信息" :visible.sync="dialogAddVisible">
			<el-form :model="form">
				<el-form-item label="学生姓名" :label-width="formLabelWidth">
					<el-input v-model="newForm.Username" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input type="password" v-model="newForm.Password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="属性" :label-width="formLabelWidth">
					<el-input v-model="newForm.Num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth">
					<el-input v-model="newForm.Role" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="Permission ID" :label-width="formLabelWidth">
					<el-input v-model="newForm.Permissionid" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogAddVisible = false">取 消</el-button>
				<el-button type="primary" @click="addNewUser()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import axios from 'axios';
	export default {
		 methods: {
			addNewUser(){
				const formData = {
					"Username":this.newForm.Username,
					"Password":this.newForm.Password,
					"Num":this.newForm.Num,
					"Role":this.newForm.Role,
					"Permissionid":this.newForm.Permissionid
				}
					axios.post('/insert',formData)
					.then( res => {
							console.log(res.data.result);
							addUser();
          })
			},
			handleClick(row) {
				this.dialogFormVisible = true;
				this.form.name = row.user_name;
				this.form.num = row.num;
			},
			deleteRow(index, rows) {
				this.$confirm('确认删除本行吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					const formData = {
              Username:rows[index][name]
          };
					axios.post('/delete',formData)
					.then( res => {
							console.log(res)
							if(res.data.result == 1){
									this.addUser()
									this.$message({
										type: 'success',
										message: '删除成功!'
									});
							}else{
									this.$message({
										type: 'error',
										message: '删除失败!'
									});
							}               
          })
        }).catch((error) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
					}); 
					console.log(error)         
        });
			},
			// 获取表格数据函数
			addUser() {
					const formData = {
							"Page":this.currentPage,
							"Pagesize":this.pagesize
						
          };
					axios.post('/search',formData)
					.then( res => {
							console.log(res);
							this.tableData = res.data.rows;
							this.total= res.data.total;
          })
      },
      current_change:function(currentPage){
				this.currentPage = currentPage;
				this.addUser();
			},
			handleSizeChange(val) {
				this.pagesize = val;
        this.addUser();
      }
		},
		mounted: function () {
 　　　　this.addUser();
 		},
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				tableData: [],
        total: 0,
        pagesize:3,
				currentPage:1,
				dialogFormVisible: false,
				form:{
					name:"",
					num:""
				},
				newForm:{
					Username:"",
					Password:"",
					Role:"",
					Num:"",
					Permissionid:""
				},	
				formLabelWidth: '120px',
				dialogAddVisible:false
			}
		}
	}
</script>