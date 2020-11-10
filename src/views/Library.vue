<template>
    <div class="library">
        <div class="user-header">
            <img class="avatar-url" :src="userPlayList[0].creator.avatarUrl"/>
            <div class="name">{{userPlayList[0].name}}</div>
        </div>
        <div class="love-song">
            <div class="love-song-left">
                <h2>
                    我希爱的歌
                </h2>
                <div class="count">{{userPlayList[0].trackCount}}首</div>
                <span class="icon-bofang1" @click="toSongList"></span>
            </div>
            <div class="love-song-right" v-if="loveSongList">
                <!-- 'picUrl','name','author' -->
                <LoveSongItem  v-for="(item,index) in eightSong" :key="index" :picUrl="item.al.picUrl" :name="item.name" :author="item.ar[0].name" class="item"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import {SET_PLAYLIST} from '../store/mutation-types'
import LoveSongItem from '../components/LoveSongItem'
export default {
    computed:{
        // 调出8首封面
        eightSong(){
            return this.loveSongList.playlist.tracks.slice(0, 8)
        },
        ...mapState(['userPlayList','loveSongList'])
    },
    components:{
        LoveSongItem
    },
    methods:{
        toSongList(){
            this.mineToSongList(this.loveSongList)
            this.$router.push({name:'SongList'})
        },

        ...mapMutations({
            setPlayList:SET_PLAYLIST
        }),

        ...mapActions(['mineToSongList'])
    }
}
</script>

<style lang="scss" scoped>
    .library{
        padding: 64px;

        .user-header{
            height: 100px;
            display: flex;
            align-items: center;
            padding: 20px 0;

            img{
                height: 100%;
                border-radius: 50%;
            }

            .name{
                color:#000000;
                font-size: 24px;
                font-weight: 600;
            }

            

        }

        .love-song{
            height: 200px;
            display: flex;

            .love-song-left{
                position: relative;
                width: 35%;
                height: 100%;
                background-color: #eaeffd;

                border-radius: 10px;
                padding: 8px;

                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                h2{
                    font-size: 22px;
                    font-weight: 600;
                    color:#335eea;
                }

                .count{
                    color:#335eea;
                }

                .icon-bofang1{
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    font-size: 60px;
                    color:#335eea;

                    &:hover{
                        transform: scale(1.2);
                    }
                }
            }

            .love-song-right{
                flex: 1;
                height: 100%;
                margin-left: 20px;
                display: flex;
                flex-wrap: wrap;
                .item{
                    width: 50%;
                    height: 25%;
                    border-radius: 10px;
                }
            }
        }
    }
</style>