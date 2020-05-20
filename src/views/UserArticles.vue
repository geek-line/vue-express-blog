<template>
    <div class="basic-page">
        <page-header></page-header>
        <div class='container'>
            <ul>
                <li v-for="article in articles" :key="article.id">
                    <router-link :to="{name:'userDetail',params:{id:article.id}}">{{ article.title }}</router-link>
                    <span>作成日:{{ article.created_at }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'

export default {
    data(){
        return{
            articles: [{
                id : 0,
                title: 'サンプル',
                cratedAt: ''
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
        PageHeader
    }
}
</script>