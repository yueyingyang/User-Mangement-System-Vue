<template>
    <div class="row mt-3">
        <div class="col-md-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for = "userName">用户名</label>
                            <input type = "text" class="form-control" v-model="userName">
                        </div>
                        <div class="form-group">
                            <label for = "password">密码</label>
                            <input type = "password" class="form-control" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:"Login",
    data(){
        return {
            userName:'',
            password:'',
        }
    },
    methods:{
        // 用户名不存在是2密码错误是0完全正确是1
        getRole(){
            console.log(this.role);
        },
        onSubmit(){
           const formData = {
               UserName:this.userName,
               Password:this.password
           };
           axios.post('/Login',formData)
           .then( res => {
               if(res.data.result == 0){
                   alert("密码错误");
               }else if(res.data.result == 2){
                    alert("用户名不存在");
               }else{
                   //更改用户登录状态
                   console.log(res.data);
                   console.log(res.data);

                    this.$store.dispatch("setUserName",res.data.user_name);
                    // 将用户名和role存进store
                    this.$store.dispatch("setRole",res.data.role);
                    this.$router.push({ path: '/' });
                    console.log(this.$store.getters.role);
               }               
           })
        }
    },
    computed:{
        
    }
}
</script>
