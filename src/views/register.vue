<template>
    <div>
        <h4>Register</h4>
        <form @submit.prevent="register">
            <label for="role">Role 0 and 1</label>
            <div>
                <input id="name" type="text" v-model="role" required autofocus>
            </div>
            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div>
            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="pwd" required>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
      return {
        role: "",
        email: "",
        pwd: ""
      }
    },
    methods: {
      register: function () {
        let data = {
          role: this.role,
          email: this.email,
          pwd: this.pwd
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
}
</script>

<style>
    
</style>