

const login = {
    state: {
        userName:'',
        role:'',
        newRouter:[],
        isLogin:false
    },
    mutations: {
        SET_USERNAME:(state, username) => {
            if(!username){
                state.userName = '';
                state.isLogin = false;
            }else{
                state.userName = username;
                state.isLogin = true;
            }
        },
        SET_ROLE:(state, role) => {
            state.role = role;
        },
        SET_NEWROUTER:(state, newrouter) =>{
            state.newRouter = newrouter;
        },

    },
    actions: {
        setUserName({commit},user){
            commit("SET_USERNAME",user)
        },
        setRole({commit},user){
            commit("SET_ROLE",user)
        },
        setNewRouter({commit},user){
            commit("SET_NEWROUTER",user)
        },
        logOut({commit},user){
            commit("SET_USERNAME",user)
        }
    
    }
}
export default login;