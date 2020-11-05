<template>
    <div class="music-player" v-if="songUrlDetail.length != 0">
        <audio v-if="songUrl" :src="songUrl"  :ended="endMusic"  autoplay id="medicine" @ended="endSong" @timeupdate="getTime" ref='audioExample' class="audio"></audio>
        <div class="view-play">
            <div class="song-detail" v-if="playingMassge">
                <img :src="playingMassge.al.picUrl">
                <div class="detail">
                    <div class="song-name">{{playingMassge.name}}</div>
                    <div class="author-name">{{playingMassge.ar[0].name}}</div>                        
                </div>
            </div>

            <div class="conrcle">
                <span class="prev icon-shangyishou" @click="prev"></span>
                <span class="play" @click="play" :class="isPlay?'icon-bofang':'icon-bofang1'"></span>
                <span class="next icon-xiayishou" @click="next"></span>
            </div>

            <div class="button">
                <span class="list icon-erjiheadphones31" :class="{con:isShowList}" @click="changSongList"></span>
                <span class="list icon-danquxunhuan" :class="{con:isLoop}" @click="changLoop"></span>
                <span class="list icon-suijibofang" :class="{con:isranDen}" @click="changRanDen"></span>
                <span class="list icon-shengyin" :class="{active:isQuite}" @click="changYin"></span>
            </div>

            <div class="progress-bar">
                <div class="bg-bar" ref="bgBar" @click="changBar"></div>
                <div class="go-bar" ref="goBar" @click="changBar">
                    <div class="circle" @mousedown.stop="pressOn" >
                        <div class="tisi">{{currTime | timeMin}}</div>
                    </div>
                </div>
                <div class="mark" v-if="isMark" @mousemove.stop="pressMove" @mouseup.stop="pressUp" @mouseleave="pressUp"></div>
            </div>

            <div class="yinBar" v-if="!isQuite">
                <div class="bg-bar" ref="yinBgBar"></div>
                <div class="go-bar" ref="yinGoBar">
                    <div class="circle" @mousedown="pressOnYin">
                    </div>
                </div>
                <div class="mark" v-if="isYinMark" @mousemove="pressMoveYin" @mouseup="pressUpYin" @mouseleave="pressUpYin"></div>
                <!-- <button @click="show">点击</button> -->
            </div>
        </div>
        <LineUp :playingMassge="playingMassge" :newPlayList="newPlayList" :currTime="currTime" :songTime="songLength" v-show="isShowList" @sendId="getID" ref="childDom" @callHide="isShowList = false"/>
    </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import {SET_PLAYINGMASSGE} from '../store/mutation-types'
import LineUp from './LineUp'
export default {
    data(){
        return{
            currentIndex:0,
            isPlay:false,
            isLoop:false,
            isranDen:false,
            currTime:0,
            songLength:0,
            isPress:false,
            isMark:false,
            isYinMark:false,
            isQuite:false,
            isShowList:false
        }
    },

    

    components:{
        LineUp
    },

    filters:{
        timeMin(secends){

            // return Math.floor(Number(secends))
            secends = Number(secends)
            // minute = parseInt(secends/1000%60);
            let minutes = parseInt((secends % (60 * 60)) / (60));
            let seconds = Math.floor((secends % (60)));
            if(seconds<10){
                seconds = '0' + seconds
            }
            return minutes + ':' + seconds;
        }
    },

    computed:{
        

        playId(){

            if(this.songUrlDetail[this.currentIndex]){
                return this.songUrlDetail[this.currentIndex].data.data[0].id
            }
            return false
        },

        playingMassge(){
            // console.log(this.playId)
            if(this.playId){
                let obj = {}
                for(let i = 0;i<this.playingTracks.length;i++){
                    if(this.playingTracks[i].id == this.playId){
                        obj = this.playingTracks[i]
                        break
                    }
                }
                return obj
            }
            return false
        },

        songUrl(){
            if(this.songUrlDetail[this.currentIndex]){
                return this.songUrlDetail[this.currentIndex].data.data[0].url
            }
            return false
        },

        newPlayList(){
            return this.playingTracks.filter((item)=>{
                for(let i = 0;i<this.songUrlDetail.length;i++){
                    if(this.songUrlDetail[i].data.data[0].id == item.id){
                        return true
                    }
                }
                return false
            })
        },

        ...mapState(['songUrlDetail','currSongId','playingTracks','isDoneList'])
    },

    beforeDestroy(){
        clearInterval(this.timer)
    },
    
    methods:{
        // 从播放列表点击的歌曲id 更新当前播放index
        getID(id){
            if(this.songUrlDetail){
                for(let i = 0;i<this.songUrlDetail.length;i++){
                    if(this.songUrlDetail[i].data.data[0].id == id){
                        this.currentIndex = i
                        break
                    }
                }
            }
        },

        // 点击进入播放列表
        changSongList(){
            // 显示播放列表和歌词
            this.isShowList = !this.isShowList
            // 更新歌词
            this.getLyric(this.playingMassge.id)

        },

        // 点击声音控件
        pressOnYin(){
            this.isYinMark = true;
        },

        // 鼠标移动控制声量
        pressMoveYin(event){
            // console.log(event.offsetX)
            let x = event.offsetX
            let length = this.$refs.yinBgBar.offsetWidth

            this.$refs.audioExample.volume = parseFloat(x/length)*1
            this.$refs.yinGoBar.style.width = x + 'px'
        },

        // 鼠标松开
        pressUpYin(){
            this.isYinMark = false;
        },

        show(){
            console.log(this.$refs.audioExample.volume)
        },

        // 静音
        changYin(){
            this.isQuite = !this.isQuite
            if(this.isQuite){
                this.$refs.audioExample.volume = 0
            }else{
                this.$refs.audioExample.volume = 1
            }
        },

        // 鼠标按下
        pressOn(){
            this.isPress = true
            this.isMark = true
        },

        // 鼠标移动
        pressMove(event){
            if(this.isPress){
                let x = event.clientX
                this.$refs.goBar.style.width = x + 'px'
            }
        },

        // 鼠标松开
        pressUp(event){
            let x = event.clientX
            let songLength = this.$refs.audioExample.duration
            let bgBarWidth = this.$refs.bgBar.offsetWidth
            this.$refs.goBar.style.width = x + 'px'
            this.$refs.audioExample.currentTime = parseInt(x*songLength/bgBarWidth) + ''
            this.$refs.audioExample.play()
            this.isPress = false
            this.isMark = false
        },

        // 点击改变进度条
        changBar(event){
            
            let x = event.offsetX
            let songLength = this.$refs.audioExample.duration
            let bgBarWidth = this.$refs.bgBar.offsetWidth
            this.$refs.goBar.style.width = x + 'px'
            this.$refs.audioExample.currentTime = parseInt(x*songLength/bgBarWidth) + ''
            this.$refs.audioExample.play()

        },

        // 监听正在播放回调函数
        getTime(event){
            if(!this.isPress){
                if(this.$refs.bgBar){
                    this.currTime = event.target.currentTime
                    this.songLength = event.target.duration
                    let bgBarWidth = this.$refs.bgBar.offsetWidth
                    this.$refs.goBar.style.width = parseFloat(this.currTime/this.songLength)*bgBarWidth + 'px'
                }
            }

            let currTime = event.target.currentTime
            this.$refs.childDom.changHeight(currTime)
       

        },

        // 节流函数
        throttle(event,fn,delay){
            let vaild = true
            return function(){
                if(!vaild){
                    return false
                }

                vaild = false
                setTimeout(()=>{
                    
                    fn(event)
                    vaild = true
                },delay)
            }
        },

        // 点击上一首
        prev(){
            // 是否是随机模式
            if(this.isranDen){
                let flag = true
                    
                while(flag){
                    let oldValue = this.currentIndex
                    this.currentIndex = Math.floor(Math.random()*this.songUrlDetail.length)
                    if(oldValue == this.currentIndex){
                        flag = true
                    }else{
                        flag = false
                    }
                }
            }else{
                this.currentIndex--
                if(this.currentIndex < 0){
                    this.currentIndex = this.songUrlDetail.length -1
                }
            }
            this.isPlay = false

        },

        // 点击下一首
        next(){
            // 是否是随机模式
            if(this.isranDen){
                let flag = true
                    
                while(flag){
                    let oldValue = this.currentIndex
                    this.currentIndex = Math.floor(Math.random()*this.songUrlDetail.length)
                    if(oldValue == this.currentIndex){
                        flag = true
                    }else{
                        flag = false
                    }
                }
            }else{
                this.currentIndex++
                if(this.currentIndex > this.songUrlDetail.length){
                    this.currentIndex = 0
                }
            }
            this.isPlay = false


        },

        // 更新index
        changIndex(){

            if(this.songUrlDetail){
                for(let i = 0;i<this.songUrlDetail.length;i++){
                    if(this.songUrlDetail[i].data.data[0].id == this.currSongId){
                        this.currentIndex = i
                        break
                    }
                }
            }

        },

        // 暂停与播放
        play(){
            // 跟改样式
            this.isPlay = !this.isPlay
            // 判断是否在播放 this.$refs.audioExample.paused true为暂停
            if(!this.$refs.audioExample.paused){
                this.$refs.audioExample.pause()

            }else{
                this.$refs.audioExample.play()
            }


        },

        // 音乐播放完毕
        endMusic(){
            console.log('播放完毕')
        },

        // 点击单曲循环
        changLoop(){
            // 改样式
            this.isLoop = !this.isLoop
            
            // 设置loop属性
            if(this.$refs.audioExample.loop){
                this.$refs.audioExample.loop = false
            }else{
                this.$refs.audioExample.loop = true
            }
        },

        // 音乐播放完毕
        endSong(){
            // 判断当前模式
            if(this.$refs.audioExample.loop){
                return
            }else{
                // 是否是随机模式
                if(this.isranDen){
                    let flag = true
                    
                    while(flag){
                        let oldValue = this.currentIndex
                        this.currentIndex = Math.floor(Math.random()*this.songUrlDetail.length)
                        if(oldValue == this.currentIndex){
                            flag = true
                        }else{
                            flag = false
                        }
                    }
                    
                }else{
                    this.currentIndex++
                }
            }
        },

        // 点击开启随机模式
        changRanDen(){
            this.isranDen = !this.isranDen
        },

        ...mapMutations({
            playingMe:SET_PLAYINGMASSGE
        }),

        ...mapActions(['getLyric'])
       

    }
}
</script>

<style lang="scss" scoped>
    .music-player{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 64px;

        #medicine{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100%;
            margin: 0;
        }

        .view-play{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: #fff;
            padding: 0 10vw;
            // border-top: 1px solid #e8e8e8;

            .yinBar{
                position: absolute;
                top:50%;
                transform: translateY(-50%);
                right: 40px;
                width: 80px;
                height: 4px;
                
                .mark{
                    position: absolute;
                    top: -5vh;
                    opacity: 0;
                    width: 100%;
                    height: 10vh;
                    z-index: 20;
                    background-color: rgba(255,0,0,.2);
                }
                

                .bg-bar{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #999;
                    
                    &:hover + .go-bar .circle{
                        display: block;
                    }
                }

                .go-bar{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    background-color: skyblue;
                    

                    &:hover .circle{
                        display: block;
                    }
                    

                    .circle{
                        display: none;
                        position: absolute;
                        right: -5px;
                        top:-5px;
                        
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background-color: #ddd;

                        &:hover .tisi{
                            display: block;
                        }

                        .tisi{
                            display: none;
                            width: 30px;
                            height: 20px;
                            background-color: #fff;
                            text-align: center;
                            line-height: 20px;
                            position: absolute;
                            top: -30px;
                            left: -10px;
                            color:#333;
                            border-radius: 5px;
                        }
                    }
                }
                


            }


            .progress-bar{
                width: 100%;
                height: 4px;
                position: absolute;
                transform: translateY(-5px);
                top: 2px;
                left: 0;


                .mark{
                    position: absolute;
                    top: -5vh;
                    opacity: 0;
                    width: 100%;
                    height: 10vh;
                    z-index: 20;
                }
                

                .bg-bar{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: #999;
                    
                    &:hover + .go-bar .circle{
                        display: block;
                    }
                }

                .go-bar{
                    position: absolute;
                    width: 0px;
                    height: 100%;
                    z-index: 10;
                    background-color: skyblue;
                    

                    &:hover .circle{
                        display: block;
                    }
                    

                    .circle{
                        display: none;
                        position: absolute;
                        right: -5px;
                        top:-5px;
                        
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background-color: #ddd;

                        &:hover .tisi{
                            display: block;
                        }

                        .tisi{
                            display: none;
                            width: 30px;
                            height: 20px;
                            background-color: #fff;
                            text-align: center;
                            line-height: 20px;
                            position: absolute;
                            top: -30px;
                            left: -10px;
                            color:#333;
                            border-radius: 5px;
                        }
                    }
                }

            }
            .song-detail{
                width: 25vw;
                height: 100%;
                display: flex;
                align-items: center;

                img{
                    display: inline-block;
                    height: 80%;
                    margin-right: 10px;
                    border-radius: 10px;
                }
                
                .detail{

                    .song-name{
                        font-weight: 600;
                        font-size: 16px;
                        color:#2e2a24;
                        
                    }

                    .author-name{
                        font-size: 12px;
                        color:#7e7e7e;
                    }
                }
            }
        }

        .conrcle{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 25vw;

            .prev{
                font-size: 20px;
                font-weight: 600;
            }

            .play{
                font-size: 30px;
                font-weight: 600;
                margin: 0 20px;
            }

            .next{
                font-size: 20px;
                font-weight: 600;
            }
        }

        .button{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 25vw;
            .list{
                font-size: 16px;
                font-weight: 600;
                margin-left: 20px;
                color:#000;
                padding: 6px;
                border-radius: 4px;

                &.con{
                    color:#335eea;
                }

                &:hover{
                    background-color: #f5f5f7;
                }

                &.active{
                    opacity: .5;
                }
            }
        }

    }
</style>