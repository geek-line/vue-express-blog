<template>
    <div class="basic-page">
        <page-header></page-header>
        <div class="container" v-if="isFound">
            <h1>{{ title }}</h1>
            <div id='content' v-html="content"></div>
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
        this.contentId = this.$route.path.slice("/articles/".length)
        this.getArticle()
    },
    methods:{
        getArticle:function(){
            this.axios.get('/user/api/articles/'+this.contentId)
            .then((response)=>{
                this.title = response.data.title
                this.content = response.data.content
                this.isFound = true
            })
            .catch((e) => {
                console.log(e)
                this.isFound = false
            })
        }
    },
    components:{
        PageHeader
    }
}
</script>

<style scoped>
.container{
    margin: 2rem 6rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
}
</style>