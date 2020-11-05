<template>
    <div class="display-item">
        <HeaderTitle :title="title"/>
        <div class="box">
            <div v-for="(item,index) in dataOjb" :key="index" class="box-item">
                <img :src="item.picUrl || item.blurPicUrl">
                <h3>{{item.name}}</h3>
                <p v-if="item.copywriter">{{item.copywriter}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTitle from './HeaderTitle'
export default {
    // props:{
    //     title:{
    //         type:String
    //     },
    //     dataOjb:{
    //         type:Array
    //     }
    // },
    props:['title','dataOjb'],
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
            width: 23%;
            margin-top: 40px;

            img{
                width: 100%;
                border-radius: 50%;
                transition: all .5s ease;

                &:hover{
                    box-shadow: 0px 10px 20px #888888;
                    transform: scale(1.03);
                }
            }

            h3{
                margin-top: 5px;
                font-weight: 600;
                font-size: 16px;
                line-height: 26px;

                text-align: center;
            }

            p{
                font-size: 12px;
                color:#333;
                line-height: 14px;
            }
        }
    }
</style>