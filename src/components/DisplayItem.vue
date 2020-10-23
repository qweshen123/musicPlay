<template>
    <div class="display-item">
        <h2 class="title">{{title}}</h2>
        <div class="box">
            <div v-for="(item,index) in dataOjb" :key="index" class="box-item">
                <img :src="item.picUrl">
                <h3>{{item.name}}</h3>
                <p>{{item.copywriter}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // props:{
    //     title:{
    //         type:String
    //     },
    //     dataOjb:{
    //         type:Array
    //     }
    // },
    props:['title','dataOjb']
}
</script>

<style lang="scss" scoped>
    .display-item{
        padding: 0 10px;
        margin-top:50px ;

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
            margin-top: 25px;

            img{
                width: 100%;
                border-radius: 10px;
            }

            h3{
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
            }

            p{
                font-size: 12px;
                color:#333;
                line-height: 14px;
            }
        }
    }
</style>