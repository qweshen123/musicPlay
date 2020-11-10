<template>
    <div class="community">
        <div class="to-login" v-show="!isToLogin">
            <TagLogin title="登录网易云账号" content="可访问全部数据" @click.native="toLogin"/>
        </div>
        <router-view @showNav="isToLogin =! isToLogin"/>
    </div>
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import TagLogin from '../components/TagLogin'
import {SET_SHOWPLAYER} from '../store/mutation-types'
export default {
    data(){
        return{
            isToLogin:false
        }
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            if(vm.isLogin){
                vm.$router.push({name:'Library'})
                return
            }
            if(vm.playingTracks.length != 0){
                vm.$emit('downMiusic')
            }
        })
    },
    beforeRouteLeave(to,from,next){
        if(this.playingTracks.length != 0){
            this.$emit('upMusic')
        }
        next()
    },
    methods:{
        toLogin(){
            // 关闭导航
            this.isToLogin = true;
            this.$router.push({path:'/community/login'})
        },
        ...mapMutations({
            changeShowPlayer:SET_SHOWPLAYER
        })
    },
    components:{
        TagLogin
    },
    computed:{
        ...mapState(['playingTracks','isLogin'])
    }
}
</script>

<style lang="scss" scoped>
    .community{
        padding: 64px 0;

        .to-login{
            margin: 0 auto;
            width: 20vw;
            // height: 15vh;
        }
    }
</style>