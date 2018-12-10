const getters = {
    userName: state => state.login.userName,
    role: state => state.login.role,
    newRouter: state => state.login.newRouter,
    isLogin:state => state.login.isLogin
  };
  export default getters