<template>
<div class="basic-page">
  <page-header/>
  <div class='edit-container'>
    <h1>This is an new page</h1>
    <div>
      <p>タイトル</p>
      <input type='text' v-model="title">
    </div>
    <div>
      <p>コンテンツ</p>
        <editor
          v-model="content"
          :init="tinymceConfig"
        />
    </div>
    <input type='submit' @click="postArticle">
  </div>
  <page-footer></page-footer>
</div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
export default {
  data(){
    return{
      title: '',
      content: '',
      tinymceConfig:{
          height: 500,
          menubar: false,
          plugins: 'link image lists table',
          toolbar: 'undo redo | styleselect | link bold italic | image | numlist bullist | table tabledelete',
       }
    }
  },
  methods:{
    postArticle:function(){
      let json = JSON.stringify({
        title:this.title,
        content:this.content
      })
      this.axios.post('/admin/api/articles', {json:json})
      .then((response) => {
        this.$router.push({ name: 'adminArticles' })
      })
      .catch(e => console.log(e))
    }
  },
  created(){
    this.axios.get('/admin/api/auth')
    .catch(()=> this.$router.push({ name: 'adminLogin' }))
  },
  components:{
    'page-header': PageHeader,
    'editor': Editor,
    PageFooter,
  }
}
</script>