<template>
<div>
    <page-header/>
    <div v-if="isFound">
        <h1>This is an edit page</h1>
        <p>{{ contentId }}</p>
        <div>
            <p>タイトル</p>
            <input type='text' v-model="title">
        </div>
        <div>
            <p>コンテンツ</p>
            <textarea cols='100' rows='10' v-model="content"></textarea>
        </div>
        <input type='submit' @click="putArticle">
    </div>
    <div v-else>
        <h1>お探しのページは見つかりません</h1>
    </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
    data(){
        return{
            contentId: Number,
            title: '',
            content: '',
            isFound: true,
        }
    },
    created(){
        this.axios.get('/api/auth')
        .catch(()=> this.$router.push({ name: 'adminLogin' }))
        this.contentId = this.$route.path.slice("/admin/articles/".length)
        this.getArticle()
    },
    methods:{
        getArticle:function(){
            this.axios.get('/api/articles/'+this.contentId)
            .then((response)=>{
                this.title = response.data.title
                this.content = response.data.content
                this.isFound = true
            })
            .catch((e) => {
                console.log(e)
                this.isFound = false
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
    },
    components:{
        PageHeader
    }
}
</script>