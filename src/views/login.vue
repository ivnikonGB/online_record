<template>
  <div class="container-login">
      <div class="login">
        <form action="#">
            <span class="login-title">Авторизация</span>
            <label for="">
                <input type="text" v-model="email" placeholder="Email" class="login-log">
            </label>
            <label for="">
                <input type="password" v-model="password" placeholder="Пароль" class="login-password">
            </label>
            <div id="login-error"></div>
            <a href="#" class="login-In" @click="login">Войти</a>
        </form>
      </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      login: function () {
        let email = this.email 
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap');  
    .container-login {
        background-color: #E5E5E5;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login {
        width: 400px;
        height: 318px;
        background: #FFFFFF;
        box-shadow: 0px 30px 50px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
    }
    .login-title {
        display: block;
        margin-top: 50px;
        width: 300px;
        height: 28px;
        font-family: Abel;
        font-style: normal;
        font-weight: normal;
        font-size: 22px;
        line-height: 28px;
        color: #28313A;
    }
    .login-log {
        outline: none;
        margin-top: 30px;
        padding-left: 15px;
        width: 300px;
        height: 40px;
        border: 1px solid #ABAFBF;
        box-sizing: border-box;
        border-radius: 10px;
    }
    .login-password {
        outline: none;
        margin-top: 30px;
        padding-left: 15px;
        width: 300px;
        height: 40px;
        border: 1px solid #ABAFBF;
        box-sizing: border-box;
        border-radius: 10px;
    }
    .login-In {
        display: block;
        text-decoration: none;
        margin-top: 15px;
        margin-left: 50px;
        padding-top: 10px;
        width: 300px;
        height: 40px;
        background: #8D92C5;
        border-radius: 10px;
        color: #ffffff;
    }
    .login-In:hover {
        color: #ffffff;
        background-color:  #6d72b1;
        text-decoration: none;
    }
    .login-In:active {
        background: #8D92C5;
    }
</style>