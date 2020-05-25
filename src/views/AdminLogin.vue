<template>
    <div>
        <page-header/>
        <div class='container'>
            <h1>管理者ログイン</h1>
            <div>
                <p>Email</p>
                <input type='email' v-model="email">
            </div>
            <div>
                <p>パスワード</p>
                <input type='password' v-model="password">
            </div>
            <br>
            <input type='submit' @click="postPassword">
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
            email:'',
            password:'',
        }
    },
    created(){
        this.checkSession()
    },
    methods:{
        checkSession(){
            this.axios.get('/api/admin/auth')
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
            this.axios.post('/api/admin/login', {json: json})
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