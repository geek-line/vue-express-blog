<template>
<div>
  <h1>This is an articles page</h1>
  <articles-list />
</div>
</template>

<script>
// @ is an alias to /src
import ArticlesList from '@/components/ArticlesList.vue'

export default {
  name: 'adminArticle',
  components: {
    ArticlesList
  }
}
</script>
