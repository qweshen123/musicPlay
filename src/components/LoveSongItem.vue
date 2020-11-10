<template>
    <div class="love-song-item">
        <img :src="picUrl" alt="">
        <div class="content">
            <h3>{{name}}</h3>
            <p>{{author}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:['picUrl','name','author']
}
</script>

<style lang="scss" scoped>
    .love-song-item{
        display: flex;
        padding: 8px;

        &:hover{
            background-color: #f5f5f7;
        }
        img{
            height: 100%;
            margin-right: 10px;
            border-radius: 10px;
        }
        .content{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            h3{
                padding: 0;
                margin: 0;
                font-size: 12px;
                line-height: 100%;
                font-weight: 600;
            }

            p{
                padding: 0;
                margin: 0;
                font-size: 8px;
                line-height: 100%;
            }

        }
    }
</style>