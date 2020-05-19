<template>
    <div id="nav">
      <page-header/>
      <template v-if="isLogin">
        <router-link to="/admin/articles">Articles</router-link> |
        <router-link to="/admin/new">NewArticle</router-link> |
        <a href="" @click="logout">logout</a>
      </template>
      <template v-else>
        <router-link to="/admin/login">login</router-link>
      </template>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  data(){
    return{
      isLogin: false
    }
  },
  methods:{
    logout:function(){
      this.axios.get('/api/logout')
      .then((response)=>{
        this.$router.push({name: 'adminLogin'})
      })
    }
  },
  created(){
    this.axios.get('/api/auth')
    .then((response)=>{
      if(response.data){
        this.isLogin = true
      }
    })
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
  },
  components:{
    PageHeader
  },
}
</script>

<style scoped>
#nav {
  padding: 30px;
  background-color: #42b983;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #fff;
}
</style>