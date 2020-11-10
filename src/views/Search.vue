<template>
    <div class="search">
        <HeaderTitle title="搜索结果"/>
        <div class="con-list">
            <LoveSongItem class="item" v-for="(item,index) in songList" :key="index" :picUrl="item.al.picUrl" :name="item.al.name" :author="item.ar[0].name"/>
        </div>
    </div>
</template>

<script>
import LoveSongItem from '../components/LoveSongItem'
import HeaderTitle from '../components/HeaderTitle'
import {mapState} from 'vuex'
export default {
    components:{
        LoveSongItem,
        HeaderTitle
    },
    computed:{
        songList(){
            return this.searchResult.songs
        },
        ...mapState(['searchResult'])
    }
}
</script>

<style lang="scss" scoped>
    .search{
        padding: 64px 0;

        .con-list{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .item{
                width:46%;
                height: 80px;
                border-radius: 10px;
            }
        }

    }
</style>