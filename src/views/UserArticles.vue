<template>
  <div>
    <h2>掲載記事一覧</h2>
    <div class="card-wrapper" v-for="article in articles" :key="article.id">
      <router-link
        class="title"
        :to="{ name: 'userDetail', params: { id: article.id } }"
        >{{ article.title }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [
        {
          id: 0,
          title: 'サンプル',
        },
      ],
    }
  },
  created() {
    this.axios
      .get('/api/user/articles/')
      .then(response => {
        this.articles = response.data
      })
      .catch(e => console.log(e))
  },
}
</script>

<style scoped>
.card-wrapper {
  padding: 1rem 0;
}
.title {
  font-size: 2rem;
  color: #42b983;
}
</style>
