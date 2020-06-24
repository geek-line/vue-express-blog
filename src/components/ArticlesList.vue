<template>
  <div>
    <table border="1">
      <tr>
        <th>id</th>
        <th>title</th>
        <th>編集</th>
        <th>削除</th>
      </tr>
      <tr v-for="article in articles" v-bind:key="article.id">
        <th>{{ article.id }}</th>
        <th>{{ article.title }}</th>
        <th>
          <router-link :to="{ name: 'adminEdit', params: { id: article.id } }"
            >この記事を編集</router-link
          >
        </th>
        <th><a @click="deleteArticle(article.id)">この記事を削除</a></th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ArticlesList',
  data: function() {
    return {
      articles: Array,
    }
  },
  created() {
    this.getAllArticles()
  },
  methods: {
    getAllArticles: function() {
      this.axios
        .get('/api/admin/articles')
        .then(response => {
          this.articles = response.data
        })
        .catch(() => this.$router.push({ name: 'adminLogin' }))
    },
    deleteArticle: function(id) {
      if (confirm('本当に削除しますか？')) {
        this.axios
          .delete('/api/admin/articles/' + id)
          .then(() => {
            this.getAllArticles()
          })
          .catch(e => console.log(e))
      }
    },
    setPublic: function(id) {
      if (confirm('この記事を公開しますか?')) {
        this.axios
          .put('/api/admin/articles/is_published/' + id, null)
          .then(() => {
            this.getAllArticles()
          })
          .catch(e => console.log(e))
      }
    },
    setPrivate: function(id) {
      if (confirm('この記事を非公開にしますか?')) {
        this.axios
          .delete('/api/admin/articles/is_published/' + id)
          .then(() => {
            this.getAllArticles()
          })
          .catch(e => console.log(e))
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
