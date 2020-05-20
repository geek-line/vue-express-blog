<template>
<div class="basic-page">
  <page-header/>
  <div class='edit-container'>
    <h1>This is an articles page</h1>
    <articles-list />
  </div>
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import ArticlesList from '@/components/ArticlesList.vue'

export default {
  name: 'adminArticle',
  components: {
    ArticlesList,PageHeader
  },
  created(){
    this.axios.get('/admin/api/auth')
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
  }
}
</script>
