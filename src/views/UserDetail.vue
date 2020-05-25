<template>
    <div class="basic-page">
        <page-header></page-header>
        <div class="container" v-if="isFound">
            <h1>{{ title }}</h1>
            <hr>
            <div id='content' v-html="content"></div>
        </div>
        <div v-else>
            <h1>お探しのページは見つかりません</h1>
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
            this.axios.get('/api/user/articles/'+this.contentId)
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
        PageHeader,PageFooter,
    }
}
</script>

<style>
#content h2{
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1.0em 1.0em;
    color: #494949;
    background: transparent;
    border-left: solid 5px #42b983;
}
#content h3{
    position: relative;
    padding: 0.25em 0;
    font-size: 1.25rem;
    font-weight: 700;
    padding-left: 25px;
}
#content h3:before {
    font-size: 1.25rem;
    font-weight: 700;
    position: absolute;
    content: '';
    bottom: -3px;
    left: 0;
    width: 0;
    height: 0;
    border: none;
    border-left: solid 15px transparent;
    border-bottom: solid 15px #42b983;
}
#content h3::after{
    font-size: 1.25rem;
    font-weight: 700;
    position: absolute;
    content: '';
    bottom: -3px;
    left: 10px;
    width: 99%;
    border-bottom: solid 3px #42b983;
}
</style>