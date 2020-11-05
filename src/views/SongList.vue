<template>
    <div class="song-list">

        <div class="header" v-if="playList">
            <img  :src="playList.playlist.coverImgUrl" >
            <div class="content ">
                <h2>{{playList.playlist.name}}</h2>
                <div class="creater">
                    Playlist by {{playList.playlist.creator.nickname}}
                </div>
                <p class="descirbe">{{playList.playlist.description}}</p>
                <button class="play" @click="musicPlayer(fistId,allowList)"><span class="icon-bofang"></span><span>播放</span></button>
            </div>
        </div>

        <div class="list-items" v-if="playList">
            <!-- <div class="items" v-for="(item,index) in playingList" :key="index" @dblclick="musicPlayer(item.id,allowList)" :class="{con:!isUse(item.id)}"> -->
            <div class="items" v-for="(item,index) in playingList" :key="index" @dblclick="musicPlayer(item.id,playingList)">
                <img :src="item.al.picUrl">
                <div class="detail">
                    <div class="author-song">
                        <div class="song-name">{{item.name}}</div>
                        <div class="author-name">{{item.ar[0].name}}</div>
                    </div>
                    <div class="album-name">{{item.al.name}}</div>
                    <div class="time-name">{{item.dt|setminute}}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex'
import {setminute} from '../assets/js/setminute'
import {SET_EMPTY,SET_CURRSONG,SET_EMPTYSONGLIS,SET_PLAYINGTRACKS,SET_ISDONELIST} from '../store/mutation-types'
export default {
    computed:{
        // allowList(){
            
        //     let arr = this.checkmusiclist.filter(item => {
        //         return item.success
        //     })
        //     return arr
        // },
        playingList(){
            if(this.playList.playlist.tracks.length>10){
                return this.playList.playlist.tracks.slice(0,10)
            }
            return this.playList.playlist.tracks
        },
        fistId(){
            // return this.allowList[0].id
            return this.playingList[0].id
        },
        // playlist 歌单 
        // ...mapState(['playList','checkmusiclist','songUrlDetail'])
        ...mapState(['playList','songUrlDetail'])
    },

    data(){
        return{
            isOnLoading:false
        }
    },

    created(){
        this.isOnLoading = false
    },

    mounted(){
        this.$nextTick(()=>{
            this.isOnLoading = true
        })
    },
    
    methods:{
        show(){
            this.emptySongList()
            setTimeout(()=>{
                console.log(this.songUrlDetail)
            },1000)
        },
    
        musicPlayer(currentId,playingList){
            if(!this.isOnLoading){
                return
            }
            // // 更改状态
            // this.isdone(false)
            // 添加到播放列表
            if(this.songUrlDetail.length == 0){
                // 播放列表为空,添加歌单
                this.songUrl(playingList)
               
            }else{
                // 如果歌单列表与播放列表相同不加载
                let songsLength = 0
                for(let i = 0;i<this.songUrlDetail.length;i++){
                    for(let j =0;j<playingList.length;j++){
                        console.log(this.songUrlDetail)
                        if(this.songUrlDetail[i].data.data[0].id == playingList[j].id){
                            songsLength++
                        }
                    }
                }

                if(songsLength == this.songUrlDetail.length){
                    // 没换歌单不刷新播放列表
                }else{
                    
                    // 换了歌单,刷新播放列表
                    // 清空播放列表
                    this.emptySongList()
                    
                    // 添加新列表
                    this.songUrl(playingList)

                    
                }
            }
            
            // 更换当前播放歌曲
            this.curSong(currentId)
            this.playingCtracks(this.playingList)
            this.$emit('call')
            
        },

        isUse(id){

            for(let i =0;i<this.checkmusiclist.length;i++){
                if(this.checkmusiclist[i].id == id){
                    return this.checkmusiclist[i].success
                }
            }
  
        },

        ...mapMutations({
            empty:SET_EMPTY,
            curSong:SET_CURRSONG,
            emptySongList:SET_EMPTYSONGLIS,
            playingCtracks:SET_PLAYINGTRACKS,
            isdone:SET_ISDONELIST
        }),

        ...mapActions(['songUrl'])
    },
    filters:{
        setminute
    },
    beforeDestroy(){

        this.empty()

    }
 
}
</script>

<style lang="scss" scoped>
    .song-list{
        padding-top: 64px;
        padding-bottom:74px ;

        .header{
            position: relative;
            display: flex;

            img{
                width: 20vw;
                border-radius: 20px;
                transition: all .5s ease;
                margin-right: 3vw;
            }

            .content{
                flex:1;
                position: relative;
                h2{
                    margin: 15px 0;
                    font-weight: 700;
                    font-size: 30px;
                    line-height: 30px;
                }

                .descirbe{
                    
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:3; 

                }

                .creater{
                    font-size: 1.2vw;
                    font-weight: 550;
                    margin-bottom: 2vh;
                }
            }

            button.play{
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                left: 0;
                bottom: 15px;
                background-color: #eaeffd;
                border: none;
                width: 8vw;
                height: 8vh;
                border-radius: 10px;;
                span{
                    display: inline-block;
                    color:#335eea;
                    font-size: 16px;
                    margin: 0 5px;
                    font-weight: 600;
                    &.icon-bofang{
                        font-size: 22px;
                    }
                }
            }

        }

        .list-items{
            margin-top: 5vw;
        }

        .items{
            display: flex;
            padding: .5vw;
            border-radius: 1vw;
            &:hover{
                background-color: #eaeffd;
            }

            &.con{
                opacity: .4;
                cursor: not-allowed;
            }
            img{
                width: 5vw;
                margin-right: 1vw;
                border-radius: 1vw;
            }

            .detail{
                flex: 1;

                display: flex;
                justify-content: space-between;
                align-items: center;

                
            }

            .author-song{
                width: 20vw;


                .song-name{
                    font-weight: 600;
                    font-size: 1.2vw;
                }

                .author-name{
                    font-size: .8vw;
                }
            }

            .album-name{
                font-size:1vw;
                width: 25vw;
            }

            .time-name{
                width: 10vw;
                font-size:1vw;
                text-align: right;
            }
        }
    }
</style>