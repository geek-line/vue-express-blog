<template>
<div>
<h1>This is an edit page</h1>
<p>{{ contentId }}</p>
<div>
    <p>タイトル</p>
    <input type='text' v-model="title">
</div>
<div>
    <p>コンテンツ</p>
    <textarea cols='30' rows='10' v-model="content"></textarea>
</div>
<input type='submit' @click="putArticle">
</div>
</template>

<script>
export default {
data(){
    return{
        contentId: Number,
        title: '',
        content: '',
    }
},
created(){
    this.contentId = this.$route.path.slice("/admin/articles/".length)
    this.getArticle()
},
methods:{
    getArticle:function(){
        this.axios.get('/api/articles/'+this.contentId)
        .then((response)=>{
            this.title = response.data.title
            this.content = response.data.content
        })
        .catch((e) => {
            console.log(e)
        })
    },
    putArticle:function(){
        let json = JSON.stringify({
            title:this.title,
            content:this.content
        })
        this.axios.put('/api/articles/'+this.contentId, {json:json})
        .then((response) => {
            this.$router.push({ name: 'adminArticles' })
        })
        .catch(e => console.log(e))
    }
}
}
</script>