<template>
<div>
  <page-header/>
  <h1>This is an new page</h1>
  <div>
    <p>タイトル</p>
    <input type='text' v-model="title">
  </div>
  <div>
    <p>コンテンツ</p>
    <textarea cols='100' rows='10' v-model="content"></textarea>
  </div>
  <input type='submit' @click="postArticle">
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  data(){
    return{
      title: '',
      content: '',
    }
  },
  methods:{
    postArticle:function(){
      let json = JSON.stringify({
        title:this.title,
        content:this.content
      })
      this.axios.post('/api/articles', {json:json})
      .then((response) => {
        this.$router.push({ name: 'adminArticles' })
      })
      .catch(e => console.log(e))
    }
  },
  created(){
    this.axios.get('/api/auth')
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
  },
  components:{
    PageHeader
  }
}
</script>
