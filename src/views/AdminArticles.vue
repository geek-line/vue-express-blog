<template>
<div class="basic-page">
  <page-header/>
  <div class='container'>
    <h1>This is an articles page</h1>
    <articles-list />
  </div>
  <page-footer></page-footer>
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import ArticlesList from '@/components/ArticlesList.vue'
export default {
  name: 'adminArticle',
  components: {
    ArticlesList,PageHeader,PageFooter
  },
  created(){
    this.axios.get('/api/admin/auth')
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
  }
}
</script>
