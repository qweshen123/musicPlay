<template>
    <div class="class-list">
        <div class="title">{{title}}</div>
        <div class="list-item">
            <ul class="wrapper">
                <li v-for="(item,index) in classList" :key="index" class="item" :class="{con:isCon(item.name)}" @click="changList(item)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {HEANDEL_PLAYLISTALL} from '../store/mutation-types'
export default {
    props:['classList','title','hotList'],
    methods:{
        isCon(name){
            let flag = false
            for(let i=0 ;i< this.hotList.length;i++){
                if(this.hotList[i].name == name){
                    flag = true
                    break
                }
            }
            return flag
        },

        changList(obj){
            this.headerList(obj)
        },

        ...mapMutations({
            headerList:HEANDEL_PLAYLISTALL
        })
    }
}
</script>

<style lang="scss" scoped>
    .class-list{
        margin: 10px 0;
        display: flex;

        .title{
            font-size: 20px;
            line-height: 42px;
            font-weight: 700;
            color:#4f4f4f;
        }

        .list-item{
            flex: 1;

            .wrapper{
                display: flex;
                flex-wrap: wrap;
                margin: 5px 0;
            }

            .item{
                cursor: pointer;
                padding: 5px;
                font-size: 16px;
                color:#1e1e1e;
                margin: 0 20px;
                border-radius: 5px;
                &:hover{
                    background-color: #eaeffd;
                    color:#685eed;
                }

                &.con{
                    color:#685eed;
                }
            }
        }
    }
</style>