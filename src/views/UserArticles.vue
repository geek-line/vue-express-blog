<template>
    <div class="basic-page">
        <page-header></page-header>
        <div class='container'>
            <h2>掲載記事一覧</h2>
            <div>
                <div class="card-wrapper" v-for="article in articles" :key="article.id">
                    <router-link class="title" :to="{name:'userDetail',params:{id:article.id}}">{{ article.title }}</router-link>
                    <p>作成日:{{ article.created_at }}</p>
                </div>
            </div>
        </div>
        <page-footer></page-footer>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
export default {
    data(){
        return{
            articles: [{
                id : 0,
                title: 'サンプル',
                createdAt: ''
            },]
        }
    },
    created(){
        this.axios.get('/user/api/articles/')
        .then((response)=>{
            this.articles = response.data
        })
        .catch(e => console.log(e))
    },
    components:{
        PageHeader,PageFooter,
    }
}
</script>

<style scoped>
.card-wrapper{
    padding: 1rem 0;
}
.title{
    font-size: 2rem;
    color: #42b983;
}
</style>