<template>
  <div class="hello">
    <table border="1">
      <tr>
        <th>id</th>
        <th>title</th>
        <th>編集</th>
        <th>削除</th>
      </tr>
      <tr v-for="article in articles" v-bind:key=article.id>
        <th>{{article.id}}</th>
        <th>{{article.title}}</th>
        <th><router-link :to="{name:'adminEdit',params:{id:article.id}}">この記事を編集</router-link></th>
        <th><a @click="deleteArticle(article.id)">この記事を削除</a></th>
      </tr>
    </table>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'ArticlesList',
  props: {
    msg: String
  },
  data:function(){
    return{
      articles:[]
    }
  },
  created(){
    this.getAllArticles()
  },
  methods:{
    getAllArticles:function(){
      this.axios.get('/api/articles')
      .then((response)=>{
        this.articles = response.data
      })
      .catch(e => this.$router.push({ name: 'adminLogin' }))
    },
    deleteArticle:function(id){
      if(confirm("本当に削除しますか？")){
        this.axios.delete('/api/articles/'+id)
        .then((response) => {
          this.getAllArticles()
        })
        .catch(e => console.log(e))
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
