<template>
  <div class="app">
    <page-header />
    <div class="main-wrapper">
      <div class="main">
        <router-view />
      </div>
    </div>
    <page-footer />
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'

export default {
  components: {
    PageHeader,
    PageFooter,
  },
}
</script>

<style>
body {
  margin: 0;
}
a {
  cursor: pointer;
  text-decoration: none;
}
</style>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-wrapper {
  flex: 1 1 0;
  padding: 2rem 6rem;
  background-color: #c8e6c9;
}
.main {
  height: 100%;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 10px;
}
</style>
