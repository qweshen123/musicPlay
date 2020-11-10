<template>
    <div class="tag-login" ref="tag">
        <h2 ref="title">{{title}}</h2>
        <p ref="content">{{content}}</p>
        <span class="icon-xiangyou" ref="con"></span>
    </div>
</template>

<script>
export default {
    props:['title','content'],
    mounted(){
        this.$nextTick(()=>{
            let _this = this
            this.$refs.tag.onmouseenter = function(){

                _this.$refs.title.style.transform = 'translateX(-10px)'
                _this.$refs.content.style.transform = 'translateX(-10px)'
                _this.$refs.con.style.transform = 'translateX(10px)'
            }


            this.$refs.tag.onmouseleave = function(){
                _this.$refs.title.style.transform = 'translateX(0)'
                _this.$refs.content.style.transform = 'translateX(0)'
                _this.$refs.con.style.transform = 'translateX(0)'
            }


        })
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
    .tag-login{
        width: 100%;
        height: 15vh;
        background-color: #eaeffd;
        border-radius:1vw;
        padding:0 30px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 100px;
        
        

        h2{
            font-size: 18px;
            font-weight: 600;
            color:#335eea;
            transition: all .5s linear;
        }

        p{
            font-size: 12px;
            color:#5b7def;
            transition: all .5s linear;
        }

        .icon-xiangyou{
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            transition: all .5s linear;
        }
    }
</style>