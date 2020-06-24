<template>
  <div>
    <h1>This is an articles page</h1>
    <articles-list />
  </div>
</template>

<script>
import ArticlesList from '@/components/ArticlesList.vue'
export default {
  name: 'adminArticle',
  components: {
    ArticlesList
  },
  created(){
    this.axios.get('/api/admin/auth')
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
  }
}
</script>
