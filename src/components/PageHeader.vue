<template>
    <div id="nav">
      <template v-if="isLogin">
        <router-link to="/admin/articles">管理画面</router-link> |
        <router-link to="/admin/new">新規作成</router-link> |
        <a @click="logout">ログアウト</a> |
        <router-link to="/articles">記事一覧</router-link>
      </template>
      <template v-else>
        <router-link to="/articles">記事一覧</router-link>
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
      this.axios.get('/admin/api/logout')
      .then((response)=>{
        this.$router.push({ name: 'adminLogin' })
      })
    }
  },
  created(){
    this.axios.get('/admin/api/auth')
    .then((response)=>{
      if(response.data){
        this.isLogin = true
      }
    })
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
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