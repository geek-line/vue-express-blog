<template>
    <div>
        <page-header/>
        <input type='email' v-model="email">
        <input type='password' v-model="password">
        <input type='submit' @click="postPassword">
        <page-footer></page-footer>
    </div>
</template>

<script>
import PageHeader from '@/components/PageHeader'
import PageFooter from '@/components/PageFooter'
export default {
    data(){
        return{
            email:'',
            password:'',
        }
    },
    created(){
        this.checkSession()
    },
    methods:{
        checkSession(){
            this.axios.get('/admin/api/login')
            .then((response)=>{
                if (response.data){
                    this.$router.push({name: 'adminArticles'})
                }
            })
            .catch(e => console.log(e))
        },
        postPassword:function(){
            let json = JSON.stringify({
                email:this.email,
                password:this.password,
            })
            this.axios.post('/admin/api/login', {json: json})
            .then((response)=>{
                this.$router.push({name: 'adminArticles'})
            })
            .catch(e => alert('emailとpasswordのどちらかまたは両方が間違っています'))
        }
    },
    components:{
        PageHeader,PageFooter
    },
}
</script>