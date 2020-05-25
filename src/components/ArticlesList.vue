<template>
  <div>
    <table border="1">
      <tr>
        <th>id</th>
        <th>title</th>
        <th>編集</th>
        <th>公開</th>
        <th>削除</th>
      </tr>
      <tr v-for="article in articles" v-bind:key=article.id>
        <th>{{article.id}}</th>
        <th>{{article.title}}</th>
        <th><router-link :to="{name:'adminEdit',params:{id:article.id}}">この記事を編集</router-link></th>
        <th>
          <a v-if="article.is_published" @click="setPrivate(article.id)">この記事を非公開</a>
          <a v-else @click="setPublic(article.id)">この記事を公開</a>
        </th>
        <th><a @click="deleteArticle(article.id)">この記事を削除</a></th>
      </tr>
    </table>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'ArticlesList',
  data:function(){
    return{
      articles: Array
    }
  },
  created(){
    this.getAllArticles()
  },
  methods:{
    getAllArticles:function(){
      this.axios.get('/admin/api/articles')
      .then((response)=>{
        this.articles = response.data
      })
      .catch(e => this.$router.push({ name: 'adminLogin' }))
    },
    deleteArticle:function(id){
      if(confirm("本当に削除しますか？")){
        this.axios.delete('/admin/api/articles/'+id)
        .then((response) => {
          this.getAllArticles()
        })
        .catch(e => console.log(e))
      }
    },
    setPublic:function(id){
      if(confirm("この記事を公開しますか?")){
        this.axios.put('/admin/api/articles/is_published/'+id, null)
        .then((response)=>{
          this.getAllArticles()
        })
        .catch((e)=>console.log(e))
      }
    },
    setPrivate:function(id){
      if(confirm("この記事を非公開にしますか?")){
        this.axios.delete('/admin/api/articles/is_published/'+id)
        .then((response)=>{
          this.getAllArticles()
        })
        .catch((e)=>console.log(e))
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
