<template>
    <div class="display-item">
        <HeaderTitle :title="title"/>
        <div class="box">
                <div v-for="(item,index) in dataOjb" :key="index" class="box-item" >
                    <img :src="item.picUrl || item.blurPicUrl || item.coverImgUrl" @click="toDetail(item.id)">
                    <h3>{{item.name}}</h3>
                    <p v-if="item.copywriter || item.updateFrequency">{{item.copywriter || item.updateFrequency}}</p>
                </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import HeaderTitle from './HeaderTitle';
export default {
   
    props:['title','dataOjb'],
    
    computed: {
        ...mapState(['playList'])
    },
    methods:{
        show(){
        },
        toDetail(id){

            this.playlistDetail(id)
            
            this.$router.push({name:'SongList'})
        },
        ...mapActions(['playlistDetail'])
    },
    components:{
        HeaderTitle
    }
    
}
</script>

<style lang="scss" scoped>
    .display-item{
        padding: 0 10px;
        margin-top:100px ;

        .title{
            font-weight: 700;
            font-size: 30px;
        }
    }
    .box{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;

        .box-item{
            width: 15%;
            margin-top: 40px;
            img{
                width: 100%;
                border-radius: 20px;
                transition: all .5s ease;

                &:hover{
                    box-shadow: 0px 10px 20px #888888;
                    transform: scale(1.03);
                }
            }

            h3{
                margin-top: 5px;
                font-weight: 600;
                font-size: 14px;
                line-height: 22px;
            }

            p{
                font-size: 10px;
                color:#333;
                line-height: 14px;
            }
        }
    }
</style>