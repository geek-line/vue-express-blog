<template>
<div class="basic-page">
    <page-header/>
    <div class='edit-container'>
        <div v-if="isFound">
            <h1>This is an edit page</h1>
            <p>{{ contentId }}</p>
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
            <input type='submit' @click="putArticle">
        </div>
        <div v-else>
            <h1>お探しのページは見つかりません</h1>
        </div>
    </div>
    <page-footer></page-footer>
</div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
import Editor from '@tinymce/tinymce-vue'
export default {
    data(){
        return{
            contentId: Number,
            title: '',
            content: '',
            isFound: true,
            tinymceConfig:{
                height: 500,
                menubar: false,
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name', 
                plugins: 'link image lists table',
                toolbar: 'undo redo | styleselect | link bold italic | image | numlist bullist | table tabledelete',
            }
        }
    },
    created(){
        this.axios.get('/admin/api/auth')
        .catch(()=> this.$router.push({ name: 'adminLogin' }))
        this.contentId = this.$route.path.slice("/admin/articles/".length)
        this.getArticle()
    },
    methods:{
        getArticle:function(){
            this.axios.get('/admin/api/articles/'+this.contentId)
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
            this.axios.put('/admin/api/articles/'+this.contentId, {json:json})
            .then((response) => {
                this.$router.push({ name: 'adminArticles' })
            })
            .catch(e => console.log(e))
        }
    },
    components:{
        PageHeader,Editor,PageFooter
    }
}
</script>