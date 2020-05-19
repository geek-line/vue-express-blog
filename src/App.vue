<template>
  <div id="app">
    <div id="nav">
      <router-link to="/admin/articles">Articles</router-link> |
      <router-link to="/admin/new">NewArticle</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body{
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
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
